// src/lib/music-theory/progressions.ts
// Chord progression utilities and common progression patterns

import type { Note, ChordVoicing, CAGEDShape, ChordProgression } from './types'
import { NOTES } from './types'
import { STANDARD_TUNING } from './tunings'
import { SCALES, SCALE_POSITIONS } from './scales'
import { getRootFret } from './intervals'
import { getChordQuality, MAJOR_VOICINGS, MINOR_VOICINGS } from './chords'

// Extended chord progression type with description
interface ChordProgressionWithDescription extends ChordProgression {
  description: string
}

// Common chord progressions
export const CHORD_PROGRESSIONS: Record<string, ChordProgressionWithDescription> = {
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
  }
}

/**
 * Get the chord root note for a given scale degree
 * @param rootNote - The root note of the scale
 * @param scale - The scale name (e.g., 'major', 'minor')
 * @param degree - The scale degree (1-7)
 * @returns The note at that scale degree
 */
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

/**
 * Get chord voicing for a specific position in a progression
 * This finds the best voicing close to the position's fret range
 *
 * @param rootNote - The root note of the key
 * @param scale - The scale name
 * @param position - The scale position (0-based index)
 * @param progressionKey - The progression key (e.g., '1-4-5')
 * @param tuning - The guitar tuning (defaults to standard)
 * @returns The best chord voicing for this position, or null if not found
 */
export function getProgressionChordVoicing(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string,
  tuning: Note[] = STANDARD_TUNING
): ChordVoicing | null {
  const progression = CHORD_PROGRESSIONS[progressionKey]
  if (!progression) return null

  const scaleQuality = getChordQuality(scale)
  const degrees = scaleQuality === 'minor' ? progression.degreesMinor : progression.degreesMajor

  // Loop the progression if position exceeds progression length
  const chordDegree = degrees[position % degrees.length]

  // Get the root note for this chord in the progression
  const chordRoot = getChordRootForDegree(rootNote, scale, chordDegree)

  // Determine if THIS SPECIFIC CHORD should be major or minor based on scale degree
  // In major scales: I, IV, V are major; ii, iii, vi are minor
  // In minor scales: i, iv, v are minor; III, VI, VII are major
  const scaleQualityType = getChordQuality(scale)
  let isMinorChord: boolean

  if (scaleQualityType === 'major') {
    // Major scale chord qualities
    // I(1), IV(4), V(5) are major
    // ii(2), iii(3), vi(6), vii°(7) are minor/diminished
    isMinorChord = chordDegree === 2 || chordDegree === 3 || chordDegree === 6 || chordDegree === 7
  } else {
    // Minor scale chord qualities
    // i(1), iv(4), v(5) are minor
    // III(3), VI(6), VII(7) are major
    isMinorChord = chordDegree === 1 || chordDegree === 4 || chordDegree === 5
  }

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

/**
 * Get all progression chord voicings across positions
 *
 * @param rootNote - The root note of the key
 * @param scale - The scale name
 * @param progressionKey - The progression key (e.g., '1-4-5')
 * @param tuning - The guitar tuning (defaults to standard)
 * @returns Array of chord voicings for each position
 */
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

/**
 * Get chord name for a progression position
 *
 * @param rootNote - The root note of the key
 * @param scale - The scale name
 * @param position - The scale position (0-based index)
 * @param progressionKey - The progression key (e.g., '1-4-5')
 * @returns The chord name (e.g., 'Am', 'G', 'F')
 */
export function getProgressionChordName(
  rootNote: Note,
  scale: string,
  position: number,
  progressionKey: string
): string {
  const progression = CHORD_PROGRESSIONS[progressionKey]
  if (!progression) return ''

  const quality = getChordQuality(scale)
  const degrees = quality === 'minor' ? progression.degreesMinor : progression.degreesMajor
  const chordDegree = degrees[position % degrees.length]
  const chordRoot = getChordRootForDegree(rootNote, scale, chordDegree)

  // Determine if this scale degree should be major or minor
  const scaleQualityType = getChordQuality(scale)
  let isMinorChord: boolean

  if (scaleQualityType === 'major') {
    // Major scale: I, IV, V are major; ii, iii, vi are minor
    isMinorChord = chordDegree === 2 || chordDegree === 3 || chordDegree === 6 || chordDegree === 7
  } else {
    // Minor scale: i, iv, v are minor; III, VI, VII are major
    isMinorChord = chordDegree === 1 || chordDegree === 4 || chordDegree === 5
  }

  const suffix = isMinorChord ? 'm' : ''

  return `${chordRoot}${suffix}`
}
