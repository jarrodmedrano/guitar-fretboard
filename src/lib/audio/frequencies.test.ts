import { describe, it, expect } from 'vitest'
import { getStringMidiNotes, midiToFrequency, getFrequency } from './frequencies'
import { TUNING_CONFIGS, STANDARD_TUNING } from '@/lib/music-theory'

describe('getStringMidiNotes', () => {
  it('maps 6-string standard tuning to E2 A2 D3 G3 B3 E4', () => {
    expect(getStringMidiNotes(STANDARD_TUNING)).toEqual([40, 45, 50, 55, 59, 64])
  })

  it('maps drop D to D2 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.dropD.notes)).toEqual([38, 45, 50, 55, 59, 64])
  })

  it('maps drop C to C2 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.dropC.notes)[0]).toBe(36)
  })

  it('maps 4-string bass standard to E1 A1 D2 G2', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.bassStandard.notes)).toEqual([28, 33, 38, 43])
  })

  it('maps bass drop D to D1 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.bassDropD.notes)[0]).toBe(26)
  })

  it('maps 7-string standard to B1 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.standard7.notes)).toEqual([35, 40, 45, 50, 55, 59, 64])
  })

  it('maps 7-string drop A to A1 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.dropA7.notes)[0]).toBe(33)
  })

  it('maps 8-string standard to F#1 on the lowest string', () => {
    expect(getStringMidiNotes(TUNING_CONFIGS.standard8.notes)).toEqual([30, 35, 40, 45, 50, 55, 59, 64])
  })

  it('produces strictly ascending MIDI notes matching pitch classes for every tuning', () => {
    Object.values(TUNING_CONFIGS).forEach((config) => {
      const midiNotes = getStringMidiNotes(config.notes)
      expect(midiNotes).toHaveLength(config.notes.length)
      midiNotes.forEach((midi, i) => {
        if (i > 0) expect(midi).toBeGreaterThan(midiNotes[i - 1])
      })
    })
  })
})

describe('midiToFrequency', () => {
  it('maps A4 (MIDI 69) to 440 Hz', () => {
    expect(midiToFrequency(69)).toBe(440)
  })

  it('maps octaves to frequency doublings', () => {
    expect(midiToFrequency(57)).toBeCloseTo(220, 5)
    expect(midiToFrequency(81)).toBeCloseTo(880, 5)
  })
})

describe('getFrequency', () => {
  it('maps high E string fret 5 to A4 (440 Hz)', () => {
    expect(getFrequency(STANDARD_TUNING, 5, 5)).toBeCloseTo(440, 5)
  })

  it('maps open low E string to E2 (~82.41 Hz)', () => {
    expect(getFrequency(STANDARD_TUNING, 0, 0)).toBeCloseTo(82.41, 1)
  })

  it('maps low E string fret 12 to E3 (one octave up)', () => {
    expect(getFrequency(STANDARD_TUNING, 0, 12)).toBeCloseTo(getFrequency(STANDARD_TUNING, 0, 0) * 2, 5)
  })
})
