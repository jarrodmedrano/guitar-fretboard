'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  STANDARD_TUNING,
  getChordQuality,
  getChordVoicingCount,
  getProgressionsForScale,
  type Note,
} from '@/lib/music-theory'
import {
  buildPracticeSequence,
  type PracticeMode,
  type PracticeStep,
  type ScaleDirection,
} from '@/lib/practice-sequence'
import { getTriadStringSets } from '@/lib/triads'
import { getFrequency } from '@/lib/audio/frequencies'
import { playClick, playPluck } from '@/lib/audio/synth'
import { LookaheadScheduler } from '@/lib/audio/scheduler'

const MIN_BPM = 40
const MAX_BPM = 220
const DEFAULT_BPM = 80
const BEATS_PER_BAR = 4
const STRUM_STAGGER_SEC = 0.035
const NOTE_DURATION_RATIO = 0.95

export interface UsePracticeSessionReturn {
  rootNote: Note
  scale: string
  position: number
  effectivePosition: number
  mode: PracticeMode
  scaleDirection: ScaleDirection
  triadStringSetIndex: number
  selectedProgression: string
  bpm: number
  metronomeOn: boolean
  arpeggioOn: boolean
  showFingerings: boolean
  showOnlyChordTones: boolean
  isPlaying: boolean
  currentStep: number | null
  tuning: Note[]
  steps: PracticeStep[]
  activeNotes: Set<string>
  currentLabel: string | null
  triadStringSets: ReturnType<typeof getTriadStringSets>
  play: () => void
  stop: () => void
  togglePlay: () => void
  setBpm: (bpm: number) => void
  setMetronomeOn: (on: boolean) => void
  setArpeggioOn: (on: boolean) => void
  setShowFingerings: (show: boolean) => void
  setShowOnlyChordTones: (show: boolean) => void
  setMode: (mode: PracticeMode) => void
  setRootNote: (note: Note) => void
  setScale: (scale: string) => void
  setKey: (root: Note, scale: string) => void
  setPosition: (position: number) => void
  setScaleDirection: (direction: ScaleDirection) => void
  setTriadStringSetIndex: (index: number) => void
  setSelectedProgression: (progression: string) => void
}

