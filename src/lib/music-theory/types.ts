// src/lib/music-theory/types.ts
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

export type InstrumentType = '4-string' | '6-string' | '7-string' | '8-string'

export const CAGED_SHAPES = ['C', 'A', 'G', 'E', 'D'] as const
export type CAGEDShape = typeof CAGED_SHAPES[number]

export interface TuningConfig {
  notes: Note[]
  name: string
  stringCount: number
}

export interface ChordVoicing {
  frets: (number | 'x')[]
  fingers: (number | null)[]
  baseFret: number
  barre?: number
  shape: CAGEDShape
  rootString: number
  rootFret: number
}

export interface ScalePosition {
  start: number
  end: number
  name?: string
}

export interface ChordProgression {
  name: string
  degreesMajor: number[]
  degreesMinor: number[]
}
