// Tuning-aware chord voicings.
//
// 6-string instruments use the curated dataset (src/lib/chords.ts).
// 4-string basses get compact voicings generated from chord tones, and
// 7/8-string guitars get the curated shapes placed on their top six strings
// and auto-extended onto the extra low strings where a chord tone is in reach.
//
// Every instrument's base set is then extended into a full-neck ladder:
// octave repeats of each shape (+12 frets), plus movable CAGED shapes filling
// the areas the curated data misses (6-string major/minor only).

import { NOTES, type Note } from './notes'
import { getChordVoicings, type ChordQuality, type ChordVoicing } from './chords'
import { generateCagedVoicings } from './caged-shapes'
import { getStringMidiNotes } from './audio/frequencies'

const SEMITONES_PER_OCTAVE = 12
const MAX_FRET = 17
const MAX_ABSOLUTE_FRET = 24
const MAX_HAND_SPAN = 3
// A few root/quality/tuning combos can't produce two span-3 voicings
// (e.g. Emaj7 on drop-D bass) — they get a second pass with a wider stretch.
// add9 shapes pack a whole-tone cluster and can need a third, wider pass.
const RELAXED_HAND_SPAN = 4
const WIDE_HAND_SPAN = 5
const MAX_VOICINGS = 4
const GUITAR_TOP_SIX: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

const CHORD_INTERVALS: Record<ChordQuality, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  '7': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  '6': [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  add9: [0, 4, 7, 14],
  '9': [0, 4, 7, 10, 14],
}

function pitchClass(note: Note): number {
  return NOTES.indexOf(note)
}

// Simple display heuristic: finger = fret offset from the lowest fretted note,
// so strings sharing a fret share a finger (reads as a barre)
function computeFingers(frets: (number | 'x')[]): (number | null)[] {
  const fretted = frets.filter((fret): fret is number => fret !== 'x' && fret > 0)
  if (fretted.length === 0) return frets.map(() => null)

  const minFret = Math.min(...fretted)
  return frets.map((fret) => {
    if (fret === 'x' || fret === 0) return null
    return Math.min(fret - minFret + 1, 4)
  })
}

function toVoicing(frets: (number | 'x')[]): ChordVoicing {
  const fretted = frets.filter((fret): fret is number => fret !== 'x' && fret > 0)
  return {
    frets,
    fingers: computeFingers(frets),
    baseFret: fretted.length > 0 ? Math.min(...fretted) : 0,
  }
}

// --- Compact generation (bass, and fallback for exotic tunings) -------------

// Rotation-based closed voicings, generalizing the triads.ts approach: take
// the chord tones (rotated for inversions), lay them across a window of
// adjacent strings with strictly ascending pitch, keep the ones a hand can
// actually fret.

function rotate(values: number[], by: number): number[] {
  return values.map((_, i) => values[(i + by) % values.length])
}

// Place one pitch class per string across the window, ascending in pitch
function realizeClosedVoicing(
  pcs: number[],
  windowStart: number,
  midiNotes: number[],
  stringCount: number,
  anchorFret: number
): (number | 'x')[] | null {
  const frets: (number | 'x')[] = Array.from({ length: stringCount }, () => 'x')
  let previousPitch = -Infinity

  for (let voice = 0; voice < pcs.length; voice++) {
    const stringIndex = windowStart + voice
    const openMidi = midiNotes[stringIndex]

    let fret: number
    if (voice === 0) {
      fret = anchorFret
    } else {
      fret =
        ((pcs[voice] - openMidi) % SEMITONES_PER_OCTAVE + SEMITONES_PER_OCTAVE) %
        SEMITONES_PER_OCTAVE
      while (openMidi + fret <= previousPitch) {
        fret += SEMITONES_PER_OCTAVE
      }
    }

    if (fret > MAX_FRET) return null
    previousPitch = openMidi + fret
    frets[stringIndex] = fret
  }

  return frets
}

function fretsWithinSpan(frets: (number | 'x')[], maxSpan: number): boolean {
  const fretted = frets.filter((fret): fret is number => fret !== 'x' && fret > 0)
  if (fretted.length === 0) return true
  return Math.max(...fretted) - Math.min(...fretted) <= maxSpan
}

function bassNoteIsRoot(
  frets: (number | 'x')[],
  midiNotes: number[],
  rootPc: number
): boolean {
  const lowestIndex = frets.findIndex((fret) => fret !== 'x')
  if (lowestIndex === -1) return false
  const fret = frets[lowestIndex] as number
  return (midiNotes[lowestIndex] + fret) % SEMITONES_PER_OCTAVE === rootPc
}

