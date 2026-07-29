'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { STANDARD_TUNING, getProgressionsForScale, type Note } from '@/lib/music-theory'
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
  mode: PracticeMode
  scaleDirection: ScaleDirection
  triadStringSetIndex: number
  selectedProgression: string
  bpm: number
  metronomeOn: boolean
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState<number | null>(null)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const schedulerRef = useRef<LookaheadScheduler | null>(null)
  const bpmRef = useRef(DEFAULT_BPM)
  const metronomeRef = useRef(true)

  const tuning = STANDARD_TUNING
  const triadStringSets = useMemo(() => getTriadStringSets(tuning.length), [tuning])

  const steps = useMemo(
    () =>
      buildPracticeSequence({
        mode,
        rootNote,
        scale,
        position,
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
      position,
      tuning,
      scaleDirection,
      triadStringSets,
      triadStringSetIndex,
      selectedProgression,
    ]
  )

  const activeNotes = useMemo(() => {
    if (currentStep === null || !steps[currentStep]) return new Set<string>()
    return new Set(
      steps[currentStep].notes.map(({ stringIndex, fret }) => `${stringIndex}-${fret}`)
    )
  }, [currentStep, steps])

  const currentLabel =
    currentStep !== null ? (steps[currentStep]?.label ?? null) : null

  const stop = useCallback(() => {
    schedulerRef.current?.stop()
    schedulerRef.current = null
    setIsPlaying(false)
    setCurrentStep(null)
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
          if (!step) return
          const duration = step.durationBeats * secondsPerBeat * NOTE_DURATION_RATIO

          step.notes.forEach(({ stringIndex, fret }, noteIndex) => {
            const startTime = step.strum
              ? audioTime + noteIndex * STRUM_STAGGER_SEC
              : audioTime
            playPluck(ctx, startTime, getFrequency(tuning, stringIndex, fret), duration)
          })
        },
        onScheduleBeat: (beatInBar, audioTime) => {
          playClick(ctx, audioTime, beatInBar === 0)
        },
        onStepChange: (stepIndex) => {
          setCurrentStep(stepIndex < 0 ? null : stepIndex)
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
    mode,
    scaleDirection,
    triadStringSetIndex,
    selectedProgression,
    bpm,
    metronomeOn,
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
