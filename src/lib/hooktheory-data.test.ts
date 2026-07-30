import { describe, it, expect } from 'vitest'
import {
  CHORD_PROGRESSIONS,
  KEY_POPULARITY,
  NOTES,
  SCALES,
  TUNINGS,
  getProgressionChordAt,
  getProgressionChordName,
  getProgressionChordVoicing,
  getProgressionModeForScale,
  getProgressionsForScale,
  type Note,
} from './music-theory'

describe('KEY_POPULARITY', () => {
  it('contains all 84 keys (12 roots × 7 modes)', () => {
    expect(KEY_POPULARITY).toHaveLength(84)
  })

  it('has valid roots, scales, and popularity values', () => {
    KEY_POPULARITY.forEach((key) => {
      expect(NOTES).toContain(key.root)
      expect(SCALES[key.scale]).toBeDefined()
      expect(key.popularity).toBeGreaterThanOrEqual(1)
      expect(key.popularity).toBeLessThanOrEqual(17)
      expect(key.name).toContain(key.root)
    })
  })

  it('lists 12 keys per mode in descending popularity', () => {
    const byMode = KEY_POPULARITY.reduce<Record<string, number[]>>((acc, key) => {
      return { ...acc, [key.scale]: [...(acc[key.scale] ?? []), key.popularity] }
    }, {})

    expect(Object.keys(byMode)).toHaveLength(7)
    Object.values(byMode).forEach((popularities) => {
      expect(popularities).toHaveLength(12)
      popularities.forEach((popularity, i) => {
        if (i > 0) expect(popularity).toBeLessThanOrEqual(popularities[i - 1])
      })
    })
  })

  it('ranks C major and A minor first in their modes', () => {
    const major = KEY_POPULARITY.filter((key) => key.scale === 'major')
    const minor = KEY_POPULARITY.filter((key) => key.scale === 'minor')
    expect(major[0]).toMatchObject({ root: 'C', popularity: 15 })
    expect(minor[0]).toMatchObject({ root: 'A', popularity: 13 })
  })
})

describe('Hooktheory progressions data', () => {
  const hooktheoryEntries = Object.entries(CHORD_PROGRESSIONS).filter(([, p]) => p.mode)

  it('has 35 mode-tagged progressions', () => {
    expect(hooktheoryEntries).toHaveLength(35)
  })

  it('gives every mode-tagged progression a valid mode and matching qualities', () => {
    hooktheoryEntries.forEach(([, progression]) => {
      expect(SCALES[progression.mode!]).toBeDefined()
      expect(progression.qualities).toHaveLength(progression.degreesMajor.length)
      expect(progression.degreesMinor).toEqual(progression.degreesMajor)
    })
  })

  it('starts every progression on the tonic', () => {
    hooktheoryEntries.forEach(([key, progression]) => {
      expect(progression.degreesMajor[0], key).toBe(1)
    })
  })
})

describe('getProgressionModeForScale', () => {
  it('passes through the seven modes', () => {
    ;['major', 'minor', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'].forEach(
      (mode) => {
        expect(getProgressionModeForScale(mode)).toBe(mode)
      }
    )
  })

  it('maps derived scales to major or minor', () => {
    expect(getProgressionModeForScale('majorPentatonic')).toBe('major')
    expect(getProgressionModeForScale('minorPentatonic')).toBe('minor')
    expect(getProgressionModeForScale('blues')).toBe('minor')
    expect(getProgressionModeForScale('harmonicMinor')).toBe('minor')
  })
})

describe('getProgressionsForScale', () => {
  it('returns major progressions plus generic ones for major scales', () => {
    const keys = getProgressionsForScale('major').map(([key]) => key)
    expect(keys).toContain('major-1')
    expect(keys).toContain('1-4-5')
    expect(keys).not.toContain('minor-1')
    expect(keys).not.toContain('dorian-1')
  })

  it('hides legacy duplicates of Hooktheory major progressions', () => {
    const keys = getProgressionsForScale('major').map(([key]) => key)
    expect(keys).not.toContain('1-5-6-4')
    expect(keys).not.toContain('1-6-4-5')
  })

  it('keeps legacy progressions for minor scales', () => {
    const keys = getProgressionsForScale('minorPentatonic').map(([key]) => key)
    expect(keys).toContain('1-5-6-4')
    expect(keys).toContain('minor-1')
    expect(keys).not.toContain('major-1')
  })

  it('returns mode-specific progressions for modal scales', () => {
    expect(getProgressionsForScale('dorian').map(([key]) => key)).toContain('dorian-1')
    expect(getProgressionsForScale('mixolydian').map(([key]) => key)).toContain('mixolydian-1')
    expect(getProgressionsForScale('lydian').map(([key]) => key)).toContain('lydian-1')
  })
})

