import { NOTES, type Note } from '@/lib/music-theory'

// MIDI note of the lowest string in the instrument's standard tuning,
// used as the anchor when deriving octaves: E1 (bass), E2 (guitar), B1 (7-string), F#1 (8-string)
const LOW_STRING_ANCHOR_MIDI: Record<number, number> = {
  4: 28,
  6: 40,
  7: 35,
  8: 30,
}

const A4_MIDI = 69
const A4_FREQUENCY = 440
const SEMITONES_PER_OCTAVE = 12

function getPitchClass(note: Note): number {
  return NOTES.indexOf(note)
}

function nearestMidiWithPitchClass(pitchClass: number, anchor: number): number {
  const below = anchor - (((anchor - pitchClass) % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) % SEMITONES_PER_OCTAVE
  const above = below + SEMITONES_PER_OCTAVE
  return anchor - below <= above - anchor ? below : above
}

export function getStringMidiNotes(tuning: Note[]): number[] {
  const anchor = LOW_STRING_ANCHOR_MIDI[tuning.length] ?? LOW_STRING_ANCHOR_MIDI[6]

  return tuning.reduce<number[]>((midiNotes, note, index) => {
    const pitchClass = getPitchClass(note)

    if (index === 0) {
      return [nearestMidiWithPitchClass(pitchClass, anchor)]
    }

    const previous = midiNotes[index - 1]
    const offset = (((pitchClass - previous) % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) % SEMITONES_PER_OCTAVE
    const next = previous + (offset === 0 ? SEMITONES_PER_OCTAVE : offset)

    return [...midiNotes, next]
  }, [])
}

export function midiToFrequency(midi: number): number {
  return A4_FREQUENCY * 2 ** ((midi - A4_MIDI) / SEMITONES_PER_OCTAVE)
}

export function getFrequency(tuning: Note[], stringIndex: number, fret: number): number {
  return midiToFrequency(getStringMidiNotes(tuning)[stringIndex] + fret)
}
