import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFretboardApp } from './useFretboardApp'

describe('useFretboardApp', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFretboardApp())

    expect(result.current.rootNote).toBe('A')
    expect(result.current.scale).toBe('minorPentatonic')
    expect(result.current.position).toBe(null)
    expect(result.current.stringCount).toBe(6)
    expect(result.current.displayMode).toBe('notes')
  })

  it('should update root note and announce change', () => {
    const { result } = renderHook(() => useFretboardApp())

    act(() => {
      result.current.handleRootChange('C')
    })

    expect(result.current.rootNote).toBe('C')
    expect(result.current.announcement).toBe('Root note changed to C')
  })

  it('should reset position when scale changes', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Set a position first
    act(() => {
      result.current.handlePositionChange(2)
    })
    expect(result.current.position).toBe(2)

    // Change scale - position should reset
    act(() => {
      result.current.handleScaleChange('blues')
    })

    expect(result.current.scale).toBe('blues')
    expect(result.current.position).toBe(null)
  })

  it('should disable progression mode when chords mode is enabled', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Enable progression mode first
    act(() => {
      result.current.handleProgressionModeToggle(true)
    })
    expect(result.current.showProgressionMode).toBe(true)

    // Enable chords mode - should disable progression mode
    act(() => {
      result.current.handleChordsModeToggle(true)
    })

    expect(result.current.showChordsMode).toBe(true)
    expect(result.current.showProgressionMode).toBe(false)
  })

  it('should calculate scaleNotes correctly', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Default is A minor pentatonic: A, C, D, E, G
    expect(result.current.scaleNotes).toEqual(['A', 'C', 'D', 'E', 'G'])
  })
})

  it('should handle string count change and update tuning', () => {
    const { result } = renderHook(() => useFretboardApp())

    act(() => {
      result.current.handleStringCountChange(4)
    })

    expect(result.current.stringCount).toBe(4)
    // Default tuning for 4-string should be set
  })

  it('should announce when showing all positions', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Set a position first
    act(() => {
      result.current.handlePositionChange(1)
    })

    // Then clear it
    act(() => {
      result.current.handlePositionChange(null)
    })

    expect(result.current.position).toBe(null)
    expect(result.current.announcement).toBe('Showing all positions')
  })

  it('should cycle through display modes', () => {
    const { result } = renderHook(() => useFretboardApp())

    expect(result.current.displayMode).toBe('notes')

    act(() => {
      result.current.handleToggleDisplayMode()
    })
    expect(result.current.displayMode).toBe('intervals')

    act(() => {
      result.current.handleToggleDisplayMode()
    })
    expect(result.current.displayMode).toBe('degrees')

    act(() => {
      result.current.handleToggleDisplayMode()
    })
    expect(result.current.displayMode).toBe('notes')
  })

  it('should toggle and announce chords mode', () => {
    const { result } = renderHook(() => useFretboardApp())

    act(() => {
      result.current.handleToggleChordsMode()
    })

    expect(result.current.showChordsMode).toBe(true)
    expect(result.current.announcement).toBe('Chords mode enabled')

    act(() => {
      result.current.handleToggleChordsMode()
    })

    expect(result.current.showChordsMode).toBe(false)
    expect(result.current.announcement).toBe('Chords mode disabled')
  })
