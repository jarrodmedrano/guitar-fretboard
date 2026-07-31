import {
  CHORD_SUFFIXES,
  getChordVoicingCount,
  type ChordQuality,
  type ChordVoicing,
} from './chords'

export { NOTES } from './notes'
export type { Note } from './notes'
import { NOTES, type Note } from './notes'

export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'] // low to high (6th to 1st string)

// Instrument configurations
export type InstrumentType = '4-string' | '6-string' | '7-string' | '8-string'

export const INSTRUMENT_NAMES: Record<InstrumentType, string> = {
  '4-string': '4-String Bass',
  '6-string': '6-String Guitar',
  '7-string': '7-String Guitar',
  '8-string': '8-String Guitar',
}

// All tunings with metadata
export interface TuningConfig {
  notes: Note[]
  name: string
  stringCount: number
}

export const TUNING_CONFIGS: Record<string, TuningConfig> = {
  // 4-string bass tunings
  bassStandard: { notes: ['E', 'A', 'D', 'G'], name: 'Bass Standard (E-A-D-G)', stringCount: 4 },
  bassDropD: { notes: ['D', 'A', 'D', 'G'], name: 'Bass Drop D (D-A-D-G)', stringCount: 4 },
  bassDStandard: { notes: ['D', 'G', 'C', 'F'], name: 'Bass D Standard (D-G-C-F)', stringCount: 4 },

  // 6-string guitar tunings
  standard: { notes: ['E', 'A', 'D', 'G', 'B', 'E'], name: 'Standard (E-A-D-G-B-E)', stringCount: 6 },
  dropD: { notes: ['D', 'A', 'D', 'G', 'B', 'E'], name: 'Drop D (D-A-D-G-B-E)', stringCount: 6 },
  dStandard: { notes: ['D', 'G', 'C', 'F', 'A', 'D'], name: 'D Standard (D-G-C-F-A-D)', stringCount: 6 },
  dropC: { notes: ['C', 'G', 'C', 'F', 'A', 'D'], name: 'Drop C (C-G-C-F-A-D)', stringCount: 6 },
  openG: { notes: ['D', 'G', 'D', 'G', 'B', 'D'], name: 'Open G (D-G-D-G-B-D)', stringCount: 6 },
  openD: { notes: ['D', 'A', 'D', 'F#', 'A', 'D'], name: 'Open D (D-A-D-F#-A-D)', stringCount: 6 },

  // 7-string guitar tunings
  standard7: { notes: ['B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '7-String Standard (B-E-A-D-G-B-E)', stringCount: 7 },
  dropA7: { notes: ['A', 'E', 'A', 'D', 'G', 'B', 'E'], name: '7-String Drop A (A-E-A-D-G-B-E)', stringCount: 7 },
  aStandard7: { notes: ['A', 'D', 'G', 'C', 'F', 'A', 'D'], name: '7-String A Standard (A-D-G-C-F-A-D)', stringCount: 7 },

  // 8-string guitar tunings
  standard8: { notes: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '8-String Standard (F#-B-E-A-D-G-B-E)', stringCount: 8 },
  dropE8: { notes: ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '8-String Drop E (E-B-E-A-D-G-B-E)', stringCount: 8 },
  eStandard8: { notes: ['E', 'A', 'D', 'G', 'C', 'F', 'A', 'D'], name: '8-String E Standard (E-A-D-G-C-F-A-D)', stringCount: 8 },
}

// Helper to get tunings by string count
export function getTuningsByStringCount(stringCount: number): Record<string, TuningConfig> {
  return Object.fromEntries(
    Object.entries(TUNING_CONFIGS).filter(([, config]) => config.stringCount === stringCount)
  )
}

// Helper to get default tuning for a string count
export function getDefaultTuning(stringCount: number): string {
  const defaults: Record<number, string> = {
    4: 'bassStandard',
    6: 'standard',
    7: 'standard7',
    8: 'standard8',
  }
  return defaults[stringCount] || 'standard'
}

// Legacy exports for backwards compatibility
export const TUNINGS: Record<string, Note[]> = Object.fromEntries(
  Object.entries(TUNING_CONFIGS).map(([key, config]) => [key, config.notes])
)

export const TUNING_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(TUNING_CONFIGS).map(([key, config]) => [key, config.name])
)

export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  // Fret Science Pentatonic Forms - same notes as minor pentatonic
  // but with Rectangle & Stack geometric approach
  pentatonicForms: [0, 3, 5, 7, 10],
  // Fret Science Major Pentatonic Forms - Rectangle & Stack for major context
  // Intervals: 1, 2, 3, 5, 6
  pentatonicFormsMajor: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
}