describe('getProgressionChordAt', () => {
  it('resolves I–V–vi–IV in C major to C, G, Am, F', () => {
    const chords = [0, 1, 2, 3].map((i) => getProgressionChordAt('C', 'major', i, 'major-1'))
    expect(chords.map((c) => `${c!.root}${c!.quality === 'minor' ? 'm' : ''}`)).toEqual([
      'C', 'G', 'Am', 'F',
    ])
  })

  it('honors the borrowed major V in minor keys', () => {
    // minor-1 is i–iv–V–i: in A minor the third chord is E major, not E minor
    const chord = getProgressionChordAt('A', 'minor', 2, 'minor-1')
    expect(chord).toMatchObject({ root: 'E', quality: 'major' })
  })

  it('keeps the diatonic minor v in minor progressions without borrowing', () => {
    // minor-3 is i–v–VI–VII
    const chord = getProgressionChordAt('A', 'minor', 1, 'minor-3')
    expect(chord).toMatchObject({ root: 'E', quality: 'minor' })
  })

  it('derives modal chord roots from the mode formula', () => {
    // dorian-1 is i–VII–III–IV: in D dorian the second chord is C major
    const seventh = getProgressionChordAt('D', 'dorian', 1, 'dorian-1')
    expect(seventh).toMatchObject({ root: 'C', quality: 'major' })

    // mixolydian-1 is I–VII–IV–I: in C mixolydian the second chord is A# (Bb) major
    const flatSeven = getProgressionChordAt('C', 'mixolydian', 1, 'mixolydian-1')
    expect(flatSeven).toMatchObject({ root: 'A#', quality: 'major' })
  })

  it('uses the mode formula even when a pentatonic scale is selected', () => {
    // minor-3 degree 7 requires the natural-minor formula; A minor VII = G major
    const chord = getProgressionChordAt('A', 'minorPentatonic', 3, 'minor-3')
    expect(chord).toMatchObject({ root: 'G', quality: 'major' })
  })

  it('preserves legacy behavior for untagged progressions', () => {
    expect(getProgressionChordAt('A', 'major', 1, '1-4-5')).toMatchObject({
      root: 'D',
      quality: 'major',
    })
    expect(getProgressionChordAt('A', 'minor', 1, '1-4-5')).toMatchObject({
      root: 'D',
      quality: 'minor',
    })
  })

  it('returns null for unknown progressions', () => {
    expect(getProgressionChordAt('C', 'major', 0, 'nope')).toBeNull()
  })
})

describe('progression name and voicing integration', () => {
  it('names the borrowed V without a minor suffix', () => {
    expect(getProgressionChordName('A', 'minor', 2, 'minor-1')).toBe('E')
    expect(getProgressionChordName('A', 'minor', 1, 'minor-3')).toBe('Em')
  })

  it('picks a curated voicing near the selected position window', () => {
    // Positions 0 and 3 of '1-4-5' both resolve to the tonic chord (index % 3),
    // but position 3 sits an octave up the neck — the voicing should follow
    const low = getProgressionChordVoicing('A', 'minorPentatonic', 0, '1-4-5')
    const high = getProgressionChordVoicing('A', 'minorPentatonic', 3, '1-4-5')
    expect(low).not.toBeNull()
    expect(high).not.toBeNull()
    expect(low!.baseFret).toBeLessThan(high!.baseFret)
  })

  it('produces voicings for every Hooktheory progression across positions and instruments', () => {
    const roots: Note[] = ['C', 'A', 'F#']
    const tunings = [
      TUNINGS.bassStandard,
      TUNINGS.standard,
      TUNINGS.standard7,
      TUNINGS.standard8,
    ]
    Object.entries(CHORD_PROGRESSIONS)
      .filter(([, p]) => p.mode)
      .forEach(([key, progression]) => {
        roots.forEach((root) => {
          tunings.forEach((tuning) => {
            progression.degreesMajor.forEach((_, position) => {
              const voicing = getProgressionChordVoicing(
                root,
                progression.mode!,
                position,
                key,
                tuning
              )
              expect(
                voicing,
                `${key} in ${root} at ${position} on ${tuning.length}-string`
              ).not.toBeNull()
              expect(voicing!.frets).toHaveLength(tuning.length)
            })
          })
        })
      })
  })
})
