import { describe, it, expect } from 'vitest'
import { getTriadStringSets, getTriadVoicing } from './triads'
import { getStringMidiNotes } from './audio/frequencies'
import { NOTES, STANDARD_TUNING, TUNING_CONFIGS, type Note } from '@/lib/music-theory'

const MAJOR_PITCH_OFFSETS = [0, 4, 7]
const MINOR_PITCH_OFFSETS = [0, 3, 7]

describe('getTriadStringSets', () => {
  it('returns four adjacent windows from the top for 6-string', () => {
    expect(getTriadStringSets(6)).toEqual([
      { label: 'Strings 1-2-3', stringIndices: [3, 4, 5] },
      { label: 'Strings 2-3-4', stringIndices: [2, 3, 4] },
      { label: 'Strings 3-4-5', stringIndices: [1, 2, 3] },
      { label: 'Strings 4-5-6', stringIndices: [0, 1, 2] },
    ])
  })

  it('returns two windows for 4-string bass', () => {
    expect(getTriadStringSets(4)).toEqual([
      { label: 'Strings 1-2-3', stringIndices: [1, 2, 3] },
      { label: 'Strings 2-3-4', stringIndices: [0, 1, 2] },
    ])
  })

  it('caps at four windows for 7- and 8-string instruments', () => {
    expect(getTriadStringSets(7)).toHaveLength(4)
    expect(getTriadStringSets(8)).toHaveLength(4)
    expect(getTriadStringSets(7)[0].stringIndices).toEqual([4, 5, 6])
  })
})

describe('getTriadVoicing', () => {
  it('builds C major root position on strings 1-2-3 as frets 5-5-3', () => {
    const voicing = getTriadVoicing('C', 'major', [3, 4, 5], 0)
    expect(voicing).not.toBeNull()
    expect(voicing!.frets).toEqual([5, 5, 3])
    expect(voicing!.notes).toEqual(['C', 'E', 'G'])
  })

  it('builds C major 1st inversion on strings 1-2-3 as frets 9-8-8', () => {
    const voicing = getTriadVoicing('C', 'major', [3, 4, 5], 1)
    expect(voicing!.frets).toEqual([9, 8, 8])
    expect(voicing!.notes).toEqual(['E', 'G', 'C'])
  })

  it('builds C major 2nd inversion on strings 1-2-3 as frets 0-1-0', () => {
    const voicing = getTriadVoicing('C', 'major', [3, 4, 5], 2)
    expect(voicing!.frets).toEqual([0, 1, 0])
    expect(voicing!.notes).toEqual(['G', 'C', 'E'])
  })

  it('builds A minor root position on strings 1-2-3 as frets 2-1-0', () => {
    const voicing = getTriadVoicing('A', 'minor', [3, 4, 5], 0)
    expect(voicing!.frets).toEqual([2, 1, 0])
    expect(voicing!.notes).toEqual(['A', 'C', 'E'])
  })

  it('respects minFret to produce octave-up variants', () => {
    const voicing = getTriadVoicing('C', 'major', [3, 4, 5], 2, STANDARD_TUNING, 5)
    expect(voicing!.frets).toEqual([12, 13, 12])
  })

  it('returns null when the shape would exceed fret 17', () => {
    expect(getTriadVoicing('C', 'major', [3, 4, 5], 2, STANDARD_TUNING, 15)).toBeNull()
  })

  it('produces strictly ascending pitches with correct pitch classes for all roots, qualities, and inversions', () => {
    const midiNotes = getStringMidiNotes(STANDARD_TUNING)

    NOTES.forEach((root) => {
      ;(['major', 'minor'] as const).forEach((quality) => {
        const offsets = quality === 'major' ? MAJOR_PITCH_OFFSETS : MINOR_PITCH_OFFSETS
        ;([0, 1, 2] as const).forEach((inversion) => {
          const voicing = getTriadVoicing(root, quality, [3, 4, 5], inversion)
          if (!voicing) return

          const pitches = voicing.stringIndices.map(
            (stringIndex, i) => midiNotes[stringIndex] + voicing.frets[i]
          )
          expect(pitches[1]).toBeGreaterThan(pitches[0])
          expect(pitches[2]).toBeGreaterThan(pitches[1])

          const rootPitchClass = NOTES.indexOf(root)
          const expectedClasses = [0, 1, 2].map(
            (i) => (rootPitchClass + offsets[(inversion + i) % 3]) % 12
          )
          voicing.notes.forEach((note: Note, i: number) => {
            expect(NOTES.indexOf(note)).toBe(expectedClasses[i])
          })
        })
      })
    })
  })

  it('works on drop D tuning', () => {
    const voicing = getTriadVoicing('D', 'major', [0, 1, 2], 0, TUNING_CONFIGS.dropD.notes)
    expect(voicing).not.toBeNull()
    expect(voicing!.notes).toEqual(['D', 'F#', 'A'])
    const midiNotes = getStringMidiNotes(TUNING_CONFIGS.dropD.notes)
    const pitches = voicing!.stringIndices.map((s, i) => midiNotes[s] + voicing!.frets[i])
    expect(pitches[0] % 12).toBe(NOTES.indexOf('D'))
  })
})
