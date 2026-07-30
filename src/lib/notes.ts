// Leaf module for the chromatic scale — imported by low-level modules
// (frequencies, chords, chord-voicings) so they never need to import the
// music-theory monolith, which would create runtime import cycles.
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]
