'use client'

import { useState, useCallback, useMemo } from 'react'
import { CHORD_QUALITY_LABELS, Note, NOTES, SCALE_NAMES, SCALES, STANDARD_TUNING, TUNINGS, getChordQuality, getChordVoicingCountForTuning, getDefaultTuning, getProgressionsForScale, type ChordQuality } from '@/lib/music-theory'
import { useAnnouncements } from './useAnnouncements'

type DisplayMode = 'notes' | 'intervals' | 'degrees'
type ProgressionViewMode = 'chord' | 'scale'

export function useFretboardApp() {
  const { announcement, announce } = useAnnouncements()

  // Core state
  const [rootNote, setRootNote] = useState<Note>('A')
  const [scale, setScale] = useState('minorPentatonic')
  const [stringCount, setStringCount] = useState(6)
  const [tuning, setTuning] = useState('standard')
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes')
  const [position, setPosition] = useState<number | null>(null)

  // Feature toggles
  const [showOnlyChordTones, setShowOnlyChordTones] = useState(false)
  const [showChordsMode, setShowChordsMode] = useState(false)
  const [showProgressionMode, setShowProgressionMode] = useState(false)
  const [selectedProgression, setSelectedProgression] = useState<string | null>(null)
  const [showFingerings, setShowFingerings] = useState(true)
  const [progressionViewMode, setProgressionViewMode] = useState<ProgressionViewMode>('chord')
  // Explicit chord-type selection for chords mode; null follows the scale
  const [chordQualityOverride, setChordQualityOverride] = useState<ChordQuality | null>(null)

  const chordQuality = chordQualityOverride ?? getChordQuality(scale)

  // Handlers
  const handleScaleChange = useCallback((newScale: string) => {
    setScale(newScale)
    setPosition(null)
    // A mode-specific progression may not apply to the new scale's mode
    setSelectedProgression((current) =>
      current && getProgressionsForScale(newScale).some(([key]) => key === current)
        ? current
        : null
    )
    announce(`Scale changed to ${SCALE_NAMES[newScale]}, position reset`)
  }, [announce])

  const handleRootChange = useCallback((newRoot: Note) => {
    setRootNote(newRoot)
    // Chord-mode positions index voicings, whose count can differ per chord
    if (showChordsMode) {
      setPosition((current) => {
        if (current === null) return current
        const count = getChordVoicingCountForTuning(
          newRoot,
          chordQuality,
          TUNINGS[tuning] ?? STANDARD_TUNING
        )
        return count > 0 ? Math.min(current, count - 1) : null
      })
    }
    announce(`Root note changed to ${newRoot}`)
  }, [announce, showChordsMode, chordQuality, tuning])

  const handlePositionChange = useCallback((newPosition: number | null) => {
    setPosition(newPosition)
    if (newPosition === null) {
      announce('Showing all positions')
    } else {
      announce(`Position ${newPosition + 1} selected`)
    }
  }, [announce])

  // Clamp a chord-mode voicing index against the voicing count for a tuning
  const clampPositionForTuning = useCallback(
    (tuningKey: string, quality: ChordQuality = chordQuality) => {
      setPosition((current) => {
        if (current === null) return current
        const count = getChordVoicingCountForTuning(
          rootNote,
          quality,
          TUNINGS[tuningKey] ?? STANDARD_TUNING
        )
        return count > 0 ? Math.min(current, count - 1) : null
      })
    },
    [rootNote, chordQuality]
  )

  const handleStringCountChange = useCallback((count: number) => {
    const defaultTuning = getDefaultTuning(count)
    setStringCount(count)
    setTuning(defaultTuning)
    if (showChordsMode) {
      clampPositionForTuning(defaultTuning)
    }
  }, [showChordsMode, clampPositionForTuning])

  const handleTuningChange = useCallback((newTuning: string) => {
    setTuning(newTuning)
    if (showChordsMode) {
      clampPositionForTuning(newTuning)
    }
  }, [showChordsMode, clampPositionForTuning])

  const handleChordQualityChange = useCallback((quality: ChordQuality) => {
    setChordQualityOverride(quality)
    // Voicing counts differ per chord type, so re-clamp the voicing index
    clampPositionForTuning(tuning, quality)
    announce(`Chord type changed to ${CHORD_QUALITY_LABELS[quality]}`)
  }, [announce, clampPositionForTuning, tuning])

  const handleChordsModeToggle = useCallback((enabled: boolean) => {
    setShowChordsMode(enabled)
    if (enabled) {
      setShowProgressionMode(false)
      setShowOnlyChordTones(false)
      // Scale positions (up to 7) may exceed the voicing count
      clampPositionForTuning(tuning)
    }
  }, [tuning, clampPositionForTuning])

  const handleProgressionModeToggle = useCallback((enabled: boolean) => {
    setShowProgressionMode(enabled)
    if (enabled) {
      setShowChordsMode(false)
      setShowOnlyChordTones(false)
    }
  }, [])

  const handleToggleDisplayMode = useCallback(() => {
    const modes: DisplayMode[] = ['notes', 'intervals', 'degrees']
    const currentIndex = modes.indexOf(displayMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setDisplayMode(nextMode)
    announce(`Display mode changed to ${nextMode}`)
  }, [displayMode, announce])

  const handleToggleChordsMode = useCallback(() => {
    const newValue = !showChordsMode
    handleChordsModeToggle(newValue)
    announce(newValue ? 'Chords mode enabled' : 'Chords mode disabled')
  }, [showChordsMode, handleChordsModeToggle, announce])

  // Derived values
  const scaleFormula = SCALES[scale] || SCALES.minorPentatonic

  const scaleNotes = useMemo(() => {
    const rootIndex = NOTES.indexOf(rootNote)
    
    return scaleFormula.map((interval) =>
      NOTES[(rootIndex + interval) % 12]
    )
  }, [rootNote, scaleFormula])

  return {
    // State
    rootNote,
    scale,
    stringCount,
    tuning,
    displayMode,
    position,
    showOnlyChordTones,
    showChordsMode,
    showProgressionMode,
    selectedProgression,
    showFingerings,
    progressionViewMode,
    chordQuality,
    announcement,

    // Handlers
    handleScaleChange,
    handleRootChange,
    handlePositionChange,
    handleStringCountChange,
    handleTuningChange,
    handleChordQualityChange,
    handleChordsModeToggle,
    handleProgressionModeToggle,
    handleToggleDisplayMode,
    handleToggleChordsMode,
    setTuning,
    setDisplayMode,
    setShowOnlyChordTones,
    setSelectedProgression,
    setShowFingerings,
    setProgressionViewMode,

    // Derived
    scaleNotes,
    scaleFormula,
  }
}

export type UseFretboardAppReturn = ReturnType<typeof useFretboardApp>
