'use client'

import { useState, useCallback, useMemo } from 'react'
import { Note, SCALE_NAMES, SCALES, getDefaultTuning } from '@/lib/music-theory'
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

  // Handlers
  const handleScaleChange = useCallback((newScale: string) => {
    setScale(newScale)
    setPosition(null)
    announce(`Scale changed to ${SCALE_NAMES[newScale]}, position reset`)
  }, [announce])

  const handleRootChange = useCallback((newRoot: Note) => {
    setRootNote(newRoot)
    announce(`Root note changed to ${newRoot}`)
  }, [announce])

  const handlePositionChange = useCallback((newPosition: number | null) => {
    setPosition(newPosition)
    if (newPosition === null) {
      announce('Showing all positions')
    } else {
      announce(`Position ${newPosition + 1} selected`)
    }
  }, [announce])

  const handleStringCountChange = useCallback((count: number) => {
    setStringCount(count)
    setTuning(getDefaultTuning(count))
  }, [])

  const handleChordsModeToggle = useCallback((enabled: boolean) => {
    setShowChordsMode(enabled)
    if (enabled) {
      setShowProgressionMode(false)
    }
  }, [])

  const handleProgressionModeToggle = useCallback((enabled: boolean) => {
    setShowProgressionMode(enabled)
    if (enabled) {
      setShowChordsMode(false)
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
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const rootIndex = noteNames.indexOf(rootNote)
    return scaleFormula.map((interval) =>
      noteNames[(rootIndex + interval) % 12]
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
    announcement,

    // Handlers
    handleScaleChange,
    handleRootChange,
    handlePositionChange,
    handleStringCountChange,
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
