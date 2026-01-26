// src/lib/music-theory/chords.ts
// CAGED chord voicing system

import { Note, NOTES, CAGEDShape, ChordVoicing } from './types'
import { SCALES, SCALE_POSITIONS } from './scales'
import { STANDARD_TUNING } from './tunings'
import { getRootFret } from './intervals'

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
