// Generates src/lib/chord-shapes.ts from @tombatossals/chords-db (MIT).
//
// Converts chords-db's relative-fret positions into the Uberchord API wire
// format (https://api.uberchord.com — {strings, fingering, tones, chordName})
// so the app's chord data stays drop-in compatible with that API.
//
// Run: node scripts/generate-chord-shapes.mjs

import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const db = require('@tombatossals/chords-db/lib/guitar.json')

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// chords-db object keys use 'sharp' spellings and flats for Eb/Ab/Bb;
// the app uses sharps exclusively
const KEY_TO_APP_NOTE = {
  C: 'C', Csharp: 'C#', D: 'D', Eb: 'D#', E: 'E', F: 'F',
  Fsharp: 'F#', G: 'G', Ab: 'G#', A: 'A', Bb: 'A#', B: 'B',
}

const QUALITIES = ['major', 'minor', '7', 'maj7', 'm7', 'm7b5']

// Uberchord chordName is "root,quality,tension,bass"
const UBERCHORD_NAME_PARTS = {
  major: ['', ''],
  minor: ['m', ''],
  '7': ['', '7'],
  maj7: ['maj', '7'],
  m7: ['m', '7'],
  m7b5: ['m', '7b5'],
}

function assert(condition, message) {
  if (!condition) {
    console.error(`ASSERTION FAILED: ${message}`)
    process.exit(1)
  }
}

// chords-db frets are relative to baseFret: 0 = open, -1 = muted,
// n >= 1 sounds at absolute fret n + baseFret - 1 (verified against the
// dataset's own midi values below)
function toAbsoluteFret(fret, baseFret) {
  if (fret === -1) return 'X'
  if (fret === 0) return 0
  return fret + baseFret - 1
}

const STANDARD_MIDI = [40, 45, 50, 55, 59, 64] // E2 A2 D3 G3 B3 E4

function convertPosition(position) {
  const { frets, fingers, baseFret, midi } = position
  assert(frets.length === 6 && fingers.length === 6, 'position must have 6 strings')

  const absolute = frets.map((fret) => toAbsoluteFret(fret, baseFret))

  // Validate the relative→absolute expansion against the dataset's midi values
  const sounded = absolute.flatMap((fret, stringIndex) =>
    fret === 'X' ? [] : [STANDARD_MIDI[stringIndex] + fret]
  )
  assert(
    JSON.stringify(sounded) === JSON.stringify(midi),
    `fret expansion mismatch: computed ${sounded} vs midi ${midi}`
  )

  const strings = absolute.join(' ')
  const fingering = fingers
    .map((finger, i) => (absolute[i] === 'X' || finger === 0 ? 'X' : String(finger)))
    .join(' ')
  const tones = [...new Set(sounded.map((m) => NOTES[m % 12]))].join(',')

  return { strings, fingering, tones }
}

const shapes = {}
let voicingCount = 0

for (const [dbKey, appNote] of Object.entries(KEY_TO_APP_NOTE)) {
  const chordsForKey = db.chords[dbKey]
  assert(chordsForKey, `chords-db missing key ${dbKey}`)

  for (const quality of QUALITIES) {
    const chord = chordsForKey.find((c) => c.suffix === quality)
    assert(chord, `chords-db missing ${dbKey} ${quality}`)
    assert(chord.positions.length >= 2, `${dbKey} ${quality} has fewer than 2 voicings`)

    const [qualityPart, tensionPart] = UBERCHORD_NAME_PARTS[quality]
    const chordName = `${appNote},${qualityPart},${tensionPart},`

    // Order voicings ascending up the neck
    const positions = [...chord.positions].sort((a, b) => a.baseFret - b.baseFret)

    shapes[`${appNote}_${quality}`] = positions.map((position) => {
      voicingCount++
      return { ...convertPosition(position), chordName }
    })
  }
}

// Canonical-shape spot checks — fail loudly if the format assumption is wrong
assert(shapes.C_major[0].strings === 'X 3 2 0 1 0', `C major v1 wrong: ${shapes.C_major[0].strings}`)
assert(shapes.C_major[0].fingering === 'X 3 2 X 1 X', `C major v1 fingering wrong: ${shapes.C_major[0].fingering}`)
assert(shapes.A_minor[0].strings === 'X 0 2 2 1 0', `A minor v1 wrong: ${shapes.A_minor[0].strings}`)
assert(shapes.E_major[0].strings === '0 2 2 1 0 0', `E major v1 wrong: ${shapes.E_major[0].strings}`)
assert(shapes.C_major[0].tones === 'C,E,G', `C major tones wrong: ${shapes.C_major[0].tones}`)

const header = `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-chord-shapes.mjs
//
// Curated guitar chord voicings in the Uberchord API wire format
// (https://api.uberchord.com — strings/fingering are space-separated,
// low string first, X = muted; chordName is "root,quality,tension,bass").
// Source data: @tombatossals/chords-db (MIT, github.com/tombatossals/chords-db),
// converted from relative frets to absolute frets.

export interface UberchordVoicing {
  strings: string
  fingering: string
  tones: string
  chordName: string
}

export const CHORD_SHAPES: Record<string, UberchordVoicing[]> = `

const output = header + JSON.stringify(shapes, null, 2) + '\n'
const outPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'lib', 'chord-shapes.ts')
writeFileSync(outPath, output)
console.log(`Wrote ${Object.keys(shapes).length} chords (${voicingCount} voicings) to ${outPath}`)
