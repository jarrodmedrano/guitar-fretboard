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

// Chord Voicing Data Structure
export interface ChordVoicing {
  frets: (number | 'x')[]       // Fret number per string (low to high), 'x' = muted, 0 = open
  fingers: (number | null)[]     // Finger number (1-4) or null for open/muted strings
  baseFret: number               // The lowest fret used in this voicing (for display)
  barre?: number                 // Which fret has a barre (if any)
  shape: CAGEDShape              // Which CAGED shape this represents
  rootString: number             // Which string (0-5) has the root note
  rootFret: number               // Which fret the root is at
}

// Map each scale position to its corresponding CAGED shape
// For minor scales/pentatonics: E-D-C-A-G order
// For major scales/pentatonics: C-A-G-E-D order
export const CAGED_POSITION_MAP: Record<string, CAGEDShape[]> = {
  minorPentatonic: ['E', 'D', 'C', 'A', 'G'],  // Standard CAGED sequence for minor
  majorPentatonic: ['C', 'A', 'G', 'E', 'D'],
  pentatonicForms: ['E', 'D', 'C', 'A', 'G'],  // Match minor pentatonic
  pentatonicFormsMajor: ['C', 'A', 'G', 'E', 'D'],
  blues: ['E', 'D', 'C', 'A', 'G'],
  major: ['C', 'A', 'G', 'E', 'D', 'C', 'A'],
  minor: ['E', 'D', 'C', 'A', 'G', 'E', 'D'],  // Full CAGED cycle for 7 positions
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

// CAGED Chord Voicing Templates
// These define the shape patterns - we'll transpose them to different root notes

// Helper to create a voicing at a specific fret position
function createVoicing(
  frets: (number | 'x')[],
  fingers: (number | null)[],
  shape: CAGEDShape,
  rootString: number,
  rootFret: number
): ChordVoicing {
  const numericFrets = frets.filter(f => typeof f === 'number') as number[]
  const baseFret = numericFrets.length > 0 ? Math.min(...numericFrets) : 0

  // Check if there's a barre (same finger on multiple strings at same fret)
  const fingerCounts = new Map<number, Set<number>>()
  fingers.forEach((finger, stringIdx) => {
    if (finger && typeof frets[stringIdx] === 'number') {
      if (!fingerCounts.has(finger)) {
        fingerCounts.set(finger, new Set())
      }
      fingerCounts.get(finger)!.add(frets[stringIdx] as number)
    }
  })

  let barre: number | undefined
  fingerCounts.forEach((fretsSet, finger) => {
    if (fretsSet.size === 1 && finger === 1) {
      const fretNum = Array.from(fretsSet)[0]
      const count = fingers.filter((f, idx) => f === finger && frets[idx] === fretNum).length
      if (count >= 2) {
        barre = fretNum
      }
    }
  })

  return { frets, fingers, baseFret, barre, shape, rootString, rootFret }
}

// Major chord voicing templates for each CAGED shape
export const MAJOR_VOICINGS: Record<CAGEDShape, (rootFret: number) => ChordVoicing> = {
  // E shape - root on 6th string
  E: (rootFret: number) => {
    if (rootFret === 0) {
      // Open E shape
      return createVoicing(
        [0, 2, 2, 1, 0, 0],
        [null, 2, 3, 1, null, null],
        'E', 0, 0
      )
    } else {
      // Barred E shape
      return createVoicing(
        [rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret, rootFret],
        [1, 3, 4, 2, 1, 1],
        'E', 0, rootFret
      )
    }
  },

  // A shape - root on 5th string
  A: (rootFret: number) => {
    if (rootFret === 0) {
      // Open A shape
      return createVoicing(
        ['x', 0, 2, 2, 2, 0],
        [null, null, 1, 2, 3, null],
        'A', 1, 0
      )
    } else {
      // Barred A shape
      return createVoicing(
        ['x', rootFret, rootFret + 2, rootFret + 2, rootFret + 2, rootFret],
        [null, 1, 3, 3, 3, 1],
        'A', 1, rootFret
      )
    }
  },

  // D shape - root on 4th string
  D: (rootFret: number) => {
    if (rootFret === 0) {
      // Open D shape
      return createVoicing(
        ['x', 'x', 0, 2, 3, 2],
        [null, null, null, 1, 3, 2],
        'D', 2, 0
      )
    } else {
      // Moved D shape (can be tricky, often skipped)
      return createVoicing(
        ['x', 'x', rootFret, rootFret + 2, rootFret + 3, rootFret + 2],
        [null, null, null, 1, 4, 2],
        'D', 2, rootFret
      )
    }
  },

  // C shape - root on 5th string at 3rd fret
  C: (rootFret: number) => {
    if (rootFret === 3) {
      // Open C shape (C chord)
      return createVoicing(
        ['x', 3, 2, 0, 1, 0],
        [null, 3, 2, null, 1, null],
        'C', 1, 3
      )
    } else {
      // Moved C shape (barre version)
      const offset = rootFret - 3
      return createVoicing(
        ['x', rootFret, rootFret - 1, rootFret - 3, rootFret - 2, rootFret - 3],
        [null, 4, 3, 1, 2, 1],
        'C', 1, rootFret
      )
    }
  },

  // G shape - root on 6th string at 3rd fret
  G: (rootFret: number) => {
    if (rootFret === 3) {
      // Open G shape (G chord)
      return createVoicing(
        [3, 2, 0, 0, 0, 3],
        [2, 1, null, null, null, 3],
        'G', 0, 3
      )
    } else {
      // Moved G shape
      const offset = rootFret - 3
      return createVoicing(
        [rootFret, rootFret - 1, rootFret - 3, rootFret - 3, rootFret - 3, rootFret],
        [3, 2, 1, 1, 1, 4],
        'G', 0, rootFret
      )
    }
  }
}

// Minor chord voicing templates for each CAGED shape
export const MINOR_VOICINGS: Record<CAGEDShape, (rootFret: number) => ChordVoicing> = {
  // Em shape - root on 6th string
  E: (rootFret: number) => {
    if (rootFret === 0) {
      // Open Em shape
      return createVoicing(
        [0, 2, 2, 0, 0, 0],
        [null, 2, 3, null, null, null],
        'E', 0, 0
      )
    } else {
      // Barred Em shape
      return createVoicing(
        [rootFret, rootFret + 2, rootFret + 2, rootFret, rootFret, rootFret],
        [1, 3, 4, 1, 1, 1],
        'E', 0, rootFret
      )
    }
  },

  // Am shape - root on 5th string
  A: (rootFret: number) => {
    if (rootFret === 0) {
      // Open Am shape
      return createVoicing(
        ['x', 0, 2, 2, 1, 0],
        [null, null, 2, 3, 1, null],
        'A', 1, 0
      )
    } else {
      // Barred Am shape
      return createVoicing(
        ['x', rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret],
        [null, 1, 3, 4, 2, 1],
        'A', 1, rootFret
      )
    }
  },

  // Dm shape - root on 4th string
  D: (rootFret: number) => {
    if (rootFret === 0) {
      // Open Dm shape
      return createVoicing(
        ['x', 'x', 0, 2, 3, 1],
        [null, null, null, 2, 3, 1],
        'D', 2, 0
      )
    } else {
      // Moved Dm shape
      return createVoicing(
        ['x', 'x', rootFret, rootFret + 2, rootFret + 3, rootFret + 1],
        [null, null, null, 2, 4, 1],
        'D', 2, rootFret
      )
    }
  },

  // Cm shape - root on 5th string
  C: (rootFret: number) => {
    if (rootFret === 0) {
      // Open Am-style shape (actually an A minor voicing)
      return createVoicing(
        ['x', 0, 2, 2, 1, 0],
        [null, null, 2, 3, 1, null],
        'C', 1, 0
      )
    } else {
      // Barred C shape minor
      return createVoicing(
        ['x', rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret],
        [null, 1, 3, 4, 2, 1],
        'C', 1, rootFret
      )
    }
  },

  // Gm shape - root on 6th string
  G: (rootFret: number) => {
    // Gm shape (similar to E shape but different position)
    return createVoicing(
      [rootFret, rootFret + 2, rootFret + 2, rootFret, rootFret, rootFret],
      [1, 3, 4, 1, 1, 1],
      'G', 0, rootFret
    )
  }
}

// Get chord voicing for a specific root note, scale, and position
export function getChordVoicing(
  rootNote: Note,
  scale: string,
  position: number,
  tuning: Note[] = STANDARD_TUNING
): ChordVoicing | null {
  const quality = getChordQuality(scale)
  const shape = getCAGEDShape(scale, position)
  const voicings = quality === 'minor' ? MINOR_VOICINGS : MAJOR_VOICINGS
  const voicingFn = voicings[shape]

  if (!voicingFn) return null

  // Determine which string the root should be on for this shape
  let rootString: number
  switch (shape) {
    case 'E':
    case 'G':
      rootString = 0 // 6th string (low E)
      break
    case 'A':
    case 'C':
      rootString = 1 // 5th string (A)
      break
    case 'D':
      rootString = 2 // 4th string (D)
      break
    default:
      rootString = 0
  }

  // Find where the root note appears on that string
  const openNote = tuning[rootString]
  const rootFret = (NOTES.indexOf(rootNote) - NOTES.indexOf(openNote) + 12) % 12

  // For positions beyond the first, we might need to find the root in a higher octave
  const positionData = SCALE_POSITIONS[scale]?.[position]
  if (positionData) {
    // Position ranges are defined relative to root on 6th string
    // Calculate the actual target fret range for this position
    const baseRootFret = getRootFret(rootNote, tuning) // Root on 6th string
    const positionStartFret = baseRootFret + positionData.start
    const positionEndFret = baseRootFret + positionData.end
    const targetFret = Math.floor((positionStartFret + positionEndFret) / 2) // Middle of position

    // Try to find root across multiple octaves (0, 12, 24)
    const options = [rootFret, rootFret + 12, rootFret + 24]

    // Filter options that are reasonable for this position
    // Allow higher frets for higher positions
    const maxFret = position >= 3 ? 24 : 22
    const playableOptions = options.filter(opt => opt <= maxFret)

    if (playableOptions.length > 0) {
      const adjustedRootFret = playableOptions.reduce((closest, current) => {
        const closestDist = Math.abs(closest - targetFret)
        const currentDist = Math.abs(current - targetFret)

        return currentDist < closestDist ? current : closest
      })

      return voicingFn(adjustedRootFret)
    }
  }

  return voicingFn(rootFret)
}

// Get all chord voicings across the fretboard (for "All" position mode)
export function getAllChordVoicings(
  rootNote: Note,
  scale: string,
  tuning: Note[] = STANDARD_TUNING
): ChordVoicing[] {
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic
  const voicings: ChordVoicing[] = []

  positions.forEach((_, index) => {
    const voicing = getChordVoicing(rootNote, scale, index, tuning)
    if (voicing) {
      voicings.push(voicing)
    }
  })

  return voicings
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
  // like the major V in minor keys). Progressions without these fields use the
  // generic major/minor degree tables.
  mode?: string
  qualities?: ('major' | 'minor')[]
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
    qualities: ['major', 'major', 'minor', 'major'],
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
    qualities: ['minor', 'minor', 'minor', 'major'],
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
  quality: 'major' | 'minor'
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

  let quality: 'major' | 'minor'
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

// Get chord voicing for a specific position in a progression
// This finds the best voicing close to the position's fret range
export function getProgressionChordVoicing(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string,
  tuning: Note[] = STANDARD_TUNING
): ChordVoicing | null {
  const chord = getProgressionChordAt(rootNote, scale, position, progressionKey)
  if (!chord) return null

  const chordRoot = chord.root
  const isMinorChord = chord.quality === 'minor'

  // Get position's fret range
  const positionData = SCALE_POSITIONS[scale]?.[position]
  if (!positionData) return null

  const baseRootFret = getRootFret(rootNote, tuning) // Root of scale on 6th string
  const positionStartFret = baseRootFret + positionData.start
  const positionEndFret = baseRootFret + positionData.end
  const targetFret = Math.floor((positionStartFret + positionEndFret) / 2)

  // Find all possible voicings for this chord across different shapes
  const voicings = isMinorChord ? MINOR_VOICINGS : MAJOR_VOICINGS
  const candidates: { voicing: ChordVoicing; distance: number }[] = []

  // Try each CAGED shape
  for (const [shapeName, voicingFn] of Object.entries(voicings)) {
    const shape = shapeName as CAGEDShape

    // Determine which string this shape has its root on
    let rootString: number
    switch (shape) {
      case 'E':
      case 'G':
        rootString = 0
        break
      case 'A':
      case 'C':
        rootString = 1
        break
      case 'D':
        rootString = 2
        break
      default:
        rootString = 0
    }

    // Find where this chord's root appears on that string
    const openNote = tuning[rootString]
    const rootFret = (NOTES.indexOf(chordRoot) - NOTES.indexOf(openNote) + 12) % 12

    // Try different octaves
    const options = [rootFret, rootFret + 12, rootFret + 24]

    for (const fret of options) {
      if (fret > 22) continue // Too high to be playable

      const voicing = voicingFn(fret)
      const distance = Math.abs(voicing.baseFret - targetFret)

      candidates.push({ voicing, distance })
    }
  }

  // Return the voicing closest to the target fret
  if (candidates.length === 0) return null

  // Sort by distance, but prefer more common shapes (E, A) over less common ones (D, C, G)
  // when the distance difference is small (within 2 frets)
  const shapePreference: Record<CAGEDShape, number> = {
    'E': 1,  // Most common - full barre chord
    'A': 2,  // Second most common - 5-string barre
    'G': 3,
    'C': 4,
    'D': 5   // Least common - only 4 strings
  }

  candidates.sort((a, b) => {
    const distDiff = a.distance - b.distance
    // If distance difference is small (within 2 frets), prefer more common shapes
    if (Math.abs(distDiff) <= 2) {
      const shapePrefA = shapePreference[a.voicing.shape] || 99
      const shapePrefB = shapePreference[b.voicing.shape] || 99
      return shapePrefA - shapePrefB
    }
    // Otherwise just use distance
    return distDiff
  })

  const selectedVoicing = candidates[0].voicing
  return selectedVoicing
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

  return `${chord.root}${chord.quality === 'minor' ? 'm' : ''}`
}