function generateCompactVoicings(
  root: Note,
  quality: ChordQuality,
  tuning: Note[]
): ChordVoicing[] {
  const strict = collectCompactVoicings(root, quality, tuning, MAX_HAND_SPAN)
  if (strict.length >= 2) return strict
  const relaxed = collectCompactVoicings(root, quality, tuning, RELAXED_HAND_SPAN)
  if (relaxed.length >= 2) return relaxed
  return collectCompactVoicings(root, quality, tuning, WIDE_HAND_SPAN)
}

function collectCompactVoicings(
  root: Note,
  quality: ChordQuality,
  tuning: Note[],
  maxSpan: number
): ChordVoicing[] {
  const intervals = CHORD_INTERVALS[quality]
  const rootPc = pitchClass(root)
  const midiNotes = getStringMidiNotes(tuning)

  // Full chord across a window sized to the tone count, plus root-third-seventh
  // shells for 7th chords (the fifth is the droppable tone)
  const toneSets: number[][] = [intervals.map((interval) => (rootPc + interval) % 12)]
  if (intervals.length > 3) {
    toneSets.push(
      [0, 1, 3].map((i) => (rootPc + intervals[i]) % SEMITONES_PER_OCTAVE)
    )
  }

  const seen = new Set<string>()
  const candidates: { frets: (number | 'x')[]; order: number }[] = []
  let order = 0

  toneSets.forEach((tones) => {
    for (let rotation = 0; rotation < tones.length; rotation++) {
      const pcs = rotate(tones, rotation)
      for (
        let windowStart = 0;
        windowStart + pcs.length <= tuning.length;
        windowStart++
      ) {
        const openMidi = midiNotes[windowStart]
        const base =
          ((pcs[0] - openMidi) % SEMITONES_PER_OCTAVE + SEMITONES_PER_OCTAVE) %
          SEMITONES_PER_OCTAVE

        for (const anchorFret of [base, base + SEMITONES_PER_OCTAVE]) {
          if (anchorFret > SEMITONES_PER_OCTAVE) continue

          const frets = realizeClosedVoicing(
            pcs,
            windowStart,
            midiNotes,
            tuning.length,
            anchorFret
          )
          if (!frets || !fretsWithinSpan(frets, maxSpan)) continue

          const key = frets.join(',')
          if (seen.has(key)) continue
          seen.add(key)
          candidates.push({ frets, order: order++ })
        }
      }
    }
  })

  return candidates
    .map(({ frets, order: candidateOrder }) => ({
      voicing: toVoicing(frets),
      rootInBass: bassNoteIsRoot(frets, midiNotes, rootPc),
      sounded: frets.filter((fret) => fret !== 'x').length,
      candidateOrder,
    }))
    .sort((a, b) => {
      if (a.voicing.baseFret !== b.voicing.baseFret) {
        return a.voicing.baseFret - b.voicing.baseFret
      }
      if (a.rootInBass !== b.rootInBass) return a.rootInBass ? -1 : 1
      if (a.sounded !== b.sounded) return b.sounded - a.sounded
      return a.candidateOrder - b.candidateOrder
    })
    .slice(0, MAX_VOICINGS)
    .map(({ voicing }) => voicing)
}

// --- 7/8-string extension ---------------------------------------------------

// The single semitone offset k such that the top six strings are guitar
// standard tuning transposed down by k (0 for standard 7/8, 2 for A/E
// standard), or null when the shapes don't transfer
function topSixTranspositionOffset(tuning: Note[]): number | null {
  const topSix = tuning.slice(-6)
  const offset =
    (pitchClass(GUITAR_TOP_SIX[0]) - pitchClass(topSix[0]) + SEMITONES_PER_OCTAVE) %
    SEMITONES_PER_OCTAVE

  const matches = topSix.every(
    (note, i) =>
      (pitchClass(note) + offset) % SEMITONES_PER_OCTAVE ===
      pitchClass(GUITAR_TOP_SIX[i])
  )
  return matches ? offset : null
}

function findLowStringFret(
  openMidi: number,
  allowedPcs: number[],
  window: { min: number; max: number }
): number | 'x' {
  for (const pc of allowedPcs) {
    const base =
      ((pc - openMidi) % SEMITONES_PER_OCTAVE + SEMITONES_PER_OCTAVE) %
      SEMITONES_PER_OCTAVE
    for (const fret of [base, base + SEMITONES_PER_OCTAVE]) {
      if (fret >= window.min && fret <= window.max) return fret
    }
    if (base === 0) return 0 // open string carries the tone
  }
  return 'x'
}

