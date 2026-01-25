import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'

describe('useKeyboardShortcuts', () => {
  let onPreviousPosition: ReturnType<typeof vi.fn>
  let onNextPosition: ReturnType<typeof vi.fn>
  let onToggleDisplayMode: ReturnType<typeof vi.fn>
  let onToggleChordsMode: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onPreviousPosition = vi.fn()
    onNextPosition = vi.fn()
    onToggleDisplayMode = vi.fn()
    onToggleChordsMode = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = () => {
    return renderHook(() =>
      useKeyboardShortcuts({
        onPreviousPosition,
        onNextPosition,
        onToggleDisplayMode,
        onToggleChordsMode,
      })
    )
  }

  describe('Position navigation', () => {
    it('should call onPreviousPosition when [ key is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: '[' })
      window.dispatchEvent(event)

      expect(onPreviousPosition).toHaveBeenCalledTimes(1)
    })

    it('should call onNextPosition when ] key is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: ']' })
      window.dispatchEvent(event)

      expect(onNextPosition).toHaveBeenCalledTimes(1)
    })

    it('should prevent default behavior for [ key', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: '[', cancelable: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should prevent default behavior for ] key', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: ']', cancelable: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should not call onNextPosition when / key is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: '/' })
      window.dispatchEvent(event)

      expect(onNextPosition).not.toHaveBeenCalled()
    })
  })

  describe('Display mode toggle', () => {
    it('should call onToggleDisplayMode when lowercase d is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'd' })
      window.dispatchEvent(event)

      expect(onToggleDisplayMode).toHaveBeenCalledTimes(1)
    })

    it('should call onToggleDisplayMode when uppercase D is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'D' })
      window.dispatchEvent(event)

      expect(onToggleDisplayMode).toHaveBeenCalledTimes(1)
    })

    it('should prevent default behavior for d key', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'd', cancelable: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Chords mode toggle', () => {
    it('should call onToggleChordsMode when lowercase c is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'c' })
      window.dispatchEvent(event)

      expect(onToggleChordsMode).toHaveBeenCalledTimes(1)
    })

    it('should call onToggleChordsMode when uppercase C is pressed', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'C' })
      window.dispatchEvent(event)

      expect(onToggleChordsMode).toHaveBeenCalledTimes(1)
    })

    it('should prevent default behavior for c key', () => {
      setup()

      const event = new KeyboardEvent('keydown', { key: 'c', cancelable: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Input element handling', () => {
    it('should ignore keyboard shortcuts when typing in an input element', () => {
      setup()

      const input = document.createElement('input')
      document.body.appendChild(input)

      const event = new KeyboardEvent('keydown', { key: '[', bubbles: true })
      Object.defineProperty(event, 'target', { value: input, enumerable: true })
      input.dispatchEvent(event)

      expect(onPreviousPosition).not.toHaveBeenCalled()

      document.body.removeChild(input)
    })

    it('should ignore keyboard shortcuts when typing in a select element', () => {
      setup()

      const select = document.createElement('select')
      document.body.appendChild(select)

      const event = new KeyboardEvent('keydown', { key: ']', bubbles: true })
      Object.defineProperty(event, 'target', { value: select, enumerable: true })
      select.dispatchEvent(event)

      expect(onNextPosition).not.toHaveBeenCalled()

      document.body.removeChild(select)
    })

    it('should not ignore shortcuts from other elements', () => {
      setup()

      const div = document.createElement('div')
      document.body.appendChild(div)

      const event = new KeyboardEvent('keydown', { key: '[', bubbles: true })
      Object.defineProperty(event, 'target', { value: div, enumerable: true })
      div.dispatchEvent(event)

      expect(onPreviousPosition).toHaveBeenCalledTimes(1)

      document.body.removeChild(div)
    })
  })

  describe('Event listener cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = setup()
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

      removeEventListenerSpy.mockRestore()
    })

    it('should not respond to events after unmount', () => {
      const { unmount } = setup()
      unmount()

      const event = new KeyboardEvent('keydown', { key: '[' })
      window.dispatchEvent(event)

      expect(onPreviousPosition).not.toHaveBeenCalled()
    })
  })

  describe('Multiple key presses', () => {
    it('should handle multiple different key presses', () => {
      setup()

      window.dispatchEvent(new KeyboardEvent('keydown', { key: '[' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ']' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }))

      expect(onPreviousPosition).toHaveBeenCalledTimes(1)
      expect(onNextPosition).toHaveBeenCalledTimes(1)
      expect(onToggleDisplayMode).toHaveBeenCalledTimes(1)
      expect(onToggleChordsMode).toHaveBeenCalledTimes(1)
    })

    it('should handle repeated key presses of the same key', () => {
      setup()

      window.dispatchEvent(new KeyboardEvent('keydown', { key: ']' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ']' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ']' }))

      expect(onNextPosition).toHaveBeenCalledTimes(3)
    })
  })

  describe('Unhandled keys', () => {
    it('should not call any handlers for unrelated keys', () => {
      setup()

      const unrelatedKeys = ['a', 'z', '1', 'Enter', 'Escape', 'Tab', '/']

      unrelatedKeys.forEach(key => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      })

      expect(onPreviousPosition).not.toHaveBeenCalled()
      expect(onNextPosition).not.toHaveBeenCalled()
      expect(onToggleDisplayMode).not.toHaveBeenCalled()
      expect(onToggleChordsMode).not.toHaveBeenCalled()
    })
  })
})
