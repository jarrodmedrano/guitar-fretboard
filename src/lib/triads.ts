import {
  MAJOR_CHORD_INTERVALS,
  MINOR_CHORD_INTERVALS,
  NOTES,
  STANDARD_TUNING,
  type Note,
} from '@/lib/music-theory'
import { getStringMidiNotes } from '@/lib/audio/frequencies'

export type TriadQuality = 'major' | 'minor'
export type Inversion = 0 | 1 | 2

export interface TriadStringSet {
  label: string
  stringIndices: [number, number, number]
}

export interface TriadVoicing {
  quality: TriadQuality
  inversion: Inversion
  stringIndices: [number, number, number]
  frets: [number, number, number]
  notes: [Note, Note, Note]
}

const MAX_FRET = 17
const MAX_STRING_SETS = 4
const SEMITONES_PER_OCTAVE = 12

export function getTriadStringSets(stringCount: number): TriadStringSet[] {
  const windowCount = Math.min(stringCount - 2, MAX_STRING_SETS)

  return Array.from({ length: windowCount }, (_, setIndex) => {
    const highIndex = stringCount - 1 - setIndex
    return {
      label: `Strings ${setIndex + 1}-${setIndex + 2}-${setIndex + 3}`,
      stringIndices: [highIndex - 2, highIndex - 1, highIndex] as [number, number, number],
    }
  })
}

function getTriadPitchClasses(root: Note, quality: TriadQuality, inversion: Inversion): number[] {
  const offsets = quality === 'major' ? MAJOR_CHORD_INTERVALS : MINOR_CHORD_INTERVALS
  const rootPitchClass = NOTES.indexOf(root)

  return [0, 1, 2].map(
    (voice) => (rootPitchClass + offsets[(inversion + voice) % 3]) % SEMITONES_PER_OCTAVE
  )
}

export function getTriadVoicing(
  root: Note,
  quality: TriadQuality,
  stringSet: [number, number, number],
  inversion: Inversion,
  tuning: Note[] = STANDARD_TUNING,
  minFret = 0
): TriadVoicing | null {
  const midiNotes = getStringMidiNotes(tuning)
  const pitchClasses = getTriadPitchClasses(root, quality, inversion)

  const frets: number[] = []
  let previousPitch = -Infinity

  for (let voice = 0; voice < 3; voice++) {
    const stringMidi = midiNotes[stringSet[voice]]
    const pitchClass = pitchClasses[voice]
    const lowestAllowedFret = voice === 0 ? minFret : 0

    let fret =
      ((pitchClass - stringMidi) % SEMITONES_PER_OCTAVE + SEMITONES_PER_OCTAVE) %
      SEMITONES_PER_OCTAVE
    while (fret < lowestAllowedFret || stringMidi + fret <= previousPitch) {
      fret += SEMITONES_PER_OCTAVE
    }

    if (fret > MAX_FRET) return null

    previousPitch = stringMidi + fret
    frets.push(fret)
  }

  return {
    quality,
    inversion,
    stringIndices: stringSet,
    frets: frets as [number, number, number],
    notes: pitchClasses.map((pc) => NOTES[pc]) as [Note, Note, Note],
  }
}
