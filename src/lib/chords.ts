// Chord voicing lookup backed by curated shapes in the Uberchord API wire
// format (see src/lib/chord-shapes.ts). This replaces the old algorithmic
// CAGED shape generator: every voicing here is a real, playable fingering.

import type { Note } from './notes'
import { CHORD_SHAPES, type UberchordVoicing } from './chord-shapes'

export type ChordQuality = 'major' | 'minor' | '7' | 'maj7' | 'm7' | 'm7b5'

export const CHORD_SUFFIXES: Record<ChordQuality, string> = {
  major: '',
  minor: 'm',
  '7': '7',
  maj7: 'maj7',
  m7: 'm7',
  m7b5: 'm7b5',
}

const MINOR_FLAVORED: ReadonlySet<ChordQuality> = new Set(['minor', 'm7', 'm7b5'])

// Minor-flavored qualities render lowercase roman numerals
export function isMinorQuality(quality: ChordQuality): boolean {
  return MINOR_FLAVORED.has(quality)
}

export interface ChordVoicing {
  frets: (number | 'x')[] // absolute frets, index 0 = lowest string, 'x' = muted
  fingers: (number | null)[] // parallel to frets; null for open and muted strings
  baseFret: number // lowest fretted note; 0 for all-open shapes
}

export function parseUberchordVoicing(voicing: UberchordVoicing): ChordVoicing {
  const frets = voicing.strings
    .split(' ')
    .map((token) => (token === 'X' ? ('x' as const) : Number(token)))

  const fingers = voicing.fingering
    .split(' ')
    .map((token) => (token === 'X' ? null : Number(token)))

  const frettedNotes = frets.filter((fret): fret is number => fret !== 'x' && fret > 0)

  return {
    frets,
    fingers,
    baseFret: frettedNotes.length > 0 ? Math.min(...frettedNotes) : 0,
  }
}

const voicingCache = new Map<string, ChordVoicing[]>()

export function getChordVoicings(root: Note, quality: ChordQuality): ChordVoicing[] {
  const key = `${root}_${quality}`
  const cached = voicingCache.get(key)
  if (cached) return cached

  const parsed = (CHORD_SHAPES[key] ?? []).map(parseUberchordVoicing)
  voicingCache.set(key, parsed)
  return parsed
}

export function getChordVoicingCount(root: Note, quality: ChordQuality): number {
  return CHORD_SHAPES[`${root}_${quality}`]?.length ?? 0
}
