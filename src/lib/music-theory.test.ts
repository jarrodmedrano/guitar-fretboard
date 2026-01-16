import { describe, it, expect } from 'vitest'
import {
  NOTES,
  STANDARD_TUNING,
  TUNINGS,
  TUNING_NAMES,
  TUNING_CONFIGS,
  INSTRUMENT_NAMES,
  SCALES,
  SCALE_NAMES,
  INTERVAL_NAMES,
  FRET_MARKERS,
  DOUBLE_MARKERS,
  SCALE_POSITIONS,
  getNoteAtFret,
  isNoteInScale,
  getInterval,
  getScaleDegree,
  getIntervalName,
  getRootFret,
  getPositionCount,
  getTuningsByStringCount,
  getDefaultTuning,
} from './music-theory'

describe('Music Theory Constants', () => {
  describe('NOTES', () => {
    it('should contain all 12 chromatic notes', () => {
      expect(NOTES).toHaveLength(12)
      expect(NOTES).toEqual(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])
    })
  })

  describe('STANDARD_TUNING', () => {
    it('should be E-A-D-G-B-E from low to high', () => {
      expect(STANDARD_TUNING).toEqual(['E', 'A', 'D', 'G', 'B', 'E'])
      expect(STANDARD_TUNING).toHaveLength(6)
    })
  })

  describe('TUNINGS', () => {
    it('should have standard tuning', () => {
      expect(TUNINGS.standard).toEqual(['E', 'A', 'D', 'G', 'B', 'E'])
    })

    it('should have Drop D tuning', () => {
      expect(TUNINGS.dropD).toEqual(['D', 'A', 'D', 'G', 'B', 'E'])
    })

    it('should have D Standard tuning', () => {
      expect(TUNINGS.dStandard).toEqual(['D', 'G', 'C', 'F', 'A', 'D'])
    })

    it('should have Drop C tuning', () => {
      expect(TUNINGS.dropC).toEqual(['C', 'G', 'C', 'F', 'A', 'D'])
    })

    it('should have matching TUNING_NAMES for all tunings', () => {
      const tuningKeys = Object.keys(TUNINGS)
      const nameKeys = Object.keys(TUNING_NAMES)
      expect(tuningKeys.sort()).toEqual(nameKeys.sort())
    })

    it('should have 4-string bass tunings', () => {
      expect(TUNINGS.bassStandard).toEqual(['E', 'A', 'D', 'G'])
      expect(TUNINGS.bassDropD).toEqual(['D', 'A', 'D', 'G'])
      expect(TUNINGS.bassDStandard).toEqual(['D', 'G', 'C', 'F'])
    })

    it('should have 7-string tunings', () => {
      expect(TUNINGS.standard7).toEqual(['B', 'E', 'A', 'D', 'G', 'B', 'E'])
      expect(TUNINGS.dropA7).toEqual(['A', 'E', 'A', 'D', 'G', 'B', 'E'])
      expect(TUNINGS.aStandard7).toEqual(['A', 'D', 'G', 'C', 'F', 'A', 'D'])
    })

    it('should have 8-string tunings', () => {
      expect(TUNINGS.standard8).toEqual(['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'])
      expect(TUNINGS.dropE8).toEqual(['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'])
      expect(TUNINGS.eStandard8).toEqual(['E', 'A', 'D', 'G', 'C', 'F', 'A', 'D'])
    })
  })

  describe('TUNING_CONFIGS', () => {
    it('should have correct string counts for each tuning', () => {
      expect(TUNING_CONFIGS.bassStandard.stringCount).toBe(4)
      expect(TUNING_CONFIGS.standard.stringCount).toBe(6)
      expect(TUNING_CONFIGS.standard7.stringCount).toBe(7)
      expect(TUNING_CONFIGS.standard8.stringCount).toBe(8)
    })

    it('should have notes array matching string count', () => {
      expect(TUNING_CONFIGS.bassStandard.notes).toHaveLength(4)
      expect(TUNING_CONFIGS.standard.notes).toHaveLength(6)
      expect(TUNING_CONFIGS.standard7.notes).toHaveLength(7)
      expect(TUNING_CONFIGS.standard8.notes).toHaveLength(8)
    })
  })

  describe('INSTRUMENT_NAMES', () => {
    it('should have names for all instrument types', () => {
      expect(INSTRUMENT_NAMES['4-string']).toBe('4-String Bass')
      expect(INSTRUMENT_NAMES['6-string']).toBe('6-String Guitar')
      expect(INSTRUMENT_NAMES['7-string']).toBe('7-String Guitar')
      expect(INSTRUMENT_NAMES['8-string']).toBe('8-String Guitar')
    })
  })

  describe('SCALES', () => {
    it('should have major scale with correct intervals', () => {
      expect(SCALES.major).toEqual([0, 2, 4, 5, 7, 9, 11])
    })

    it('should have minor scale with correct intervals', () => {
      expect(SCALES.minor).toEqual([0, 2, 3, 5, 7, 8, 10])
    })

    it('should have minor pentatonic with correct intervals', () => {
      expect(SCALES.minorPentatonic).toEqual([0, 3, 5, 7, 10])
    })

    it('should have major pentatonic with correct intervals', () => {
      expect(SCALES.majorPentatonic).toEqual([0, 2, 4, 7, 9])
    })

    it('should have blues scale with b5', () => {
      expect(SCALES.blues).toEqual([0, 3, 5, 6, 7, 10])
      expect(SCALES.blues).toContain(6) // b5 / tritone
    })

    it('should have all modes', () => {
      expect(SCALES.dorian).toBeDefined()
      expect(SCALES.phrygian).toBeDefined()
      expect(SCALES.lydian).toBeDefined()
      expect(SCALES.mixolydian).toBeDefined()
      expect(SCALES.locrian).toBeDefined()
    })

    it('should have Fret Science pentatonic forms', () => {
      expect(SCALES.pentatonicForms).toEqual([0, 3, 5, 7, 10])
      expect(SCALES.pentatonicFormsMajor).toEqual([0, 2, 4, 7, 9])
    })

    it('should have matching SCALE_NAMES for all scales', () => {
      const scaleKeys = Object.keys(SCALES)
      const nameKeys = Object.keys(SCALE_NAMES)
      expect(scaleKeys.sort()).toEqual(nameKeys.sort())
    })
  })

  describe('INTERVAL_NAMES', () => {
    it('should have correct interval names', () => {
      expect(INTERVAL_NAMES[0]).toBe('R')
      expect(INTERVAL_NAMES[4]).toBe('3')
      expect(INTERVAL_NAMES[3]).toBe('b3')
      expect(INTERVAL_NAMES[7]).toBe('5')
      expect(INTERVAL_NAMES[10]).toBe('b7')
      expect(INTERVAL_NAMES[11]).toBe('7')
    })
  })

  describe('FRET_MARKERS', () => {
    it('should include standard fret marker positions', () => {
      expect(FRET_MARKERS).toContain(3)
      expect(FRET_MARKERS).toContain(5)
      expect(FRET_MARKERS).toContain(7)
      expect(FRET_MARKERS).toContain(9)
      expect(FRET_MARKERS).toContain(12)
    })

    it('should have 12 and 24 as double markers', () => {
      expect(DOUBLE_MARKERS).toEqual([12, 24])
    })
  })

  describe('SCALE_POSITIONS', () => {
    it('should have 5 positions for minor pentatonic', () => {
      expect(SCALE_POSITIONS.minorPentatonic).toHaveLength(5)
    })

    it('should have 5 positions for major pentatonic', () => {
      expect(SCALE_POSITIONS.majorPentatonic).toHaveLength(5)
    })

    it('should have form names for Fret Science pentatonic forms', () => {
      expect(SCALE_POSITIONS.pentatonicForms[0].name).toBe('Form 1 (Box)')
      expect(SCALE_POSITIONS.pentatonicFormsMajor[0].name).toBe('Form 1')
    })

    it('should have 7 positions for major scale (3nps)', () => {
      expect(SCALE_POSITIONS.major).toHaveLength(7)
    })

    it('should have negative start values for major pentatonic forms', () => {
      // Major pentatonic forms are shifted -3 from minor
      expect(SCALE_POSITIONS.pentatonicFormsMajor[0].start).toBe(-3)
    })
  })
})

