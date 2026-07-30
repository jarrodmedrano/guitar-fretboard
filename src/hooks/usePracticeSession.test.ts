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

  it('arpeggio spreads chord notes evenly across the bar', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('triad')
    })
    act(() => {
      result.current.setArpeggioOn(true)
    })
    act(() => {
      result.current.play()
    })

    // 80 BPM → 0.75s per beat; a 4-beat triad bar is 3s; 3 notes → 1s apart
    const pluckStarts = fakeCtx.oscillators
      .filter((osc) => osc.type === 'triangle')
      .map((osc) => osc.start.mock.calls[0][0] as number)
    expect(pluckStarts).toHaveLength(3)
    expect(pluckStarts[1] - pluckStarts[0]).toBeCloseTo(1, 5)
    expect(pluckStarts[2] - pluckStarts[1]).toBeCloseTo(1, 5)
  })

  it('strums with a quick stagger when arpeggio is off', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('triad')
    })
    act(() => {
      result.current.play()
    })

    const pluckStarts = fakeCtx.oscillators
      .filter((osc) => osc.type === 'triangle')
      .map((osc) => osc.start.mock.calls[0][0] as number)
    expect(pluckStarts).toHaveLength(3)
    expect(pluckStarts[1] - pluckStarts[0]).toBeCloseTo(0.035, 5)
  })

  it('highlights only the sounding note while arpeggiating', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('triad')
    })
    act(() => {
      result.current.setArpeggioOn(true)
    })
    act(() => {
      result.current.play()
    })

    // First arpeggio note starts at the scheduler start delay (0.05s)
    act(() => {
      fakeCtx.currentTime = 0.06
      vi.advanceTimersByTime(25)
    })
    const firstStep = result.current.steps[0]
    expect(result.current.activeNotes.size).toBe(1)
    expect(
      result.current.activeNotes.has(
        `${firstStep.notes[0].stringIndex}-${firstStep.notes[0].fret}`
      )
    ).toBe(true)

    // Second note of the triad sounds 1s later at 80 BPM (3s bar / 3 notes)
    act(() => {
      fakeCtx.currentTime = 1.06
      vi.advanceTimersByTime(25)
    })
    expect(result.current.activeNotes.size).toBe(1)
    expect(
      result.current.activeNotes.has(
        `${firstStep.notes[1].stringIndex}-${firstStep.notes[1].fret}`
      )
    ).toBe(true)
  })

  it('still highlights the whole chord when arpeggio is off', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('triad')
    })
    act(() => {
      result.current.play()
    })
    act(() => {
      fakeCtx.currentTime = 0.06
      vi.advanceTimersByTime(25)
    })

    expect(result.current.activeNotes.size).toBe(3)
  })

  it('display toggles default like the main page and never stop playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    expect(result.current.showFingerings).toBe(true)
    expect(result.current.showOnlyChordTones).toBe(false)

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setShowFingerings(false)
    })
    act(() => {
      result.current.setShowOnlyChordTones(true)
    })

    expect(result.current.showFingerings).toBe(false)
    expect(result.current.showOnlyChordTones).toBe(true)
    expect(result.current.isPlaying).toBe(true)
  })

  it('toggling arpeggio does not stop playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setArpeggioOn(true)
    })

    expect(result.current.isPlaying).toBe(true)
    expect(result.current.arpeggioOn).toBe(true)
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

  it('switching instruments updates tuning and keeps practice material valid', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setStringCount(4)
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.stringCount).toBe(4)
    expect(result.current.tuningKey).toBe('bassStandard')
    expect(result.current.tuning).toEqual(['E', 'A', 'D', 'G'])
    expect(result.current.triadStringSets).toHaveLength(2)

    // Scale practice still produces valid steps on bass
    expect(result.current.steps.length).toBeGreaterThan(0)
    result.current.steps.forEach((step) => {
      step.notes.forEach((note) => {
        expect(note.stringIndex).toBeLessThan(4)
      })
    })
  })

  it('keeps chord mode working when switching to bass', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('chord')
    })
    act(() => {
      result.current.setStringCount(4)
    })

    expect(result.current.mode).toBe('chord')
    expect(result.current.steps.length).toBeGreaterThan(0)
    result.current.steps.forEach((step) => {
      expect(step.notes.length).toBeGreaterThanOrEqual(3)
      step.notes.forEach((note) => {
        expect(note.stringIndex).toBeLessThan(4)
      })
    })
  })

  it('keeps progression mode working on 7-string with in-range notes', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('progression')
    })
    act(() => {
      result.current.setStringCount(7)
    })

    expect(result.current.mode).toBe('progression')
    expect(result.current.steps.length).toBeGreaterThan(0)
    result.current.steps.forEach((step) => {
      step.notes.forEach((note) => {
        expect(note.stringIndex).toBeLessThan(7)
      })
    })
  })

  it('clamps the chord voicing index when the instrument changes', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('chord')
    })
    act(() => {
      result.current.setPosition(3)
    })
    act(() => {
      result.current.setStringCount(4)
    })

    // Whatever the bass voicing count is, playback material stays valid
    expect(result.current.effectivePosition).toBeLessThanOrEqual(3)
    expect(result.current.steps.length).toBeGreaterThan(0)
  })

  it('changing tuning stops playback', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.play()
    })
    act(() => {
      result.current.setTuningKey('dropD')
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.tuning[0]).toBe('D')
  })

  it('previewing a step shows its notes and label without playing', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('progression')
    })
    act(() => {
      result.current.setPreviewStep(2)
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.displayStep).toBe(2)
    expect(result.current.currentLabel).toBe(result.current.steps[2].label)

    const expected = new Set(
      result.current.steps[2].notes.map((n) => `${n.stringIndex}-${n.fret}`)
    )
    expect(result.current.activeNotes).toEqual(expected)
    expect(fakeCtx.oscillators).toHaveLength(0)
  })

  it('playback overrides the previewed step', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('progression')
    })
    act(() => {
      result.current.setPreviewStep(2)
    })
    act(() => {
      result.current.play()
    })
    act(() => {
      fakeCtx.currentTime = 0.06
      vi.advanceTimersByTime(25)
    })

    expect(result.current.displayStep).toBe(0)
  })

  it('clamps a stale preview and clears it on material changes', () => {
    const { result } = renderHook(() => usePracticeSession())

    act(() => {
      result.current.setMode('progression')
    })
    act(() => {
      result.current.setPreviewStep(99)
    })
    expect(result.current.displayStep).toBe(result.current.steps.length - 1)

    act(() => {
      result.current.setMode('scale')
    })
    expect(result.current.displayStep).toBeNull()
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
