import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAnnouncements } from './useAnnouncements'

describe('useAnnouncements', () => {
  it('should initialize with empty announcement', () => {
    const { result } = renderHook(() => useAnnouncements())
    expect(result.current.announcement).toBe('')
  })

  it('should update announcement when announce is called', () => {
    const { result } = renderHook(() => useAnnouncements())

    act(() => {
      result.current.announce('Test message')
    })

    expect(result.current.announcement).toBe('Test message')
  })
})