export const SCALE_NAMES: Record<string, string> = {
  major: 'Major',
  minor: 'Natural Minor',
  majorPentatonic: 'Major Pentatonic',
  minorPentatonic: 'Minor Pentatonic',
  pentatonicForms: 'Minor Pentatonic Forms (Fret Science)',
  pentatonicFormsMajor: 'Major Pentatonic Forms (Fret Science)',
  blues: 'Blues',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',
  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',
}

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7',
}

export const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
export const DOUBLE_MARKERS = [12, 24]

// Scale positions (fret offsets from root note)
// Each position covers a 4-5 fret span
export const SCALE_POSITIONS: Record<string, { start: number; end: number; name?: string }[]> = {
  // Pentatonic 5 box patterns (minor pentatonic positions)
  minorPentatonic: [
    { start: 0, end: 3 },   // Position 1 (root position)
    { start: 3, end: 6 },   // Position 2
    { start: 5, end: 8 },   // Position 3
    { start: 7, end: 10 },  // Position 4
    { start: 10, end: 13 }, // Position 5 (leads back to position 1)
  ],
  majorPentatonic: [
    { start: 0, end: 4 },   // Position 1
    { start: 2, end: 5 },   // Position 2
    { start: 4, end: 7 },   // Position 3
    { start: 7, end: 10 },  // Position 4
    { start: 9, end: 12 },  // Position 5
  ],
  // Fret Science Minor Pentatonic Forms - based on Keith Martin's system
  // Uses Rectangle & Stack geometric shapes
  // Form order: 1 → 4 → 2 → 5 → 3 → 1 (for horizontal navigation)
  // Minor context: Rectangle = 1,b3,5,b7 | Stack = b3,4,b7,1,4,5
  pentatonicForms: [
    { start: 0, end: 3, name: 'Form 1 (Box)' },     // Root on 6th string - most common blues/rock
    { start: 2, end: 5, name: 'Form 2' },           // Connects via shared notes on strings 1-2
    { start: 4, end: 8, name: 'Form 3' },           // Middle position
    { start: 7, end: 10, name: 'Form 4' },          // Root on strings 5 and 2
    { start: 9, end: 12, name: 'Form 5' },          // Leads back to Form 1 one octave higher
  ],
  // Fret Science Major Pentatonic Forms - same physical shapes as minor
  // Major context: Rectangle = 6,1,3,5 | Stack = 1,2,5,6,2,3
  // The major root is 3 semitones ABOVE the relative minor root in the same shape
  // So all positions are shifted -3 from minor pentatonic forms
  // Example: C major Form 1 spans frets 5-8 (same as A minor), but C root is at fret 8
  pentatonicFormsMajor: [
    { start: -3, end: 0, name: 'Form 1' },          // Root at high end of box (frets 5-8 for C)
    { start: -1, end: 2, name: 'Form 2' },          // Frets 7-10 for C
    { start: 1, end: 5, name: 'Form 3' },           // Frets 9-13 for C
    { start: 4, end: 7, name: 'Form 4' },           // Frets 12-15 for C
    { start: 6, end: 9, name: 'Form 5' },           // Frets 14-17 for C
  ],
  blues: [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 5, end: 8 },
    { start: 7, end: 10 },
    { start: 10, end: 13 },
  ],
  // 7-note scales use 7 positions (3-notes-per-string approach)
  major: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
  minor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  dorian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 10, end: 14 },
  ],
  phrygian: [
    { start: 0, end: 4 },
    { start: 1, end: 5 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  lydian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 6, end: 10 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
  mixolydian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 10, end: 14 },
  ],
  locrian: [
    { start: 0, end: 4 },
    { start: 1, end: 5 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 6, end: 10 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  harmonicMinor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 11, end: 15 },
  ],
  melodicMinor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
}

