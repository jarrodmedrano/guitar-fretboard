import { describe, it, expect } from 'vitest'
import {
  CHORD_SUFFIXES,
  getChordVoicingCount,
  getChordVoicings,
  isMinorQuality,
  parseUberchordVoicing,
  type ChordQuality,
} from './chords'
import { CHORD_SHAPES } from './chord-shapes'
import { NOTES } from './music-theory'

const ALL_QUALITIES: ChordQuality[] = ['major', 'minor', '7', 'maj7', 'm7', 'm7b5']

describe('parseUberchordVoicing', () => {
  it('parses strings into absolute frets with x for muted', () => {
    const voicing = parseUberchordVoicing({
      strings: 'X 3 2 0 1 0',
      fingering: 'X 3 2 X 1 X',
      tones: 'C,E,G',
      chordName: 'C,,,',
    })
    expect(voicing.frets).toEqual(['x', 3, 2, 0, 1, 0])
    expect(voicing.fingers).toEqual([null, 3, 2, null, 1, null])
    expect(voicing.baseFret).toBe(1)
  })

  it('computes baseFret as the lowest fretted note, 0 for all-open shapes', () => {
    const barre = parseUberchordVoicing({
      strings: '5 7 7 6 5 5',
      fingering: '1 3 4 2 1 1',
      tones: 'A,C#,E',
      chordName: 'A,,,',
    })
    expect(barre.baseFret).toBe(5)

    const open = parseUberchordVoicing({
      strings: '0 X X 0 0 0',
      fingering: 'X X X X X X',
      tones: 'E',
      chordName: 'E,,,',
    })
    expect(open.baseFret).toBe(0)
  })
})

describe('getChordVoicings', () => {
  it('returns the canonical open shapes as the first voicing', () => {
    expect(getChordVoicings('C', 'major')[0].frets).toEqual(['x', 3, 2, 0, 1, 0])
    expect(getChordVoicings('A', 'minor')[0].frets).toEqual(['x', 0, 2, 2, 1, 0])
    expect(getChordVoicings('E', 'major')[0].frets).toEqual([0, 2, 2, 1, 0, 0])
  })

  it('orders voicings ascending up the neck', () => {
    NOTES.forEach((root) => {
      ALL_QUALITIES.forEach((quality) => {
        const voicings = getChordVoicings(root, quality)
        voicings.forEach((voicing, i) => {
          if (i > 0) expect(voicing.baseFret).toBeGreaterThanOrEqual(voicings[i - 1].baseFret)
        })
      })
    })
  })

  it('covers every root and quality with at least two playable voicings', () => {
    NOTES.forEach((root) => {
      ALL_QUALITIES.forEach((quality) => {
        const voicings = getChordVoicings(root, quality)
        expect(voicings.length, `${root} ${quality}`).toBeGreaterThanOrEqual(2)
        voicings.forEach((voicing) => {
          expect(voicing.frets).toHaveLength(6)
          expect(voicing.fingers).toHaveLength(6)
          voicing.frets.forEach((fret) => {
            if (fret !== 'x') {
              expect(fret).toBeGreaterThanOrEqual(0)
              expect(fret).toBeLessThanOrEqual(24)
            }
          })
          const sounding = voicing.frets.filter((fret) => fret !== 'x')
          expect(sounding.length, `${root} ${quality}`).toBeGreaterThanOrEqual(3)
        })
      })
    })
  })

  it('returns the same cached array on repeat calls', () => {
    expect(getChordVoicings('C', 'major')).toBe(getChordVoicings('C', 'major'))
  })

  it('returns an empty array for unknown chords', () => {
    expect(getChordVoicings('C', 'nope' as ChordQuality)).toEqual([])
  })
})

describe('getChordVoicingCount', () => {
  it('matches the dataset', () => {
    expect(getChordVoicingCount('C', 'major')).toBe(CHORD_SHAPES.C_major.length)
    expect(getChordVoicingCount('C', 'nope' as ChordQuality)).toBe(0)
  })
})

describe('quality helpers', () => {
  it('maps qualities to display suffixes', () => {
    expect(CHORD_SUFFIXES.major).toBe('')
    expect(CHORD_SUFFIXES.minor).toBe('m')
    expect(CHORD_SUFFIXES.m7b5).toBe('m7b5')
  })

  it('classifies minor-flavored qualities for roman numeral casing', () => {
    expect(isMinorQuality('minor')).toBe(true)
    expect(isMinorQuality('m7')).toBe(true)
    expect(isMinorQuality('m7b5')).toBe(true)
    expect(isMinorQuality('major')).toBe(false)
    expect(isMinorQuality('7')).toBe(false)
    expect(isMinorQuality('maj7')).toBe(false)
  })
})
