import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePracticeSession } from './usePracticeSession'
import { createFakeAudioContext, type FakeAudioContext } from '@/test/fake-audio-context'

describe('usePracticeSession', () => {
  let fakeCtx: FakeAudioContext

  beforeEach(() => {
    vi.useFakeTimers()
    fakeCtx = createFakeAudioContext()
    vi.stubGlobal(
      'AudioContext',
      vi.fn(() => fakeCtx)
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts with sensible defaults and no playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    expect(result.current.mode).toBe('scale')
    expect(result.current.rootNote).toBe('A')
    expect(result.current.bpm).toBe(80)
    expect(result.current.metronomeOn).toBe(true)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentStep).toBeNull()
    expect(result.current.activeNotes.size).toBe(0)
    expect(result.current.steps.length).toBeGreaterThan(0)
  })

  it('play() creates an AudioContext and starts playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })

    expect(result.current.isPlaying).toBe(true)
    expect(globalThis.AudioContext).toHaveBeenCalledTimes(1)
    expect(fakeCtx.oscillators.length).toBeGreaterThan(0)
  })

  it('advances currentStep and derives activeNotes as audio time passes', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })

    act(() => {
      fakeCtx.currentTime = 0.06
      vi.advanceTimersByTime(25)
    })

    expect(result.current.currentStep).toBe(0)
    const firstStep = result.current.steps[0]
    const expectedKey = `${firstStep.notes[0].stringIndex}-${firstStep.notes[0].fret}`
    expect(result.current.activeNotes.has(expectedKey)).toBe(true)
  })

  it('stop() halts playback and clears the current step', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      fakeCtx.currentTime = 0.06
      vi.advanceTimersByTime(25)
    })
    act(() => {
      result.current.stop()
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentStep).toBeNull()
    expect(result.current.activeNotes.size).toBe(0)
  })

  it('togglePlay() flips between playing and stopped', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.togglePlay()
    })
    expect(result.current.isPlaying).toBe(true)

    act(() => {
      result.current.togglePlay()
    })
    expect(result.current.isPlaying).toBe(false)
  })

  it('reuses the AudioContext and resumes it on subsequent plays', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.stop()
    })
    fakeCtx.state = 'suspended'
    act(() => {
      result.current.play()
    })

    expect(globalThis.AudioContext).toHaveBeenCalledTimes(1)
    expect(fakeCtx.resume).toHaveBeenCalled()
  })

  it('stops playback when the practice material changes', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setMode('triad')
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.mode).toBe('triad')
  })

  it('clamps bpm to the 40-220 range', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setBpm(500)
    })
    expect(result.current.bpm).toBe(220)

    act(() => {
      result.current.setBpm(10)
    })
    expect(result.current.bpm).toBe(40)
  })

  it('changing bpm does not stop playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setBpm(120)
    })

    expect(result.current.isPlaying).toBe(true)
    expect(result.current.bpm).toBe(120)
  })

  it('rebuilds steps when the mode changes', () => {
    const { result } = renderHook(() => usePracticeSession())
    const scaleSteps = result.current.steps

    act(() => {
      result.current.setMode('progression')
    })

    expect(result.current.steps).not.toEqual(scaleSteps)
    expect(result.current.steps.every((step) => step.strum)).toBe(true)
  })

  it('setKey() sets root and scale together and stops playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setKey('C', 'major')
    })

    expect(result.current.rootNote).toBe('C')
    expect(result.current.scale).toBe('major')
    expect(result.current.isPlaying).toBe(false)
  })

  it('resets an incompatible progression when the scale mode changes', () => {
    const { result } = renderHook(() => usePracticeSession())

    // minorPentatonic default → minor-mode progression is valid
    act(() => {
      result.current.setSelectedProgression('minor-1')
    })
    expect(result.current.selectedProgression).toBe('minor-1')

    act(() => {
      result.current.setScale('major')
    })
    expect(result.current.selectedProgression).toBe('1-4-5')
  })

  it('keeps a compatible progression when the scale changes within a mode', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setSelectedProgression('minor-2')
    })
    act(() => {
      result.current.setScale('blues')
    })
    expect(result.current.selectedProgression).toBe('minor-2')
  })

  it('closes the AudioContext on unmount', () => {
    const { result, unmount } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    unmount()

    expect(fakeCtx.close).toHaveBeenCalled()
  })
})
