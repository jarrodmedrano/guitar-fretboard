import { describe, it, expect } from 'vitest'
import { buildPracticeSequence, type PracticeStep } from './practice-sequence'
import { getStringMidiNotes } from './audio/frequencies'
import {
  STANDARD_TUNING,
  SCALES,
  SCALE_POSITIONS,
  getRootFret,
  getNoteAtFret,
  isNoteInScale,
} from '@/lib/music-theory'

const baseOpts = {
  rootNote: 'A' as const,
  scale: 'minorPentatonic',
  position: 0,
  tuning: STANDARD_TUNING,
  direction: 'asc' as const,
  triadStringSet: [3, 4, 5] as [number, number, number],
  progression: '1-4-5',
}

function getPitches(steps: PracticeStep[]): number[] {
  const midiNotes = getStringMidiNotes(STANDARD_TUNING)
  return steps.map((step) => midiNotes[step.notes[0].stringIndex] + step.notes[0].fret)
}

describe('buildPracticeSequence — scale mode', () => {
  it('produces single-note, one-beat, non-strummed steps', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'scale' })
    expect(steps.length).toBeGreaterThan(0)
    steps.forEach((step) => {
      expect(step.notes).toHaveLength(1)
      expect(step.durationBeats).toBe(1)
      expect(step.strum).toBe(false)
    })
  })

  it('produces strictly ascending pitches, all in scale and in position', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'scale' })
    const pitches = getPitches(steps)
    pitches.forEach((pitch, i) => {
      if (i > 0) expect(pitch).toBeGreaterThan(pitches[i - 1])
    })

    const formula = SCALES.minorPentatonic
    const rootFret = getRootFret('A', STANDARD_TUNING)
    const pos = SCALE_POSITIONS.minorPentatonic[0]
    steps.forEach((step) => {
      const { stringIndex, fret } = step.notes[0]
      const note = getNoteAtFret(STANDARD_TUNING[stringIndex], fret)
      expect(isNoteInScale(note, 'A', formula)).toBe(true)
      expect(fret).toBeGreaterThanOrEqual(Math.max(0, rootFret + pos.start))
      expect(fret).toBeLessThanOrEqual(rootFret + pos.end)
    })
  })

  it('labels scale steps with note names', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'scale' })
    expect(steps[0].label).toBe('A')
  })

  it('asc-desc appends the reverse without doubling apex or bottom', () => {
    const asc = buildPracticeSequence({ ...baseOpts, mode: 'scale' })
    const both = buildPracticeSequence({ ...baseOpts, mode: 'scale', direction: 'asc-desc' })
    expect(both.length).toBe(asc.length * 2 - 2)
    const pitches = getPitches(both)
    expect(pitches.slice(asc.length)).toEqual(
      getPitches(asc).slice(1, asc.length - 1).reverse()
    )
  })
})

describe('buildPracticeSequence — chord mode', () => {
  it('produces one strummed four-beat step with no muted strings', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'chord' })
    expect(steps).toHaveLength(1)
    expect(steps[0].strum).toBe(true)
    expect(steps[0].durationBeats).toBe(4)
    expect(steps[0].notes.length).toBeGreaterThanOrEqual(3)
    steps[0].notes.forEach(({ fret }) => {
      expect(fret).toBeGreaterThanOrEqual(0)
      expect(fret).toBeLessThanOrEqual(24)
    })
  })

  it('uses the explicit chord quality for notes and label', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'chord', chordQuality: 'sus4' })
    expect(steps).toHaveLength(1)
    expect(steps[0].label).toMatch(/^Asus4/)

    // A sus4 = A, D, E (pitch classes 9, 2, 4)
    const midiNotes = getStringMidiNotes(STANDARD_TUNING)
    const allowed = new Set([9, 2, 4])
    steps[0].notes.forEach(({ stringIndex, fret }) => {
      expect(allowed.has((midiNotes[stringIndex] + fret) % 12)).toBe(true)
    })
  })

  it('falls back to the scale-derived quality when no chord quality is given', () => {
    const implicit = buildPracticeSequence({ ...baseOpts, mode: 'chord' })
    const explicit = buildPracticeSequence({ ...baseOpts, mode: 'chord', chordQuality: 'minor' })
    expect(implicit).toEqual(explicit)
    expect(implicit[0].label).toMatch(/^Am/)
  })
})

describe('buildPracticeSequence — triad mode', () => {
  it('produces up to three strummed inversion steps sorted up the neck', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'triad' })
    expect(steps.length).toBeGreaterThanOrEqual(2)
    expect(steps.length).toBeLessThanOrEqual(3)
    steps.forEach((step) => {
      expect(step.notes).toHaveLength(3)
      expect(step.strum).toBe(true)
      expect(step.durationBeats).toBe(4)
    })
    const lowestFrets = steps.map((step) => Math.min(...step.notes.map((n) => n.fret)))
    lowestFrets.forEach((fret, i) => {
      if (i > 0) expect(fret).toBeGreaterThanOrEqual(lowestFrets[i - 1])
    })
  })

  it('labels inversions', () => {
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'triad' })
    const labels = steps.map((step) => step.label)
    expect(labels).toContain('Am — Root position')
  })
})

describe('buildPracticeSequence — progression mode', () => {
  it('produces one strummed bar per chord with chord-name labels', () => {
    const steps = buildPracticeSequence({
      ...baseOpts,
      mode: 'progression',
      scale: 'major',
    })
    expect(steps).toHaveLength(3)
    expect(steps.map((step) => step.label)).toEqual(['I — A', 'IV — D', 'V — E'])
    steps.forEach((step) => {
      expect(step.strum).toBe(true)
      expect(step.durationBeats).toBe(4)
      expect(step.notes.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('uses lowercase numerals for minor chords and shows borrowed major V', () => {
    const steps = buildPracticeSequence({
      ...baseOpts,
      mode: 'progression',
      scale: 'minor',
      progression: 'minor-1', // i–iv–V–i with borrowed major V
    })
    expect(steps.map((step) => step.label)).toEqual(['i — Am', 'iv — Dm', 'V — E', 'i — Am'])
  })

  it('keeps every chord voicing near the selected position window', () => {
    // A minor pentatonic position 1 spans frets 5–8; all three chords should
    // voice nearby instead of drifting up the neck with their progression index
    const steps = buildPracticeSequence({ ...baseOpts, mode: 'progression', position: 0 })
    expect(steps).toHaveLength(3)
    steps.forEach((step) => {
      const frettedNotes = step.notes.filter(({ fret }) => fret > 0)
      const lowestFret = Math.min(...frettedNotes.map(({ fret }) => fret))
      expect(lowestFret).toBeGreaterThanOrEqual(4)
      expect(lowestFret).toBeLessThanOrEqual(8)
    })
  })

  it('moves the whole progression up the neck at a higher position', () => {
    const minFret = (step: PracticeStep) =>
      Math.min(...step.notes.filter(({ fret }) => fret > 0).map(({ fret }) => fret))

    const low = buildPracticeSequence({ ...baseOpts, mode: 'progression', position: 0 })
    const high = buildPracticeSequence({ ...baseOpts, mode: 'progression', position: 4 })

    // Position changes the voicings, not the harmony
    expect(high.map((step) => step.label)).toEqual(low.map((step) => step.label))
    expect(minFret(high[0])).toBeGreaterThan(minFret(low[0]))
  })
})