function extendCurated(
  root: Note,
  quality: ChordQuality,
  tuning: Note[],
  transposition: number
): ChordVoicing[] {
  const midiNotes = getStringMidiNotes(tuning)
  const extraStrings = tuning.length - 6
  const rootPc = pitchClass(root)
  const fifthPc = (rootPc + CHORD_INTERVALS[quality][2]) % SEMITONES_PER_OCTAVE

  return getChordVoicings(root, quality).flatMap((curated) => {
    const topSix = curated.frets.map((fret) =>
      fret === 'x' ? ('x' as const) : fret + transposition
    )
    if (topSix.some((fret) => fret !== 'x' && fret > MAX_ABSOLUTE_FRET)) return []

    const fretted = topSix.filter((fret): fret is number => fret !== 'x' && fret > 0)
    const window =
      fretted.length > 0
        ? { min: Math.max(1, Math.min(...fretted) - 1), max: Math.max(...fretted) }
        : { min: 1, max: 3 }

    const lowFrets: (number | 'x')[] = []
    for (let stringIndex = extraStrings - 1; stringIndex >= 0; stringIndex--) {
      // The string adjacent to the shape may carry the root or fifth; anything
      // below that only takes the root (stacked low fifths get muddy)
      const allowedPcs = stringIndex === extraStrings - 1 ? [rootPc, fifthPc] : [rootPc]
      lowFrets.unshift(findLowStringFret(midiNotes[stringIndex], allowedPcs, window))
    }

    return [toVoicing([...lowFrets, ...topSix])]
  })
    // Transposition can turn open strings into fretted notes, changing the
    // relative baseFret order versus the curated list — re-sort (stable)
    .sort((a, b) => a.baseFret - b.baseFret)
}

// --- Full-neck ladder (octave repeats + CAGED gap fill) ---------------------

// Repeat each shape an octave higher (open strings become fret 12, turning
// open chords into their real 12th-fret barre forms). Repeats that fall off
// the fretboard or stretch past a relaxed hand span (e.g. "x 0 7 9 10 8",
// whose open A becomes a 10-fret reach) are dropped.
function addOctaveRepeats(voicings: ChordVoicing[]): ChordVoicing[] {
  const repeats = voicings
    .map((voicing) =>
      voicing.frets.map((fret) =>
        fret === 'x' ? ('x' as const) : fret + SEMITONES_PER_OCTAVE
      )
    )
    .filter(
      (frets) =>
        frets.every((fret) => fret === 'x' || fret <= MAX_ABSOLUTE_FRET) &&
        fretsWithinSpan(frets, RELAXED_HAND_SPAN)
    )
    .map(toVoicing)
  return [...voicings, ...repeats]
}

// A generated CAGED shape only joins the ladder when it lands in a neck area
// no other voicing covers (no entry within one fret of its baseFret), so it
// fills genuine gaps — like the D-shape C major at fret 10 — without
// shadowing curated fingerings with near-identical generated ones
function buildVoicingLadder(
  base: ChordVoicing[],
  root: Note,
  quality: ChordQuality,
  tuning: Note[]
): ChordVoicing[] {
  const withRepeats = addOctaveRepeats(base)
  const cagedFill = tuning.length === 6 ? generateCagedVoicings(root, quality) : []

  return cagedFill
    .reduce((ladder, candidate) => {
      const coversNewArea = ladder.every(
        (voicing) =>
          voicing.frets.join(',') !== candidate.frets.join(',') &&
          Math.abs(voicing.baseFret - candidate.baseFret) > 1
      )
      return coversNewArea ? [...ladder, candidate] : ladder
    }, withRepeats)
    .slice()
    .sort((a, b) => a.baseFret - b.baseFret)
}

// --- Dispatcher -------------------------------------------------------------

const voicingCache = new Map<string, ChordVoicing[]>()

export function getChordVoicingsForTuning(
  root: Note,
  quality: ChordQuality,
  tuning: Note[]
): ChordVoicing[] {
  const key = `${root}|${quality}|${tuning.join(',')}`
  const cached = voicingCache.get(key)
  if (cached) return cached

  let base: ChordVoicing[]
  if (tuning.length === 6) {
    // All 6-string tunings use the curated standard shapes, as before
    base = getChordVoicings(root, quality)
  } else if (tuning.length < 6) {
    base = generateCompactVoicings(root, quality, tuning)
  } else {
    const transposition = topSixTranspositionOffset(tuning)
    base =
      transposition !== null
        ? extendCurated(root, quality, tuning, transposition)
        : generateCompactVoicings(root, quality, tuning)
  }

  const ladder = buildVoicingLadder(base, root, quality, tuning)
  voicingCache.set(key, ladder)
  return ladder
}

export function getChordVoicingCountForTuning(
  root: Note,
  quality: ChordQuality,
  tuning: Note[]
): number {
  return getChordVoicingsForTuning(root, quality, tuning).length
}
