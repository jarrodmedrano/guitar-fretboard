// Movable CAGED shape templates for major and minor chords in standard
// tuning, used to fill neck areas the curated dataset misses (e.g. the
// D-shape C major at fret 10). Shapes whose open or moved form duplicates a
// curated voicing are removed downstream by exact-fret and area dedupe, so
// the templates here are purely the movable barre/fragment forms.

import { NOTES, type Note } from './notes'
import type { ChordQuality, ChordVoicing } from './chords'

const MAX_ABSOLUTE_FRET = 24
const SEMITONES_PER_OCTAVE = 12
// Standard-tuning open notes, matching the curated shapes (which are shown
// unchanged on every 6-string tuning)
const STANDARD_OPEN_NOTES: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

interface CagedTemplate {
  rootString: number // string index carrying the root (0 = low E)
  build: (rootFret: number) => {
    frets: (number | 'x')[]
    fingers: (number | null)[]
  }
}

const MAJOR_TEMPLATES: CagedTemplate[] = [
  {
    // E shape — root on the 6th string
    rootString: 0,
    build: (rootFret) => ({
      frets: [rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret, rootFret],
      fingers: [1, 3, 4, 2, 1, 1],
    }),
  },
  {
    // A shape — root on the 5th string
    rootString: 1,
    build: (rootFret) => ({
      frets: ['x', rootFret, rootFret + 2, rootFret + 2, rootFret + 2, rootFret],
      fingers: [null, 1, 3, 3, 3, 1],
    }),
  },
  {
    // D shape — root on the 4th string
    rootString: 2,
    build: (rootFret) => ({
      frets: ['x', 'x', rootFret, rootFret + 2, rootFret + 3, rootFret + 2],
      fingers: [null, null, null, 1, 4, 2],
    }),
  },
  {
    // C shape — root on the 5th string
    rootString: 1,
    build: (rootFret) => ({
      frets: ['x', rootFret, rootFret - 1, rootFret - 3, rootFret - 2, rootFret - 3],
      fingers: [null, 4, 3, 1, 2, 1],
    }),
  },
  {
    // G shape — root on the 6th string
    rootString: 0,
    build: (rootFret) => ({
      frets: [rootFret, rootFret - 1, rootFret - 3, rootFret - 3, rootFret - 3, rootFret],
      fingers: [3, 2, 1, 1, 1, 4],
    }),
  },
]

// Minor CAGED collapses to three distinct forms: the minor C shape equals the
// minor A shape and the minor G shape equals the minor E shape
const MINOR_TEMPLATES: CagedTemplate[] = [
  {
    // Em shape — root on the 6th string
    rootString: 0,
    build: (rootFret) => ({
      frets: [rootFret, rootFret + 2, rootFret + 2, rootFret, rootFret, rootFret],
      fingers: [1, 3, 4, 1, 1, 1],
    }),
  },
  {
    // Am shape — root on the 5th string
    rootString: 1,
    build: (rootFret) => ({
      frets: ['x', rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret],
      fingers: [null, 1, 3, 4, 2, 1],
    }),
  },
  {
    // Dm shape — root on the 4th string
    rootString: 2,
    build: (rootFret) => ({
      frets: ['x', 'x', rootFret, rootFret + 2, rootFret + 3, rootFret + 1],
      fingers: [null, null, null, 2, 4, 1],
    }),
  },
]

function toChordVoicing(shape: {
  frets: (number | 'x')[]
  fingers: (number | null)[]
}): ChordVoicing {
  const fretted = shape.frets.filter(
    (fret): fret is number => fret !== 'x' && fret > 0
  )
  return {
    frets: shape.frets,
    fingers: shape.fingers.map((finger, i) =>
      shape.frets[i] === 'x' || shape.frets[i] === 0 ? null : finger
    ),
    baseFret: fretted.length > 0 ? Math.min(...fretted) : 0,
  }
}

function fretsOnFretboard(frets: (number | 'x')[]): boolean {
  return frets.every(
    (fret) => fret === 'x' || (fret >= 0 && fret <= MAX_ABSOLUTE_FRET)
  )
}

// All movable CAGED voicings for the chord across every reachable octave,
// lowest first. Only major and minor have shape templates.
export function generateCagedVoicings(
  root: Note,
  quality: ChordQuality
): ChordVoicing[] {
  const templates =
    quality === 'major' ? MAJOR_TEMPLATES : quality === 'minor' ? MINOR_TEMPLATES : []

  return templates
    .flatMap((template) => {
      const openNote = STANDARD_OPEN_NOTES[template.rootString]
      const baseRootFret =
        (NOTES.indexOf(root) - NOTES.indexOf(openNote) + SEMITONES_PER_OCTAVE) %
        SEMITONES_PER_OCTAVE

      return [
        baseRootFret,
        baseRootFret + SEMITONES_PER_OCTAVE,
        baseRootFret + 2 * SEMITONES_PER_OCTAVE,
      ].map((rootFret) => template.build(rootFret))
    })
    .filter((shape) => fretsOnFretboard(shape.frets))
    .map(toChordVoicing)
    .sort((a, b) => a.baseFret - b.baseFret)
}