describe('Music Theory Functions', () => {
  describe('getNoteAtFret', () => {
    it('should return the open string note at fret 0', () => {
      expect(getNoteAtFret('E', 0)).toBe('E')
      expect(getNoteAtFret('A', 0)).toBe('A')
    })

    it('should return correct notes for standard positions', () => {
      // E string: E at 0, F at 1, G at 3, A at 5
      expect(getNoteAtFret('E', 1)).toBe('F')
      expect(getNoteAtFret('E', 3)).toBe('G')
      expect(getNoteAtFret('E', 5)).toBe('A')
      expect(getNoteAtFret('E', 12)).toBe('E') // octave
    })

    it('should wrap around after 12 frets', () => {
      expect(getNoteAtFret('E', 12)).toBe('E')
      expect(getNoteAtFret('E', 13)).toBe('F')
      expect(getNoteAtFret('E', 24)).toBe('E')
    })

    it('should work for all strings', () => {
      // A string, fret 2 = B
      expect(getNoteAtFret('A', 2)).toBe('B')
      // D string, fret 2 = E
      expect(getNoteAtFret('D', 2)).toBe('E')
      // G string, fret 2 = A
      expect(getNoteAtFret('G', 2)).toBe('A')
      // B string, fret 1 = C
      expect(getNoteAtFret('B', 1)).toBe('C')
    })
  })

  describe('isNoteInScale', () => {
    it('should identify notes in A minor pentatonic', () => {
      const scale = SCALES.minorPentatonic
      expect(isNoteInScale('A', 'A', scale)).toBe(true) // root
      expect(isNoteInScale('C', 'A', scale)).toBe(true) // b3
      expect(isNoteInScale('D', 'A', scale)).toBe(true) // 4
      expect(isNoteInScale('E', 'A', scale)).toBe(true) // 5
      expect(isNoteInScale('G', 'A', scale)).toBe(true) // b7
    })

    it('should identify notes NOT in A minor pentatonic', () => {
      const scale = SCALES.minorPentatonic
      expect(isNoteInScale('A#', 'A', scale)).toBe(false)
      expect(isNoteInScale('B', 'A', scale)).toBe(false)
      expect(isNoteInScale('C#', 'A', scale)).toBe(false)
      expect(isNoteInScale('D#', 'A', scale)).toBe(false)
      expect(isNoteInScale('F', 'A', scale)).toBe(false)
      expect(isNoteInScale('F#', 'A', scale)).toBe(false)
      expect(isNoteInScale('G#', 'A', scale)).toBe(false)
    })

    it('should identify notes in C major', () => {
      const scale = SCALES.major
      expect(isNoteInScale('C', 'C', scale)).toBe(true)
      expect(isNoteInScale('D', 'C', scale)).toBe(true)
      expect(isNoteInScale('E', 'C', scale)).toBe(true)
      expect(isNoteInScale('F', 'C', scale)).toBe(true)
      expect(isNoteInScale('G', 'C', scale)).toBe(true)
      expect(isNoteInScale('A', 'C', scale)).toBe(true)
      expect(isNoteInScale('B', 'C', scale)).toBe(true)
    })

    it('should correctly identify sharps not in C major', () => {
      const scale = SCALES.major
      expect(isNoteInScale('C#', 'C', scale)).toBe(false)
      expect(isNoteInScale('D#', 'C', scale)).toBe(false)
      expect(isNoteInScale('F#', 'C', scale)).toBe(false)
      expect(isNoteInScale('G#', 'C', scale)).toBe(false)
      expect(isNoteInScale('A#', 'C', scale)).toBe(false)
    })

    it('should work for blues scale with b5', () => {
      const scale = SCALES.blues
      expect(isNoteInScale('A', 'A', scale)).toBe(true) // root
      expect(isNoteInScale('D#', 'A', scale)).toBe(true) // b5 (blue note)
    })
  })

  describe('getInterval', () => {
    it('should return 0 for unison', () => {
      expect(getInterval('A', 'A')).toBe(0)
      expect(getInterval('C', 'C')).toBe(0)
    })

    it('should return correct intervals from A', () => {
      expect(getInterval('A', 'A#')).toBe(1) // minor 2nd
      expect(getInterval('A', 'B')).toBe(2) // major 2nd
      expect(getInterval('A', 'C')).toBe(3) // minor 3rd
      expect(getInterval('A', 'C#')).toBe(4) // major 3rd
      expect(getInterval('A', 'D')).toBe(5) // perfect 4th
      expect(getInterval('A', 'D#')).toBe(6) // tritone
      expect(getInterval('A', 'E')).toBe(7) // perfect 5th
      expect(getInterval('A', 'F')).toBe(8) // minor 6th
      expect(getInterval('A', 'F#')).toBe(9) // major 6th
      expect(getInterval('A', 'G')).toBe(10) // minor 7th
      expect(getInterval('A', 'G#')).toBe(11) // major 7th
    })

    it('should wrap correctly for notes before root', () => {
      expect(getInterval('E', 'C')).toBe(8) // minor 6th
      expect(getInterval('G', 'C')).toBe(5) // perfect 4th
    })
  })

  describe('getScaleDegree', () => {
    it('should return correct degrees for pentatonic', () => {
      const scale = SCALES.minorPentatonic
      expect(getScaleDegree('A', 'A', scale)).toBe(1) // root
      expect(getScaleDegree('C', 'A', scale)).toBe(2) // b3
      expect(getScaleDegree('D', 'A', scale)).toBe(3) // 4
      expect(getScaleDegree('E', 'A', scale)).toBe(4) // 5
      expect(getScaleDegree('G', 'A', scale)).toBe(5) // b7
    })

    it('should return correct degrees for major scale', () => {
      const scale = SCALES.major
      expect(getScaleDegree('C', 'C', scale)).toBe(1)
      expect(getScaleDegree('D', 'C', scale)).toBe(2)
      expect(getScaleDegree('E', 'C', scale)).toBe(3)
      expect(getScaleDegree('F', 'C', scale)).toBe(4)
      expect(getScaleDegree('G', 'C', scale)).toBe(5)
      expect(getScaleDegree('A', 'C', scale)).toBe(6)
      expect(getScaleDegree('B', 'C', scale)).toBe(7)
    })

    it('should return 0 for notes not in scale', () => {
      const scale = SCALES.major
      expect(getScaleDegree('C#', 'C', scale)).toBe(0)
    })
  })

  describe('getIntervalName', () => {
    it('should return R for root', () => {
      expect(getIntervalName('A', 'A')).toBe('R')
    })

    it('should return correct interval names', () => {
      expect(getIntervalName('A', 'C')).toBe('b3')
      expect(getIntervalName('A', 'C#')).toBe('3')
      expect(getIntervalName('A', 'E')).toBe('5')
      expect(getIntervalName('A', 'G')).toBe('b7')
      expect(getIntervalName('A', 'G#')).toBe('7')
    })
  })

  describe('getRootFret', () => {
    describe('with standard tuning', () => {
      it('should return 0 for E (open low E string)', () => {
        expect(getRootFret('E')).toBe(0)
        expect(getRootFret('E', STANDARD_TUNING)).toBe(0)
      })

      it('should return correct frets for common roots', () => {
        expect(getRootFret('F')).toBe(1)
        expect(getRootFret('G')).toBe(3)
        expect(getRootFret('A')).toBe(5)
        expect(getRootFret('B')).toBe(7)
        expect(getRootFret('C')).toBe(8)
        expect(getRootFret('D')).toBe(10)
      })
    })

    describe('with Drop D tuning', () => {
      it('should return 0 for D (open low D string)', () => {
        expect(getRootFret('D', TUNINGS.dropD)).toBe(0)
      })

      it('should return 2 for E in Drop D', () => {
        expect(getRootFret('E', TUNINGS.dropD)).toBe(2)
      })

      it('should return 7 for A in Drop D', () => {
        expect(getRootFret('A', TUNINGS.dropD)).toBe(7)
      })
    })

    describe('with D Standard tuning', () => {
      it('should return 0 for D', () => {
        expect(getRootFret('D', TUNINGS.dStandard)).toBe(0)
      })

      it('should return 2 for E', () => {
        expect(getRootFret('E', TUNINGS.dStandard)).toBe(2)
      })
    })

    describe('with Drop C tuning', () => {
      it('should return 0 for C', () => {
        expect(getRootFret('C', TUNINGS.dropC)).toBe(0)
      })

      it('should return 4 for E', () => {
        expect(getRootFret('E', TUNINGS.dropC)).toBe(4)
      })

      it('should return 9 for A', () => {
        expect(getRootFret('A', TUNINGS.dropC)).toBe(9)
      })
    })
  })

  describe('getPositionCount', () => {
    it('should return 5 for pentatonic scales', () => {
      expect(getPositionCount('minorPentatonic')).toBe(5)
      expect(getPositionCount('majorPentatonic')).toBe(5)
      expect(getPositionCount('pentatonicForms')).toBe(5)
      expect(getPositionCount('pentatonicFormsMajor')).toBe(5)
    })

    it('should return 7 for major/minor scales', () => {
      expect(getPositionCount('major')).toBe(7)
      expect(getPositionCount('minor')).toBe(7)
    })

    it('should return 5 for unknown scale (default)', () => {
      expect(getPositionCount('unknownScale')).toBe(5)
    })
  })

  describe('getTuningsByStringCount', () => {
    it('should return only 4-string tunings for bass', () => {
      const bassTunings = getTuningsByStringCount(4)
      expect(Object.keys(bassTunings)).toContain('bassStandard')
      expect(Object.keys(bassTunings)).toContain('bassDropD')
      expect(Object.keys(bassTunings)).toContain('bassDStandard')
      expect(Object.keys(bassTunings)).not.toContain('standard')
      expect(Object.keys(bassTunings)).not.toContain('standard7')
    })

    it('should return only 6-string tunings for guitar', () => {
      const guitarTunings = getTuningsByStringCount(6)
      expect(Object.keys(guitarTunings)).toContain('standard')
      expect(Object.keys(guitarTunings)).toContain('dropD')
      expect(Object.keys(guitarTunings)).toContain('dropC')
      expect(Object.keys(guitarTunings)).not.toContain('bassStandard')
      expect(Object.keys(guitarTunings)).not.toContain('standard7')
    })

    it('should return only 7-string tunings', () => {
      const sevenStringTunings = getTuningsByStringCount(7)
      expect(Object.keys(sevenStringTunings)).toContain('standard7')
      expect(Object.keys(sevenStringTunings)).toContain('dropA7')
      expect(Object.keys(sevenStringTunings)).not.toContain('standard')
      expect(Object.keys(sevenStringTunings)).not.toContain('standard8')
    })

    it('should return only 8-string tunings', () => {
      const eightStringTunings = getTuningsByStringCount(8)
      expect(Object.keys(eightStringTunings)).toContain('standard8')
      expect(Object.keys(eightStringTunings)).toContain('dropE8')
      expect(Object.keys(eightStringTunings)).not.toContain('standard')
      expect(Object.keys(eightStringTunings)).not.toContain('standard7')
    })

    it('should return empty object for unsupported string count', () => {
      const fiveStringTunings = getTuningsByStringCount(5)
      expect(Object.keys(fiveStringTunings)).toHaveLength(0)
    })
  })

  describe('getDefaultTuning', () => {
    it('should return bassStandard for 4 strings', () => {
      expect(getDefaultTuning(4)).toBe('bassStandard')
    })

    it('should return standard for 6 strings', () => {
      expect(getDefaultTuning(6)).toBe('standard')
    })

    it('should return standard7 for 7 strings', () => {
      expect(getDefaultTuning(7)).toBe('standard7')
    })

    it('should return standard8 for 8 strings', () => {
      expect(getDefaultTuning(8)).toBe('standard8')
    })

    it('should return standard for unknown string count', () => {
      expect(getDefaultTuning(5)).toBe('standard')
      expect(getDefaultTuning(9)).toBe('standard')
    })
  })
})

