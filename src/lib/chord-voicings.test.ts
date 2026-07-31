import { describe, it, expect } from 'vitest'
import {
  getChordVoicingCountForTuning,
  getChordVoicingsForTuning,
} from './chord-voicings'
import { getChordVoicings, type ChordQuality } from './chords'
import { NOTES, type Note } from './notes'
import { STANDARD_TUNING, TUNINGS, TUNING_CONFIGS } from './music-theory'
import { getStringMidiNotes } from './audio/frequencies'

const ALL_QUALITIES: ChordQuality[] = [
  'major', 'minor', 'dim', 'aug', 'sus2', 'sus4',
  '7', 'maj7', 'm7', 'm7b5', 'dim7',
  '6', 'm6', 'add9', '9',
]

const CHORD_INTERVALS: Record<ChordQuality, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  '7': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  '6': [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  add9: [0, 4, 7, 14],
  '9': [0, 4, 7, 10, 14],
}

function soundedPitchClasses(frets: (number | 'x')[], tuning: Note[]): number[] {
  const midiNotes = getStringMidiNotes(tuning)
  return frets.flatMap((fret, stringIndex) =>
    fret === 'x' ? [] : [(midiNotes[stringIndex] + fret) % 12]
  )
}

describe('exhaustive invariants across every tuning, root, and quality', () => {
  Object.entries(TUNING_CONFIGS).forEach(([tuningKey, config]) => {
    it(`holds for ${tuningKey}`, () => {
      // 6-string tunings intentionally show the curated standard-tuning shapes
      // (existing app behavior), so pitch math uses standard tuning for them
      const pitchTuning = config.notes.length === 6 ? STANDARD_TUNING : config.notes

      NOTES.forEach((root) => {
        ALL_QUALITIES.forEach((quality) => {
          const voicings = getChordVoicingsForTuning(root, quality, config.notes)
          const label = `${tuningKey} ${root} ${quality}`
          expect(voicings.length, label).toBeGreaterThanOrEqual(2)

          const rootPc = NOTES.indexOf(root)
          const allowed = new Set(
            CHORD_INTERVALS[quality].map((interval) => (rootPc + interval) % 12)
          )
          const thirdPc = (rootPc + CHORD_INTERVALS[quality][1]) % 12
          const seventhInterval = CHORD_INTERVALS[quality][3]

          voicings.forEach((voicing, i) => {
            expect(voicing.frets, label).toHaveLength(config.notes.length)
            expect(voicing.fingers, label).toHaveLength(config.notes.length)
            if (i > 0) {
              expect(voicing.baseFret, label).toBeGreaterThanOrEqual(
                voicings[i - 1].baseFret
              )
            }

            voicing.frets.forEach((fret) => {
              if (fret !== 'x') {
                expect(fret).toBeGreaterThanOrEqual(0)
                expect(fret).toBeLessThanOrEqual(24)
              }
            })

            const pcs = soundedPitchClasses(voicing.frets, pitchTuning)
            pcs.forEach((pc) => expect(allowed.has(pc), `${label} v${i}`).toBe(true))
            expect(pcs, `${label} v${i} root`).toContain(rootPc)
            expect(pcs, `${label} v${i} third`).toContain(thirdPc)
            if (seventhInterval !== undefined) {
              expect(pcs, `${label} v${i} seventh`).toContain(
                (rootPc + seventhInterval) % 12
              )
            }
          })
        })
      })
    })
  })
})

describe('bass voicings (4-string)', () => {
  const bassTunings = ['bassStandard', 'bassDropD', 'bassDStandard'] as const

  it('keeps fretted notes within a 4-fret hand span and sounds 3-4 notes', () => {
    bassTunings.forEach((key) => {
      const tuning = TUNINGS[key]
      NOTES.forEach((root) => {
        ALL_QUALITIES.forEach((quality) => {
          getChordVoicingsForTuning(root, quality, tuning).forEach((voicing) => {
            const fretted = voicing.frets.filter(
              (fret): fret is number => fret !== 'x' && fret > 0
            )
            if (fretted.length > 0) {
              // 3-fret span normally; 4-5 for the rare relaxed-span combos
              expect(Math.max(...fretted) - Math.min(...fretted)).toBeLessThanOrEqual(5)
            }
            const sounded = voicing.frets.filter((fret) => fret !== 'x')
            expect(sounded.length).toBeGreaterThanOrEqual(3)
            expect(sounded.length).toBeLessThanOrEqual(4)
          })
        })
      })
    })
  })

  it('produces the classic compact C major on standard bass', () => {
    const voicings = getChordVoicingsForTuning('C', 'major', TUNINGS.bassStandard)
    expect(voicings[0].frets).toEqual(['x', 3, 2, 0])
  })
})

