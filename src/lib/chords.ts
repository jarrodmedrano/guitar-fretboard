// Chord voicing lookup backed by curated shapes in the Uberchord API wire
// format (see src/lib/chord-shapes.ts). This replaces the old algorithmic
// CAGED shape generator: every voicing here is a real, playable fingering.

import type { Note } from './notes'
import { CHORD_SHAPES, type UberchordVoicing } from './chord-shapes'

export type ChordQuality =
  | 'major'
  | 'minor'
  | 'dim'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | '7'
  | 'maj7'
  | 'm7'
  | 'm7b5'
  | 'dim7'
  | '6'
  | 'm6'
  | 'add9'
  | '9'

// Display order for chord-type pickers: triads, sevenths, then color tones
export const CHORD_QUALITIES: ChordQuality[] = [
  'major', 'minor', 'dim', 'aug', 'sus2', 'sus4',
  '7', 'maj7', 'm7', 'm7b5', 'dim7',
  '6', 'm6', 'add9', '9',
]

export const CHORD_QUALITY_LABELS: Record<ChordQuality, string> = {
  major: 'Maj',
  minor: 'Min',
  dim: 'dim',
  aug: 'aug',
  sus2: 'sus2',
  sus4: 'sus4',
  '7': '7',
  maj7: 'maj7',
  m7: 'm7',
  m7b5: 'm7b5',
  dim7: 'dim7',
  '6': '6',
  m6: 'm6',
  add9: 'add9',
  '9': '9',
}

export const CHORD_SUFFIXES: Record<ChordQuality, string> = {
  major: '',
  minor: 'm',
  dim: 'dim',
  aug: 'aug',
  sus2: 'sus2',
  sus4: 'sus4',
  '7': '7',
  maj7: 'maj7',
  m7: 'm7',
  m7b5: 'm7b5',
  dim7: 'dim7',
  '6': '6',
  m6: 'm6',
  add9: 'add9',
  '9': '9',
}

const MINOR_FLAVORED: ReadonlySet<ChordQuality> = new Set([
  'minor',
  'm7',
  'm7b5',
  'dim',
  'dim7',
  'm6',
])

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