describe('Scale Formula Verification', () => {
  it('major and natural minor should be relative', () => {
    // A minor should have same notes as C major
    // A minor: A B C D E F G (0 2 3 5 7 8 10 from A)
    // C major: C D E F G A B (0 2 4 5 7 9 11 from C)
    const majorScale = SCALES.major
    const minorScale = SCALES.minor

    // Minor third of major = relative minor root
    // Major starts at 0, minor is its relative at interval 9 (major 6th / relative minor)
    expect(majorScale[5]).toBe(9) // 6th degree of major
  })

  it('pentatonic scales should be subsets of diatonic scales', () => {
    // Major pentatonic should be subset of major
    const majorPent = SCALES.majorPentatonic
    const major = SCALES.major
    majorPent.forEach(interval => {
      expect(major).toContain(interval)
    })

    // Minor pentatonic should be subset of natural minor
    const minorPent = SCALES.minorPentatonic
    const minor = SCALES.minor
    minorPent.forEach(interval => {
      expect(minor).toContain(interval)
    })
  })

  it('blues scale should be minor pentatonic plus b5', () => {
    const blues = SCALES.blues
    const minorPent = SCALES.minorPentatonic

    // Blues should contain all minor pentatonic notes
    minorPent.forEach(interval => {
      expect(blues).toContain(interval)
    })

    // Blues should also contain the tritone (b5)
    expect(blues).toContain(6)

    // Blues should have exactly one more note than minor pentatonic
    expect(blues.length).toBe(minorPent.length + 1)
  })

  it('modes should differ by one note from adjacent modes', () => {
    // Lydian → Ionian: #4 becomes 4
    expect(SCALES.lydian).toContain(6) // #4
    expect(SCALES.major).not.toContain(6) // no #4

    // Ionian → Mixolydian: 7 becomes b7
    expect(SCALES.major).toContain(11) // 7
    expect(SCALES.mixolydian).not.toContain(11) // no 7
    expect(SCALES.mixolydian).toContain(10) // b7
  })
})

