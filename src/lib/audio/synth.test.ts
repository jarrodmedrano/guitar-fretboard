import { describe, it, expect, vi } from 'vitest'
import { playPluck, playClick } from './synth'
import { createFakeAudioContext } from '@/test/fake-audio-context'

describe('playPluck', () => {
  it('creates an oscillator through a lowpass filter and decaying gain', () => {
    const ctx = createFakeAudioContext()
    playPluck(ctx as unknown as AudioContext, 1.5, 440, 0.5)

    const oscillator = ctx.oscillators[0]
    expect(oscillator.type).toBe('triangle')
    expect(oscillator.frequency.value).toBe(440)
    expect(oscillator.start).toHaveBeenCalledWith(1.5)
    expect(oscillator.stop).toHaveBeenCalledWith(1.5 + 0.5 + 0.05)

    const filter = ctx.filters[0]
    expect(filter.type).toBe('lowpass')
    expect(filter.frequency.value).toBe(1760)

    const gainNode = ctx.gains[0]
    expect(gainNode.gain.setValueAtTime).toHaveBeenCalledWith(0.25, 1.5)
    expect(gainNode.gain.exponentialRampToValueAtTime).toHaveBeenCalledWith(0.001, 2.0)
  })

  it('clamps the filter frequency to 8 kHz', () => {
    const ctx = createFakeAudioContext()
    playPluck(ctx as unknown as AudioContext, 0, 4000, 0.5)
    expect(ctx.filters[0].frequency.value).toBe(8000)
  })
})

describe('playClick', () => {
  it('plays a short 1000 Hz sine blip', () => {
    const ctx = createFakeAudioContext()
    playClick(ctx as unknown as AudioContext, 2, false)

    const oscillator = ctx.oscillators[0]
    expect(oscillator.type).toBe('sine')
    expect(oscillator.frequency.value).toBe(1000)
    expect(oscillator.start).toHaveBeenCalledWith(2)
  })

  it('raises the pitch on accented beats', () => {
    const ctx = createFakeAudioContext()
    playClick(ctx as unknown as AudioContext, 0, true)
    expect(ctx.oscillators[0].frequency.value).toBe(1600)
  })
})

describe('fake context bookkeeping', () => {
  it('tracks separate node lists per call', () => {
    const ctx = createFakeAudioContext()
    playClick(ctx as unknown as AudioContext, 0, false)
    playClick(ctx as unknown as AudioContext, 1, false)
    expect(ctx.oscillators).toHaveLength(2)
    expect(ctx.gains).toHaveLength(2)
    expect(vi.isMockFunction(ctx.oscillators[0].connect)).toBe(true)
  })
})