// Get the fret where the root note first appears on the lowest string
export function getRootFret(rootNote: Note, tuning: Note[] = STANDARD_TUNING): number {
  const lowestString = tuning[0]
  const openNoteIndex = NOTES.indexOf(lowestString)
  const rootIndex = NOTES.indexOf(rootNote)
  return (rootIndex - openNoteIndex + 12) % 12
}

// Get position count for a scale
export function getPositionCount(scale: string): number {
  return SCALE_POSITIONS[scale]?.length || 5
}

export function getNoteAtFret(openNote: Note, fret: number): Note {
  const startIndex = NOTES.indexOf(openNote)
  return NOTES[(startIndex + fret) % 12]
}

export function isNoteInScale(note: Note, rootNote: Note, scaleFormula: number[]): boolean {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  const interval = (noteIndex - rootIndex + 12) % 12
  return scaleFormula.includes(interval)
}

export function getInterval(rootNote: Note, note: Note): number {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  return (noteIndex - rootIndex + 12) % 12
}

export function getScaleDegree(note: Note, rootNote: Note, scaleFormula: number[]): number {
  const interval = getInterval(rootNote, note)
  return scaleFormula.indexOf(interval) + 1
}

export function getIntervalName(rootNote: Note, note: Note): string {
  const interval = getInterval(rootNote, note)
  return INTERVAL_NAMES[interval] || ''
}

// Chord Voicing Support
// Voicings come from a curated dataset in the Uberchord API wire format
// (src/lib/chord-shapes.ts) via the adapter in src/lib/chords.ts. Re-exported
// here so consumers keep importing from '@/lib/music-theory'.
export {
  CHORD_SUFFIXES,
  getChordVoicingCount,
  getChordVoicings,
  isMinorQuality,
  parseUberchordVoicing,
} from './chords'
export type { ChordQuality, ChordVoicing } from './chords'
export { getChordVoicingCountForTuning, getChordVoicingsForTuning } from './chord-voicings'
import { getChordVoicingCountForTuning, getChordVoicingsForTuning } from './chord-voicings'

// Chord tone intervals for major and minor chords
export const MAJOR_CHORD_INTERVALS = [0, 4, 7]  // R, 3, 5
export const MINOR_CHORD_INTERVALS = [0, 3, 7]  // R, b3, 5

// Determine if a scale is major or minor quality based on its third
export function getChordQuality(scale: string): 'major' | 'minor' {
  const formula = SCALES[scale]
  // Check if the scale has a minor 3rd (interval 3) or major 3rd (interval 4)
  if (formula.includes(3)) return 'minor'
  if (formula.includes(4)) return 'major'
  // Default to major for ambiguous scales
  return 'major'
}

// Get chord intervals based on scale quality
export function getChordIntervals(scale: string): number[] {
  return getChordQuality(scale) === 'minor'
    ? MINOR_CHORD_INTERVALS
    : MAJOR_CHORD_INTERVALS
}

// Get the chord name for the current voicing
export function getChordNameForPosition(
  rootNote: Note,
  scale: string,
  position: number,
  tuning: Note[] = STANDARD_TUNING,
  chordQuality?: ChordQuality
): string {
  const quality = chordQuality ?? getChordQuality(scale)
  const suffix = CHORD_SUFFIXES[quality]
  const count = getChordVoicingCountForTuning(rootNote, quality, tuning)
  if (count === 0) return `${rootNote}${suffix}`

  const voicingIndex = Math.min(position, count - 1)
  return `${rootNote}${suffix} · voicing ${voicingIndex + 1}/${count}`
}

// Get the chord voicing at a voicing index for the instrument's tuning
// (position = voicing 1..N)
export function getChordVoicing(
  rootNote: Note,
  scale: string,
  position: number,
  tuning: Note[] = STANDARD_TUNING,
  chordQuality?: ChordQuality
): ChordVoicing | null {
  const quality = chordQuality ?? getChordQuality(scale)
  const voicings = getChordVoicingsForTuning(rootNote, quality, tuning)
  return voicings[position] ?? null
}

// Get every voicing for the chord on this instrument (for "All" voicings mode)
export function getAllChordVoicings(
  rootNote: Note,
  scale: string,
  tuning: Note[] = STANDARD_TUNING,
  chordQuality?: ChordQuality
): ChordVoicing[] {
  const quality = chordQuality ?? getChordQuality(scale)
  return getChordVoicingsForTuning(rootNote, quality, tuning)
}