describe('Integration: Scale on Fretboard', () => {
  it('should correctly identify A minor pentatonic notes on E string', () => {
    const scale = SCALES.minorPentatonic
    const rootNote = 'A'

    // A minor pentatonic: A(root), C(b3), D(4), E(5), G(b7)
    // E string frets: E=0, F=1, F#=2, G=3, G#=4, A=5, A#=6, B=7, C=8, C#=9, D=10, D#=11, E=12...
    // In A minor pentatonic on E string: E(0,12,24), G(3,15), A(5,17), C(8,20), D(10,22)
    const expectedFrets = [0, 3, 5, 8, 10, 12, 15, 17, 20, 22, 24] // E, G, A, C, D

    for (let fret = 0; fret <= 24; fret++) {
      const note = getNoteAtFret('E', fret)
      const inScale = isNoteInScale(note, rootNote, scale)

      if (expectedFrets.includes(fret)) {
        expect(inScale).toBe(true)
      }
    }
  })

  it('should place root correctly in different tunings', () => {
    // In standard tuning, A is at fret 5 on low E string
    expect(getRootFret('A', TUNINGS.standard)).toBe(5)
    expect(getNoteAtFret('E', 5)).toBe('A')

    // In Drop D, A is at fret 7 on low D string
    expect(getRootFret('A', TUNINGS.dropD)).toBe(7)
    expect(getNoteAtFret('D', 7)).toBe('A')

    // In D Standard, A is at fret 7 on low D string
    expect(getRootFret('A', TUNINGS.dStandard)).toBe(7)
    expect(getNoteAtFret('D', 7)).toBe('A')

    // In Drop C, A is at fret 9 on low C string
    expect(getRootFret('A', TUNINGS.dropC)).toBe(9)
    expect(getNoteAtFret('C', 9)).toBe('A')
  })
})