export function usePracticeSession(): UsePracticeSessionReturn {
  const [rootNote, setRootNoteState] = useState<Note>('A')
  const [scale, setScaleState] = useState('minorPentatonic')
  const [position, setPositionState] = useState(0)
  const [mode, setModeState] = useState<PracticeMode>('scale')
  const [scaleDirection, setScaleDirectionState] = useState<ScaleDirection>('asc-desc')
  const [triadStringSetIndex, setTriadStringSetIndexState] = useState(0)
  const [selectedProgression, setSelectedProgressionState] = useState('1-4-5')
  const [bpm, setBpmState] = useState(DEFAULT_BPM)
  const [metronomeOn, setMetronomeOnState] = useState(true)
  const [arpeggioOn, setArpeggioOnState] = useState(false)
  // Display-only toggles (mirror the main page); changing them never stops playback
  const [showFingerings, setShowFingerings] = useState(true)
  const [showOnlyChordTones, setShowOnlyChordTones] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  // Which note of an arpeggiated step is sounding; null = whole step highlights
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const schedulerRef = useRef<LookaheadScheduler | null>(null)
  const bpmRef = useRef(DEFAULT_BPM)
  const metronomeRef = useRef(true)
  const arpeggioRef = useRef(false)

  const tuning = STANDARD_TUNING
  const triadStringSets = useMemo(() => getTriadStringSets(tuning.length), [tuning])

  // Chord mode indexes curated voicings, whose count differs from scale positions
  const effectivePosition = useMemo(() => {
    if (mode !== 'chord') return position
    const voicingCount = getChordVoicingCount(rootNote, getChordQuality(scale))
    return Math.min(position, Math.max(0, voicingCount - 1))
  }, [mode, position, rootNote, scale])

  const steps = useMemo(
    () =>
      buildPracticeSequence({
        mode,
        rootNote,
        scale,
        position: effectivePosition,
        tuning,
        direction: scaleDirection,
        triadStringSet:
          triadStringSets[triadStringSetIndex]?.stringIndices ??
          triadStringSets[0].stringIndices,
        progression: selectedProgression,
      }),
    [
      mode,
      rootNote,
      scale,
      effectivePosition,
      tuning,
      scaleDirection,
      triadStringSets,
      triadStringSetIndex,
      selectedProgression,
    ]
  )

  const activeNotes = useMemo(() => {
    if (currentStep === null || !steps[currentStep]) return new Set<string>()
    const stepNotes = steps[currentStep].notes

    if (currentNoteIndex !== null && stepNotes[currentNoteIndex]) {
      const { stringIndex, fret } = stepNotes[currentNoteIndex]
      return new Set([`${stringIndex}-${fret}`])
    }

    return new Set(stepNotes.map(({ stringIndex, fret }) => `${stringIndex}-${fret}`))
  }, [currentStep, currentNoteIndex, steps])

  const currentLabel =
    currentStep !== null ? (steps[currentStep]?.label ?? null) : null

  const stop = useCallback(() => {
    schedulerRef.current?.stop()
    schedulerRef.current = null
    setIsPlaying(false)
    setCurrentStep(null)
    setCurrentNoteIndex(null)
  }, [])

  const play = useCallback(() => {
    if (steps.length === 0) return
    schedulerRef.current?.stop()

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      void ctx.resume()
    }

    const scheduler = new LookaheadScheduler({ clock: ctx })
    schedulerRef.current = scheduler

    scheduler.start(
      steps.map((step, index) => ({ stepIndex: index, durationBeats: step.durationBeats })),
      {
        getBpm: () => bpmRef.current,
        metronome: () => metronomeRef.current,
        beatsPerBar: BEATS_PER_BAR,
        loop: true,
      },
      {
        onScheduleStep: (stepIndex, audioTime, secondsPerBeat) => {
          const step = steps[stepIndex]
          if (!step || step.notes.length === 0) return
          const stepDuration = step.durationBeats * secondsPerBeat
          const arpeggiate = step.strum && arpeggioRef.current
          // Arpeggio: spread the chord's notes evenly across the bar; each note
          // rings until the chord changes. Strum: quick low-to-high stagger.
          const noteSpacing = arpeggiate ? stepDuration / step.notes.length : STRUM_STAGGER_SEC

          step.notes.forEach(({ stringIndex, fret }, noteIndex) => {
            const offset = step.strum ? noteIndex * noteSpacing : 0
            const duration = (stepDuration - offset) * NOTE_DURATION_RATIO
            playPluck(ctx, audioTime + offset, getFrequency(tuning, stringIndex, fret), duration)

            if (arpeggiate) {
              scheduler.enqueueUiEvent(audioTime + offset, () => setCurrentNoteIndex(noteIndex))
            }
          })
        },
        onScheduleBeat: (beatInBar, audioTime) => {
          playClick(ctx, audioTime, beatInBar === 0)
        },
        onStepChange: (stepIndex) => {
          setCurrentStep(stepIndex < 0 ? null : stepIndex)
          // Reset per-note tracking at each step boundary; a same-tick arpeggio
          // note event (flushed after step changes) re-sets it to note 0
          setCurrentNoteIndex(null)
        },
      }
    )

    setIsPlaying(true)
  }, [steps, tuning])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }, [isPlaying, play, stop])

  const setBpm = useCallback((value: number) => {
    const clamped = Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)))
    bpmRef.current = clamped
    setBpmState(clamped)
  }, [])

  const setMetronomeOn = useCallback((on: boolean) => {
    metronomeRef.current = on
    setMetronomeOnState(on)
  }, [])

  const setArpeggioOn = useCallback((on: boolean) => {
    arpeggioRef.current = on
    setArpeggioOnState(on)
  }, [])

  // Material changes invalidate scheduled step indices, so playback stops first
  const stopThen = useCallback(
    <T,>(setter: (value: T) => void) =>
      (value: T) => {
        stop()
        setter(value)
      },
    [stop]
  )

  const setMode = useMemo(() => stopThen(setModeState), [stopThen])
  const setRootNote = useMemo(() => stopThen(setRootNoteState), [stopThen])
  const setPosition = useMemo(() => stopThen(setPositionState), [stopThen])

  // Scale changes also validate the progression: a mode-specific progression
  // may not apply to the new scale's mode
  const setScale = useCallback(
    (newScale: string) => {
      stop()
      setScaleState(newScale)
      setSelectedProgressionState((current) =>
        getProgressionsForScale(newScale).some(([key]) => key === current) ? current : '1-4-5'
      )
    },
    [stop]
  )

  const setKey = useCallback(
    (root: Note, newScale: string) => {
      setRootNoteState(root)
      setScale(newScale)
    },
    [setScale]
  )
  const setScaleDirection = useMemo(() => stopThen(setScaleDirectionState), [stopThen])
  const setTriadStringSetIndex = useMemo(() => stopThen(setTriadStringSetIndexState), [stopThen])
  const setSelectedProgression = useMemo(() => stopThen(setSelectedProgressionState), [stopThen])

  useEffect(() => {
    return () => {
      schedulerRef.current?.stop()
      void audioCtxRef.current?.close()
    }
  }, [])

  return {
    rootNote,
    scale,
    position,
    effectivePosition,
    mode,
    scaleDirection,
    triadStringSetIndex,
    selectedProgression,
    bpm,
    metronomeOn,
    arpeggioOn,
    showFingerings,
    showOnlyChordTones,
    isPlaying,
    currentStep,
    tuning,
    steps,
    activeNotes,
    currentLabel,
    triadStringSets,
    play,
    stop,
    togglePlay,
    setBpm,
    setMetronomeOn,
    setArpeggioOn,
    setShowFingerings,
    setShowOnlyChordTones,
    setMode,
    setRootNote,
    setScale,
    setKey,
    setPosition,
    setScaleDirection,
    setTriadStringSetIndex,
    setSelectedProgression,
  }
}
