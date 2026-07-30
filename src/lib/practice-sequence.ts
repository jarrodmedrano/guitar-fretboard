import {
  CHORD_PROGRESSIONS,
  CHORD_SUFFIXES,
  SCALES,
  SCALE_POSITIONS,
  STANDARD_TUNING,
  getChordNameForPosition,
  getChordQuality,
  getChordVoicing,
  getNoteAtFret,
  getProgressionChordAt,
  getProgressionChordVoicing,
  getRootFret,
  isMinorQuality,
  isNoteInScale,
  type ChordQuality,
  type ChordVoicing,
  type Note,
} from '@/lib/music-theory'
import { getStringMidiNotes } from '@/lib/audio/frequencies'
import { getTriadVoicing, type Inversion } from '@/lib/triads'

export type PracticeMode = 'scale' | 'chord' | 'triad' | 'progression'
export type ScaleDirection = 'asc' | 'asc-desc'

export interface PracticeNote {
  stringIndex: number
  fret: number
}

export interface PracticeStep {
  notes: PracticeNote[]
  durationBeats: number
  strum: boolean
  label?: string
}

export interface PracticeSequenceOptions {
  mode: PracticeMode
  rootNote: Note
  scale: string
  position: number
  tuning: Note[]
  direction: ScaleDirection
  triadStringSet: [number, number, number]
  progression: string
}

const MAX_FRET = 24
const INVERSION_LABELS: Record<Inversion, string> = {
  0: 'Root position',
  1: '1st inversion',
  2: '2nd inversion',
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

// Roman numeral for a progression chord: uppercase for major-flavored
// qualities, lowercase for minor-flavored (minor, m7, m7b5)
export function getRomanNumeral(degree: number, quality: ChordQuality): string {
  const numeral = ROMAN_NUMERALS[(degree - 1) % ROMAN_NUMERALS.length] ?? String(degree)
  return isMinorQuality(quality) ? numeral.toLowerCase() : numeral
}

function getPositionWindow(
  rootNote: Note,
  scale: string,
  position: number,
  tuning: Note[]
): { start: number; end: number } {
  const rootFret = getRootFret(rootNote, tuning)
  const pos = SCALE_POSITIONS[scale]?.[position]
  if (!pos) return { start: 0, end: 12 }

  const start = rootFret + pos.start
  const end = rootFret + pos.end
  // Shift boxes that would start below the nut up an octave so the full shape is playable
  if (start < 0) return { start: start + 12, end: end + 12 }
  return { start, end }
}

function buildScaleSteps(opts: PracticeSequenceOptions): PracticeStep[] {
  const { rootNote, scale, position, tuning, direction } = opts
  const formula = SCALES[scale] || SCALES.major
  const { start, end } = getPositionWindow(rootNote, scale, position, tuning)
  const midiNotes = getStringMidiNotes(tuning)

  const ascending = tuning.reduce<{ steps: PracticeStep[]; previousPitch: number }>(
    (acc, openNote, stringIndex) => {
      const stepsForString: PracticeStep[] = []
      let previousPitch = acc.previousPitch

      for (let fret = Math.max(0, start); fret <= end; fret++) {
        const note = getNoteAtFret(openNote, fret)
        const pitch = midiNotes[stringIndex] + fret
        if (isNoteInScale(note, rootNote, formula) && pitch > previousPitch) {
          stepsForString.push({
            notes: [{ stringIndex, fret }],
            durationBeats: 1,
            strum: false,
            label: note,
          })
          previousPitch = pitch
        }
      }

      return { steps: [...acc.steps, ...stepsForString], previousPitch }
    },
    { steps: [], previousPitch: -Infinity }
  ).steps

  if (direction === 'asc' || ascending.length < 3) return ascending

  const descending = ascending.slice(1, -1).reverse()
  return [...ascending, ...descending]
}

function voicingToNotes(voicing: ChordVoicing): PracticeNote[] {
  return voicing.frets.reduce<PracticeNote[]>((notes, fret, stringIndex) => {
    if (fret === 'x' || fret < 0 || fret > MAX_FRET) return notes
    return [...notes, { stringIndex, fret }]
  }, [])
}

function buildChordSteps(opts: PracticeSequenceOptions): PracticeStep[] {
  const { rootNote, scale, position, tuning } = opts
  const voicing = getChordVoicing(rootNote, scale, position, tuning)
  if (!voicing) return []

  return [
    {
      notes: voicingToNotes(voicing),
      durationBeats: 4,
      strum: true,
      label: getChordNameForPosition(rootNote, scale, position, tuning),
    },
  ]
}

function buildTriadSteps(opts: PracticeSequenceOptions): PracticeStep[] {
  const { rootNote, scale, tuning, triadStringSet } = opts
  const quality = getChordQuality(scale)
  const chordName = `${rootNote}${quality === 'minor' ? 'm' : ''}`

  const inversions: Inversion[] = [0, 1, 2]
  return inversions
    .map((inversion) => getTriadVoicing(rootNote, quality, triadStringSet, inversion, tuning))
    .filter((voicing) => voicing !== null)
    .sort((a, b) => Math.min(...a.frets) - Math.min(...b.frets))
    .map((voicing) => ({
      notes: voicing.stringIndices.map((stringIndex, i) => ({
        stringIndex,
        fret: voicing.frets[i],
      })),
      durationBeats: 4,
      strum: true,
      label: `${chordName} — ${INVERSION_LABELS[voicing.inversion]}`,
    }))
}

function buildProgressionSteps(opts: PracticeSequenceOptions): PracticeStep[] {
  const { rootNote, scale, tuning, progression } = opts
  const progressionData = CHORD_PROGRESSIONS[progression]
  if (!progressionData) return []

  const quality = getChordQuality(scale)
  const degrees =
    quality === 'minor' ? progressionData.degreesMinor : progressionData.degreesMajor

  return degrees.reduce<PracticeStep[]>((steps, _degree, index) => {
    const voicing = getProgressionChordVoicing(rootNote, scale, index, progression, tuning)
    const chord = getProgressionChordAt(rootNote, scale, index, progression)
    if (!voicing || !chord) return steps

    const chordName = `${chord.root}${CHORD_SUFFIXES[chord.quality]}`
    return [
      ...steps,
      {
        notes: voicingToNotes(voicing),
        durationBeats: 4,
        strum: true,
        label: `${getRomanNumeral(chord.degree, chord.quality)} — ${chordName}`,
      },
    ]
  }, [])
}

export function buildPracticeSequence(opts: PracticeSequenceOptions): PracticeStep[] {
  const normalized = { ...opts, tuning: opts.tuning ?? STANDARD_TUNING }

  switch (normalized.mode) {
    case 'scale':
      return buildScaleSteps(normalized)
    case 'chord':
      return buildChordSteps(normalized)
    case 'triad':
      return buildTriadSteps(normalized)
    case 'progression':
      return buildProgressionSteps(normalized)
  }
}