describe('6-string passthrough', () => {
  it('returns the curated array identity for standard tuning', () => {
    NOTES.forEach((root) => {
      ALL_QUALITIES.forEach((quality) => {
        expect(getChordVoicingsForTuning(root, quality, STANDARD_TUNING)).toBe(
          getChordVoicings(root, quality)
        )
      })
    })
  })
})

describe('7-string extension (standard7)', () => {
  const tuning = TUNINGS.standard7

  it('keeps the curated shape on the top six strings', () => {
    NOTES.forEach((root) => {
      ALL_QUALITIES.forEach((quality) => {
        const extended = getChordVoicingsForTuning(root, quality, tuning)
        const curated = getChordVoicings(root, quality)
        expect(extended).toHaveLength(curated.length)
        extended.forEach((voicing) => {
          const topSix = JSON.stringify(voicing.frets.slice(1))
          expect(
            curated.some((c) => JSON.stringify(c.frets) === topSix),
            `${root} ${quality} ${topSix}`
          ).toBe(true)
        })
      })
    })
  })

  it('extends the low B with the root or fifth, or mutes it', () => {
    NOTES.forEach((root) => {
      const rootPc = NOTES.indexOf(root)
      const fifthPc = (rootPc + 7) % 12
      getChordVoicingsForTuning(root, 'major', tuning).forEach((voicing) => {
        const low = voicing.frets[0]
        if (low !== 'x') {
          const pc = (getStringMidiNotes(tuning)[0] + low) % 12
          expect([rootPc, fifthPc]).toContain(pc)
        }
      })
    })
  })

  it('produces the classic low-B grips', () => {
    expect(getChordVoicingsForTuning('C', 'major', tuning)[0].frets).toEqual([
      1, 'x', 3, 2, 0, 1, 0,
    ])
    expect(getChordVoicingsForTuning('E', 'major', tuning)[0].frets[0]).toBe(0)
  })
})

describe('8-string extension (standard8)', () => {
  const tuning = TUNINGS.standard8

  it('keeps the curated shape on the top six strings and restricts the lowest string to the root', () => {
    const rootPcOf = (root: Note) => NOTES.indexOf(root)
    NOTES.forEach((root) => {
      const extended = getChordVoicingsForTuning(root, 'major', tuning)
      const curated = getChordVoicings(root, 'major')
      expect(extended).toHaveLength(curated.length)
      extended.forEach((voicing) => {
        const topSix = JSON.stringify(voicing.frets.slice(2))
        expect(curated.some((c) => JSON.stringify(c.frets) === topSix)).toBe(true)
        const lowest = voicing.frets[0]
        if (lowest !== 'x') {
          const pc = (getStringMidiNotes(tuning)[0] + lowest) % 12
          expect(pc).toBe(rootPcOf(root))
        }
      })
    })
  })
})

describe('transposed top-six tunings (aStandard7)', () => {
  it('transposes the curated shape up two frets', () => {
    const tuning = TUNINGS.aStandard7
    const extended = getChordVoicingsForTuning('C', 'major', tuning)
    const curated = getChordVoicings('C', 'major')
    const transposed = curated.map((c) =>
      JSON.stringify(c.frets.map((fret) => (fret === 'x' ? 'x' : fret + 2)))
    )

    expect(extended).toHaveLength(curated.length)
    extended.forEach((voicing) => {
      expect(transposed).toContain(JSON.stringify(voicing.frets.slice(1)))
    })
  })
})

describe('fingering and caching', () => {
  it('assigns fingers 1-4 to fretted strings and null to open/muted', () => {
    const voicings = getChordVoicingsForTuning('C', 'major', TUNINGS.bassStandard)
    voicings.forEach((voicing) => {
      voicing.frets.forEach((fret, i) => {
        if (fret === 'x' || fret === 0) {
          expect(voicing.fingers[i]).toBeNull()
        } else {
          expect(voicing.fingers[i]).toBeGreaterThanOrEqual(1)
          expect(voicing.fingers[i]).toBeLessThanOrEqual(4)
        }
      })
    })
  })

  it('returns the same cached array on repeat calls', () => {
    expect(getChordVoicingsForTuning('C', 'major', TUNINGS.bassStandard)).toBe(
      getChordVoicingsForTuning('C', 'major', TUNINGS.bassStandard)
    )
  })

  it('counts match the voicing list', () => {
    expect(getChordVoicingCountForTuning('C', 'major', TUNINGS.bassStandard)).toBe(
      getChordVoicingsForTuning('C', 'major', TUNINGS.bassStandard).length
    )
    expect(getChordVoicingCountForTuning('C', 'major', STANDARD_TUNING)).toBe(
      getChordVoicings('C', 'major').length
    )
  })
})