// Chord Progression Support
export interface ChordProgression {
  name: string
  degreesMajor: number[]  // Scale degrees for major keys (1-based)
  degreesMinor: number[]  // Scale degrees for minor keys (1-based)
  description: string
  // Mode-specific progressions (from Hooktheory's key cheat sheets):
  // `mode` is the SCALES key whose formula defines the chord roots, and
  // `qualities` gives each chord's quality explicitly (covers borrowed chords
  // like the major V in minor keys, and 7th chords). Progressions without
  // these fields use the generic major/minor degree tables.
  mode?: string
  qualities?: ChordQuality[]
}

export const CHORD_PROGRESSIONS: Record<string, ChordProgression> = {
  '1-4-5': {
    name: 'I-IV-V',
    degreesMajor: [1, 4, 5],
    degreesMinor: [1, 4, 5],
    description: 'Classic rock and blues progression'
  },
  '1-5-6-4': {
    name: 'I-V-vi-IV',
    degreesMajor: [1, 5, 6, 4],
    degreesMinor: [1, 5, 6, 4],
    description: 'Popular pop progression'
  },
  '6-4-1-5': {
    name: 'vi-IV-I-V',
    degreesMajor: [6, 4, 1, 5],
    degreesMinor: [6, 4, 1, 5],
    description: 'Emotional/sad progression'
  },
  '2-5-1': {
    name: 'ii-V-I',
    degreesMajor: [2, 5, 1],
    degreesMinor: [2, 5, 1],
    description: 'Jazz turnaround'
  },
  '1-6-4-5': {
    name: 'I-vi-IV-V',
    degreesMajor: [1, 6, 4, 5],
    degreesMinor: [1, 6, 4, 5],
    description: '50s doo-wop progression'
  },
  '1-4-1-5': {
    name: 'I-IV-I-V',
    degreesMajor: [1, 4, 1, 5],
    degreesMinor: [1, 4, 1, 5],
    description: 'Simple blues progression'
  },

  // Popular chord progressions per key, from Hooktheory's key cheat sheets
  // (hooktheory.com/cheat-sheet). Raw data: docs/data/hooktheory-cheat-sheet.json.
  // Superscript ⁶ marks a first-inversion chord and ⁷ a seventh chord in the
  // source; both are approximated as root-position triads here.
  'major-1': {
    name: 'I–V–vi–IV',
    degreesMajor: [1, 5, 6, 4],
    degreesMinor: [1, 5, 6, 4],
    description: 'The four-chord pop progression',
    mode: 'major',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'major-2': {
    name: 'I–vi–IV–V',
    degreesMajor: [1, 6, 4, 5],
    degreesMinor: [1, 6, 4, 5],
    description: '50s doo-wop progression',
    mode: 'major',
    qualities: ['major', 'minor', 'major', 'major'],
  },
  'major-3': {
    name: 'I–IV–ii–V',
    degreesMajor: [1, 4, 2, 5],
    degreesMinor: [1, 4, 2, 5],
    description: 'Turnaround with a pre-dominant ii',
    mode: 'major',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'major-4': {
    name: 'I–iii–vi–V',
    degreesMajor: [1, 3, 6, 5],
    degreesMinor: [1, 3, 6, 5],
    description: 'Minor-color pop progression',
    mode: 'major',
    qualities: ['major', 'minor', 'minor', 'major'],
  },
  'major-5': {
    name: 'I–V⁶–IV–V',
    degreesMajor: [1, 5, 4, 5],
    degreesMinor: [1, 5, 4, 5],
    description: 'Walking bass into IV–V',
    mode: 'major',
    qualities: ['major', 'major', 'major', 'major'],
  },
  'major-6': {
    name: 'I–V⁶–vi–IV',
    degreesMajor: [1, 5, 6, 4],
    degreesMinor: [1, 5, 6, 4],
    description: 'Pop progression with walking bass',
    mode: 'major',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'major-7': {
    name: 'I–I⁶–IV–V',
    degreesMajor: [1, 1, 4, 5],
    degreesMinor: [1, 1, 4, 5],
    description: 'Tonic walk-up into IV–V',
    mode: 'major',
    qualities: ['major', 'major', 'major', 'major'],
  },
  'major-8': {
    name: 'I–I⁶–vi⁷–V',
    degreesMajor: [1, 1, 6, 5],
    degreesMinor: [1, 1, 6, 5],
    description: 'Tonic walk-up with vi seventh',
    mode: 'major',
    qualities: ['major', 'major', 'm7', 'major'],
  },
  'minor-1': {
    name: 'i–iv–V–i',
    degreesMajor: [1, 4, 5, 1],
    degreesMinor: [1, 4, 5, 1],
    description: 'Minor cadence with major V',
    mode: 'minor',
    qualities: ['minor', 'minor', 'major', 'minor'],
  },
  'minor-2': {
    name: 'i–VII–VI–V',
    degreesMajor: [1, 7, 6, 5],
    degreesMinor: [1, 7, 6, 5],
    description: 'Andalusian-style descent to major V',
    mode: 'minor',
    qualities: ['minor', 'major', 'major', 'major'],
  },
  'minor-3': {
    name: 'i–v–VI–VII',
    degreesMajor: [1, 5, 6, 7],
    degreesMinor: [1, 5, 6, 7],
    description: 'Natural minor rock progression',
    mode: 'minor',
    qualities: ['minor', 'minor', 'major', 'major'],
  },
  'minor-4': {
    name: 'i–III–VII–iv',
    degreesMajor: [1, 3, 7, 4],
    degreesMinor: [1, 3, 7, 4],
    description: 'Epic minor progression',
    mode: 'minor',
    qualities: ['minor', 'major', 'major', 'minor'],
  },
  'minor-5': {
    name: 'i–v⁶–VI–VII',
    degreesMajor: [1, 5, 6, 7],
    degreesMinor: [1, 5, 6, 7],
    description: 'Minor walk-down variant',
    mode: 'minor',
    qualities: ['minor', 'minor', 'major', 'major'],
  },
  'minor-6': {
    name: 'i–iv–ii⁷–V',
    degreesMajor: [1, 4, 2, 5],
    degreesMinor: [1, 4, 2, 5],
    description: 'Minor ii–V turnaround with major V',
    mode: 'minor',
    qualities: ['minor', 'minor', 'm7b5', 'major'],
  },
  'dorian-1': {
    name: 'i–VII–III–IV',
    degreesMajor: [1, 7, 3, 4],
    degreesMinor: [1, 7, 3, 4],
    description: 'Modal rock loop',
    mode: 'dorian',
    qualities: ['minor', 'major', 'major', 'major'],
  },
  'dorian-2': {
    name: 'i–III–IV–IV',
    degreesMajor: [1, 3, 4, 4],
    degreesMinor: [1, 3, 4, 4],
    description: 'Dorian vamp on the major IV',
    mode: 'dorian',
    qualities: ['minor', 'major', 'major', 'major'],
  },
  'dorian-3': {
    name: 'i–ii–III–ii',
    degreesMajor: [1, 2, 3, 2],
    degreesMinor: [1, 2, 3, 2],
    description: 'Stepwise dorian motion',
    mode: 'dorian',
    qualities: ['minor', 'minor', 'major', 'minor'],
  },
  'dorian-4': {
    name: 'i–v–IV–i',
    degreesMajor: [1, 5, 4, 1],
    degreesMinor: [1, 5, 4, 1],
    description: 'Dorian minor loop',
    mode: 'dorian',
    qualities: ['minor', 'minor', 'major', 'minor'],
  },
  'dorian-5': {
    name: 'i–VII–vi–IV',
    degreesMajor: [1, 7, 6, 4],
    degreesMinor: [1, 7, 6, 4],
    description: 'Dorian descent with borrowed vi',
    mode: 'dorian',
    qualities: ['minor', 'major', 'minor', 'major'],
  },
  'dorian-6': {
    name: 'i–III–IV–vi',
    degreesMajor: [1, 3, 4, 6],
    degreesMinor: [1, 3, 4, 6],
    description: 'Dorian rise with borrowed vi',
    mode: 'dorian',
    qualities: ['minor', 'major', 'major', 'minor'],
  },
  'mixolydian-1': {
    name: 'I–VII–IV–I',
    degreesMajor: [1, 7, 4, 1],
    degreesMinor: [1, 7, 4, 1],
    description: 'Classic rock flat-seven loop',
    mode: 'mixolydian',
    qualities: ['major', 'major', 'major', 'major'],
  },
  'mixolydian-2': {
    name: 'I–v–IV–I',
    degreesMajor: [1, 5, 4, 1],
    degreesMinor: [1, 5, 4, 1],
    description: 'Mixolydian loop with minor v',
    mode: 'mixolydian',
    qualities: ['major', 'minor', 'major', 'major'],
  },
  'mixolydian-3': {
    name: 'I–VII–ii–I',
    degreesMajor: [1, 7, 2, 1],
    degreesMinor: [1, 7, 2, 1],
    description: 'Mixolydian turnaround through ii',
    mode: 'mixolydian',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'mixolydian-4': {
    name: 'I–ii–v–I',
    degreesMajor: [1, 2, 5, 1],
    degreesMinor: [1, 2, 5, 1],
    description: 'Soft mixolydian cadence',
    mode: 'mixolydian',
    qualities: ['major', 'minor', 'minor', 'major'],
  },
  'lydian-1': {
    name: 'I–I–II–V',
    degreesMajor: [1, 1, 2, 5],
    degreesMinor: [1, 1, 2, 5],
    description: 'Lydian lift through the major II',
    mode: 'lydian',
    qualities: ['major', 'major', 'major', 'major'],
  },
  'lydian-2': {
    name: 'I–II–iii–II',
    degreesMajor: [1, 2, 3, 2],
    degreesMinor: [1, 2, 3, 2],
    description: 'Floating lydian motion',
    mode: 'lydian',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'lydian-3': {
    name: 'I–II–vii–iii',
    degreesMajor: [1, 2, 7, 3],
    degreesMinor: [1, 2, 7, 3],
    description: 'Lydian colors beyond the II',
    mode: 'lydian',
    qualities: ['major', 'major', 'minor', 'minor'],
  },
  'lydian-4': {
    name: 'I–V–iii–II',
    degreesMajor: [1, 5, 3, 2],
    degreesMinor: [1, 5, 3, 2],
    description: 'Lydian descent to the major II',
    mode: 'lydian',
    qualities: ['major', 'major', 'minor', 'major'],
  },
  'lydian-5': {
    name: 'I–iii–II⁶–V',
    degreesMajor: [1, 3, 2, 5],
    degreesMinor: [1, 3, 2, 5],
    description: 'Lydian turnaround',
    mode: 'lydian',
    qualities: ['major', 'minor', 'major', 'major'],
  },
  'phrygian-1': {
    name: 'i–II–i–vii',
    degreesMajor: [1, 2, 1, 7],
    degreesMinor: [1, 2, 1, 7],
    description: 'Phrygian flat-two oscillation',
    mode: 'phrygian',
    qualities: ['minor', 'major', 'minor', 'minor'],
  },
  'phrygian-2': {
    name: 'i–II–III–II',
    degreesMajor: [1, 2, 3, 2],
    degreesMinor: [1, 2, 3, 2],
    description: 'Rising phrygian steps',
    mode: 'phrygian',
    qualities: ['minor', 'major', 'major', 'major'],
  },
  'phrygian-3': {
    name: 'i–III–vii–II',
    degreesMajor: [1, 3, 7, 2],
    degreesMinor: [1, 3, 7, 2],
    description: 'Phrygian loop through the flat two',
    mode: 'phrygian',
    qualities: ['minor', 'major', 'minor', 'major'],
  },
  'phrygian-4': {
    name: 'i–iv–III–II',
    degreesMajor: [1, 4, 3, 2],
    degreesMinor: [1, 4, 3, 2],
    description: 'Phrygian descent',
    mode: 'phrygian',
    qualities: ['minor', 'minor', 'major', 'major'],
  },
  'locrian-1': {
    name: 'i–II–iii–II',
    degreesMajor: [1, 2, 3, 2],
    degreesMinor: [1, 2, 3, 2],
    description: 'Locrian oscillation',
    mode: 'locrian',
    qualities: ['minor', 'major', 'minor', 'major'],
  },
  'locrian-2': {
    name: 'i–II–iii–iv',
    degreesMajor: [1, 2, 3, 4],
    degreesMinor: [1, 2, 3, 4],
    description: 'Rising locrian steps',
    mode: 'locrian',
    qualities: ['minor', 'major', 'minor', 'minor'],
  },
}

// Song keys ranked by popularity, from Hooktheory's TheoryTab database
// (hooktheory.com/cheat-sheet/key-popularity). Popularity is the percentage of
// songs within each mode; keys are listed per mode in descending popularity.
// Raw data: docs/data/hooktheory-cheat-sheet.json.
export interface MusicalKey {
  root: Note
  scale: string // key into SCALES
  name: string
  popularity: number
}

function buildKeys(scale: string, scaleName: string, entries: [Note, number][]): MusicalKey[] {
  return entries.map(([root, popularity]) => ({
    root,
    scale,
    name: `${root} ${scaleName}`,
    popularity,
  }))
}

export const KEY_POPULARITY: MusicalKey[] = [
  ...buildKeys('major', 'Major', [
    ['C', 15], ['D', 12], ['G', 12], ['A', 10], ['E', 9], ['F', 8],
    ['D#', 7], ['A#', 6], ['C#', 5], ['B', 5], ['F#', 5], ['G#', 5],
  ]),
  ...buildKeys('minor', 'Minor', [
    ['A', 13], ['E', 12], ['C', 12], ['D', 11], ['B', 9], ['G', 8],
    ['F#', 7], ['C#', 7], ['F', 7], ['D#', 6], ['A#', 6], ['G#', 5],
  ]),
  ...buildKeys('mixolydian', 'Mixolydian', [
    ['A', 13], ['G', 13], ['E', 13], ['D', 13], ['C', 11], ['B', 7],
    ['F', 6], ['A#', 6], ['G#', 5], ['D#', 5], ['C#', 4], ['F#', 4],
  ]),
  ...buildKeys('dorian', 'Dorian', [
    ['D', 15], ['A', 13], ['E', 12], ['C', 10], ['G', 9], ['F', 8],
    ['B', 8], ['F#', 6], ['D#', 6], ['C#', 5], ['G#', 5], ['A#', 4],
  ]),
  ...buildKeys('lydian', 'Lydian', [
    ['C', 16], ['F', 15], ['A', 11], ['D', 10], ['G', 8], ['G#', 7],
    ['E', 7], ['C#', 6], ['D#', 6], ['A#', 6], ['B', 4], ['F#', 4],
  ]),
  ...buildKeys('phrygian', 'Phrygian', [
    ['E', 17], ['C', 12], ['D', 10], ['D#', 9], ['G', 9], ['F', 9],
    ['A', 8], ['C#', 7], ['B', 6], ['F#', 6], ['A#', 5], ['G#', 4],
  ]),
  ...buildKeys('locrian', 'Locrian', [
    ['B', 15], ['D', 14], ['D#', 12], ['C', 12], ['E', 9], ['A', 9],
    ['F#', 8], ['C#', 8], ['G', 6], ['A#', 4], ['G#', 1], ['F', 1],
  ]),
]

const PROGRESSION_MODES = new Set([
  'major', 'minor', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian',
])

// Legacy generic progressions hidden per mode because a Hooktheory
// mode-specific entry covers the same degree sequence
const DUPLICATE_LEGACY_BY_MODE: Record<string, string[]> = {
  major: ['1-5-6-4', '1-6-4-5'],
}

// Map any scale to the mode whose progression set applies to it
export function getProgressionModeForScale(scale: string): string {
  if (PROGRESSION_MODES.has(scale)) return scale
  return getChordQuality(scale) === 'minor' ? 'minor' : 'major'
}

// Progressions applicable to the given scale: the generic set plus the
// Hooktheory progressions for the scale's mode
export function getProgressionsForScale(scale: string): [string, ChordProgression][] {
  const mode = getProgressionModeForScale(scale)
  const hidden = new Set(DUPLICATE_LEGACY_BY_MODE[mode] ?? [])

  return Object.entries(CHORD_PROGRESSIONS).filter(([key, progression]) =>
    progression.mode ? progression.mode === mode : !hidden.has(key)
  )
}

// Resolve the chord (degree, root note, quality) at a progression position.
// Mode-tagged progressions derive roots from their mode's formula and use their
// explicit quality list; generic progressions use the major/minor degree tables.
export interface ProgressionChord {
  degree: number
  root: Note
  quality: ChordQuality
}

export function getProgressionChordAt(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string
): ProgressionChord | null {
  const progression = CHORD_PROGRESSIONS[progressionKey]
  if (!progression) return null

  const scaleQuality = getChordQuality(scale)
  const degrees = scaleQuality === 'minor' ? progression.degreesMinor : progression.degreesMajor
  const chordIndex = position % degrees.length
  const degree = degrees[chordIndex]

  const rootScale = progression.mode ?? scale
  const root = getChordRootForDegree(rootNote, rootScale, degree)

  let quality: ChordQuality
  if (progression.qualities) {
    quality = progression.qualities[chordIndex]
  } else if (scaleQuality === 'major') {
    // Major scale: I, IV, V are major; ii, iii, vi, vii° are minor/diminished
    quality = degree === 2 || degree === 3 || degree === 6 || degree === 7 ? 'minor' : 'major'
  } else {
    // Minor scale: i, iv, v are minor; III, VI, VII are major
    quality = degree === 1 || degree === 4 || degree === 5 ? 'minor' : 'major'
  }

  return { degree, root, quality }
}

// Get the chord root note for a given scale degree
export function getChordRootForDegree(
  rootNote: Note,
  scale: string,
  degree: number
): Note {
  const scaleFormula = SCALES[scale] || SCALES.major
  // Convert 1-based degree to 0-based index
  const degreeIndex = degree - 1

  if (degreeIndex < 0 || degreeIndex >= scaleFormula.length) {
    return rootNote // Fallback to root
  }

  const interval = scaleFormula[degreeIndex]
  const rootIndex = NOTES.indexOf(rootNote)
  return NOTES[(rootIndex + interval) % 12]
}

// Get chord voicing for a specific chord in a progression
// This finds the best voicing close to a scale position's fret range;
// scalePosition defaults to the chord index (each chord near its own box)
// but callers can pin every chord to one position (e.g. practice screen)
export function getProgressionChordVoicing(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string,
  tuning: Note[] = STANDARD_TUNING,
  scalePosition: number = position
): ChordVoicing | null {
  const chord = getProgressionChordAt(rootNote, scale, position, progressionKey)
  if (!chord) return null

  // Get the fret range of the scale position anchoring the voicing window
  const scalePositions = SCALE_POSITIONS[scale]
  if (!scalePositions || scalePositions.length === 0) return null
  const clampedPosition = Math.min(Math.max(0, scalePosition), scalePositions.length - 1)
  const positionData = scalePositions[clampedPosition]

  const baseRootFret = getRootFret(rootNote, tuning) // Root of scale on 6th string
  // Octave-shift the window into the first 12 frets: high-root keys push
  // positions past the curated voicing range (C major boxes span frets 8-23),
  // which would otherwise saturate every position to the same top voicing.
  // Mirrors the below-nut shift scale boxes get in the practice sequence.
  const rawStartFret = baseRootFret + positionData.start
  const octaveShift = -12 * Math.floor(rawStartFret / 12)
  const positionStartFret = rawStartFret + octaveShift
  const positionEndFret = baseRootFret + positionData.end + octaveShift
  const targetFret = Math.floor((positionStartFret + positionEndFret) / 2)

  // Pick the voicing closest to the position window; ties go to the
  // earlier voicing (voicing order roughly tracks playability)
  const candidates = getChordVoicingsForTuning(chord.root, chord.quality, tuning)
  if (candidates.length === 0) return null

  return candidates.reduce((best, candidate) => {
    const bestDistance = Math.abs(best.baseFret - targetFret)
    const candidateDistance = Math.abs(candidate.baseFret - targetFret)
    return candidateDistance < bestDistance ? candidate : best
  })
}

// Get all progression chord voicings across positions
export function getAllProgressionChordVoicings(
  rootNote: Note,
  scale: string,
  progressionKey: string,
  tuning: Note[] = STANDARD_TUNING
): ChordVoicing[] {
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic
  const voicings: ChordVoicing[] = []

  positions.forEach((_, index) => {
    const voicing = getProgressionChordVoicing(rootNote, scale, index, progressionKey, tuning)
    if (voicing) {
      voicings.push(voicing)
    }
  })

  return voicings
}

// Get chord name for a progression position
export function getProgressionChordName(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string
): string {
  const chord = getProgressionChordAt(rootNote, scale, position, progressionKey)
  if (!chord) return ''

  return `${chord.root}${CHORD_SUFFIXES[chord.quality]}`
}
