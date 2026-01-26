// src/lib/music-theory/scales.ts
import type { ScalePosition } from './types'

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

// Scale positions (fret offsets from root note)
// Each position covers a 4-5 fret span
export const SCALE_POSITIONS: Record<string, ScalePosition[]> = {
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

// Get position count for a scale
export function getPositionCount(scale: string): number {
  return SCALE_POSITIONS[scale]?.length || 5
}
