export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'] // low to high (6th to 1st string)

export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
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
  blues: 'Blues',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',
  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',
}

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7',
}

export const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
export const DOUBLE_MARKERS = [12, 24]

export function getNoteAtFret(openNote: Note, fret: number): Note {
  const startIndex = NOTES.indexOf(openNote)
  return NOTES[(startIndex + fret) % 12]
}

export function isNoteInScale(note: Note, rootNote: Note, scaleFormula: number[]): boolean {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  const interval = (noteIndex - rootIndex + 12) % 12
  return scaleFormula.includes(interval)
}

export function getInterval(rootNote: Note, note: Note): number {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  return (noteIndex - rootIndex + 12) % 12
}

export function getScaleDegree(note: Note, rootNote: Note, scaleFormula: number[]): number {
  const interval = getInterval(rootNote, note)
  return scaleFormula.indexOf(interval) + 1
}

export function getIntervalName(rootNote: Note, note: Note): string {
  const interval = getInterval(rootNote, note)
  return INTERVAL_NAMES[interval] || ''
}
