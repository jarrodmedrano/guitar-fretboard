export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

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

// CAGED System Support
export const CAGED_SHAPES = ['C', 'A', 'G', 'E', 'D'] as const
export type CAGEDShape = typeof CAGED_SHAPES[number]

// Map each scale position to its corresponding CAGED shape
// For minor scales/pentatonics: E-D-C-A-G order
// For major scales/pentatonics: C-A-G-E-D order
export const CAGED_POSITION_MAP: Record<string, CAGEDShape[]> = {
  minorPentatonic: ['E', 'D', 'C', 'A', 'G'],
  majorPentatonic: ['C', 'A', 'G', 'E', 'D'],
  pentatonicForms: ['E', 'D', 'C', 'A', 'G'],
  pentatonicFormsMajor: ['C', 'A', 'G', 'E', 'D'],
  blues: ['E', 'D', 'C', 'A', 'G'],
  major: ['C', 'A', 'G', 'E', 'D', 'C', 'A'],
  minor: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
  dorian: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
  phrygian: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
  lydian: ['C', 'A', 'G', 'E', 'D', 'C', 'A'],
  mixolydian: ['C', 'A', 'G', 'E', 'D', 'C', 'A'],
  locrian: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
  harmonicMinor: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
  melodicMinor: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],
}

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

// Get the CAGED shape name for a given position
export function getCAGEDShape(scale: string, position: number): CAGEDShape {
  const shapes = CAGED_POSITION_MAP[scale] || CAGED_POSITION_MAP.minorPentatonic
  return shapes[position] || 'E'
}

// Get the chord name for the current position
export function getChordNameForPosition(
  rootNote: Note,
  scale: string,
  position: number
): string {
  const quality = getChordQuality(scale)
  const cagedShape = getCAGEDShape(scale, position)
  const suffix = quality === 'minor' ? 'm' : ''

  return `${rootNote}${suffix} (${cagedShape} shape)`
}
