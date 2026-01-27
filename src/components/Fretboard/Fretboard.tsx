'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import {
  Note,
  STANDARD_TUNING,
  SCALES,
  SCALE_POSITIONS,
  getNoteAtFret,
  isNoteInScale,
  getInterval,
  getScaleDegree,
  getRootFret,
  getChordIntervals,
  getChordVoicing,
  getAllChordVoicings,
  ChordVoicing,
  getProgressionChordVoicing,
  getAllProgressionChordVoicings,
  getChordRootForDegree,
  getChordQuality,
  CHORD_PROGRESSIONS,
} from '@/lib/music-theory'

// Import extracted components
import { NoteMarker } from './NoteMarker'
import { FretMarker } from './FretMarker'

// Import styles
import {
  fretboardStyles,
  scrollIndicatorStyles,
  stringLabelStyles,
  nutStyles,
  fretStyles,
  noteMarkerStyles,
  legendStyles,
  legendColors,
  emptyStateStyles,
  mobileHintStyles,
  inlineStyles,
} from './Fretboard.styles'

type DisplayMode = 'notes' | 'intervals' | 'degrees'
type ProgressionViewMode = 'chord' | 'scale'

export interface FretboardProps {
  rootNote: Note
  scale: string
  tuning?: Note[]
  frets?: number
  displayMode?: DisplayMode
  showOnlyChordTones?: boolean
  showChordsMode?: boolean
  showProgressionMode?: boolean
  selectedProgression?: string | null
  showFingerings?: boolean
  progressionViewMode?: ProgressionViewMode
  position?: number | null // null means show all positions
  onNoteClick?: (note: Note, string: number, fret: number) => void
}

export default function Fretboard({
  rootNote,
  scale,
  tuning = STANDARD_TUNING,
  frets = 24,
  displayMode = 'notes',
  showOnlyChordTones = false,
  showChordsMode = false,
  showProgressionMode = false,
  selectedProgression = null,
  showFingerings = true,
  progressionViewMode = 'chord',
  position = null,
  onNoteClick,
}: FretboardProps) {
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set())
  const leftIndicatorRef = useRef<HTMLDivElement>(null)
  const rightIndicatorRef = useRef<HTMLDivElement>(null)
  const scaleFormula = SCALES[scale] || SCALES.major
  const positions = SCALE_POSITIONS[scale] || SCALE_POSITIONS.minorPentatonic

  // Determine the effective root note for display
  // In progression scale mode, use the chord's root; otherwise use the scale root
  let effectiveRootNote = rootNote
  if (showProgressionMode && selectedProgression && progressionViewMode === 'scale' && position !== null) {
    const progression = CHORD_PROGRESSIONS[selectedProgression]
    if (progression) {
      const scaleQuality = getChordQuality(scale)
      const degrees = scaleQuality === 'minor' ? progression.degreesMinor : progression.degreesMajor
      const chordDegree = degrees[position % degrees.length]
      effectiveRootNote = getChordRootForDegree(rootNote, scale, chordDegree)
    }
  }

  const rootFret = getRootFret(effectiveRootNote, tuning)

  // Get chord intervals based on scale quality (major or minor)
  const chordIntervals = getChordIntervals(scale)
  // For R-3-5 filter mode, include both major and minor 3rds
  const r35Intervals = [0, 3, 4, 7]

  // Get chord voicing(s) for chord mode or progression mode (only when in chord view)
  const chordVoicings = (showChordsMode || (showProgressionMode && progressionViewMode === 'chord'))
    ? showProgressionMode && selectedProgression
      ? position !== null
        ? [getProgressionChordVoicing(rootNote, scale, position, selectedProgression, tuning)].filter(Boolean) as ChordVoicing[]
        : getAllProgressionChordVoicings(rootNote, scale, selectedProgression, tuning)
      : position !== null
        ? [getChordVoicing(rootNote, scale, position, tuning)].filter(Boolean) as ChordVoicing[]
        : getAllChordVoicings(rootNote, scale, tuning)
    : []

  // Helper to check if a note is part of any chord voicing and get its finger number
  const getChordInfo = useCallback((stringIndex: number, fret: number): {
    shouldShow: boolean
    fingerNumber?: number | null
    isMuted?: boolean
  } => {
    if ((!showChordsMode && !showProgressionMode) || chordVoicings.length === 0) {
      return { shouldShow: false }
    }

    for (const voicing of chordVoicings) {
      const fretValue = voicing.frets[stringIndex]

      // Check for muted string
      if (fretValue === 'x') {
        return { shouldShow: true, isMuted: true }
      }

      // Check if this fret matches the voicing
      if (fretValue === fret) {
        const fingerNumber = voicing.fingers[stringIndex]
        return { shouldShow: true, fingerNumber, isMuted: false }
      }
    }

    return { shouldShow: false }
  }, [showChordsMode, showProgressionMode, chordVoicings])

  // Check if a fret is within the current position
  const isInPosition = useCallback((fret: number): boolean => {
    if (position === null) return true // Show all
    const pos = positions[position]
    if (!pos) return true

    // Calculate the actual fret range based on root note position
    const startFret = rootFret + pos.start
    const endFret = rootFret + pos.end

    // Handle the primary position range (clamp startFret to 0 minimum)
    const effectiveStart = Math.max(0, startFret)
    if (fret >= effectiveStart && fret <= endFret) return true

    // Handle wrapping at fret 12 (octave) for positions that extend beyond
    if (startFret + 12 <= frets && fret >= startFret + 12 && fret <= endFret + 12) return true

    // Handle negative start positions that wrap from fret 12
    // e.g., if startFret is -3, also check frets 9-12 (12 + (-3) = 9)
    if (startFret < 0) {
      const wrappedStart = 12 + startFret
      const wrappedEnd = 12 + pos.end
      if (fret >= wrappedStart && fret <= wrappedEnd) return true
    }

    return false
  }, [position, positions, rootFret, frets])

  // Detect if any notes are visible with current R-3-5 filter
  const hasVisibleNotes = useMemo(() => {
    // Only check when R-3-5 filter is active
    if (!showOnlyChordTones) return true

    // Skip check in chord/progression chord mode - they have their own logic
    if (showChordsMode || (showProgressionMode && progressionViewMode === 'chord')) {
      return true
    }

    // Check all strings and frets for notes that match the filter criteria
    for (let stringIndex = 0; stringIndex < tuning.length; stringIndex++) {
      // Check open string (fret 0)
      const openNote = tuning[tuning.length - 1 - stringIndex]
      const openInScale = isNoteInScale(openNote, effectiveRootNote, scaleFormula)
      const openInterval = getInterval(effectiveRootNote, openNote)
      const openIsR35Tone = r35Intervals.includes(openInterval)
      const openInPosition = isInPosition(0)

      if (openInScale && openIsR35Tone && openInPosition) {
        return true
      }

      // Check fretted notes
      for (let fret = 1; fret <= frets; fret++) {
        const note = getNoteAtFret(tuning[tuning.length - 1 - stringIndex], fret)
        const inScale = isNoteInScale(note, effectiveRootNote, scaleFormula)
        const interval = getInterval(effectiveRootNote, note)
        const isR35Tone = r35Intervals.includes(interval)
        const inPosition = isInPosition(fret)

        if (inScale && isR35Tone && inPosition) {
          return true
        }
      }
    }

    return false
  }, [showOnlyChordTones, showChordsMode, showProgressionMode, progressionViewMode, tuning, effectiveRootNote, scaleFormula, r35Intervals, isInPosition, frets])

  const handleNoteClick = useCallback((note: Note, stringIndex: number, fret: number) => {
    const key = `${stringIndex}-${fret}`
    setSelectedNotes(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
    onNoteClick?.(note, stringIndex, fret)
  }, [onNoteClick])

  // Show empty state if R-3-5 filter is active but no notes match
  if (showOnlyChordTones && !hasVisibleNotes) {
    return (
      <div className={emptyStateStyles.container}>
        <div className={emptyStateStyles.content}>
          <div className={emptyStateStyles.iconWrapper}>
            <div className={emptyStateStyles.iconCircle}>
              <svg
                className={emptyStateStyles.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15 Q12 11 16 15" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className={emptyStateStyles.heading}>
              No notes match current filter
            </h3>
            <p className={emptyStateStyles.description}>
              The R-3-5 filter shows only root, third, and fifth notes. Try selecting a different position or disabling the filter.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Reverse tuning for display (high E at top)
  const displayTuning = [...tuning].reverse()

  return (
    <div className={fretboardStyles.wrapper}>
      {/* Scroll indicator gradients */}
      <div
        ref={leftIndicatorRef}
        className={scrollIndicatorStyles.left}
      />
      <div
        ref={rightIndicatorRef}
        className={scrollIndicatorStyles.right}
      />

      <div
        className={fretboardStyles.scrollContainer}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          if (leftIndicatorRef.current) {
            leftIndicatorRef.current.style.opacity = target.scrollLeft > 20 ? '1' : '0'
          }
          if (rightIndicatorRef.current) {
            rightIndicatorRef.current.style.opacity =
              target.scrollLeft < target.scrollWidth - target.clientWidth - 20 ? '1' : '0'
          }
        }}
      >
        <div className={fretboardStyles.innerContainer}>
        {/* Fretboard container */}
        <div className={fretboardStyles.fretboardContainer} style={inlineStyles.fretboardBackground}>
          {/* String labels */}
          <div className={stringLabelStyles.container}>
            {displayTuning.map((note, i) => (
              <div key={i} className={stringLabelStyles.label}>
                <span role="text" aria-label={`String ${tuning.length - i}`}>
                  {tuning.length - i}
                </span>
              </div>
            ))}
          </div>

          {/* Main fretboard area */}
          <div className={fretboardStyles.mainArea}>
            {/* Nut (open strings) */}
            <div className={nutStyles.container}>
              {displayTuning.map((openNote, stringIndex) => {
                const actualStringIndex = tuning.length - 1 - stringIndex
                const note = openNote
                const inScale = isNoteInScale(note, effectiveRootNote, scaleFormula)
                const interval = getInterval(effectiveRootNote, note)
                const degree = getScaleDegree(note, effectiveRootNote, scaleFormula)
                const isRoot = note === effectiveRootNote
                const key = `${actualStringIndex}-0`
                const inPosition = isInPosition(0)

                // Check chord voicing info for chord mode
                const chordInfo = getChordInfo(actualStringIndex, 0)

                // Determine if note should be shown based on mode
                const isR35Tone = r35Intervals.includes(interval)
                const shouldShow = showChordsMode || (showProgressionMode && progressionViewMode === 'chord')
                  ? chordInfo.shouldShow  // Chords/Progression chord mode: only notes in voicing
                  : (!showOnlyChordTones || isR35Tone) && inPosition  // Normal mode or progression scale mode: respect R-3-5 filter

                return (
                  <NoteMarker
                    key={stringIndex}
                    note={note}
                    isRoot={isRoot}
                    inScale={shouldShow && inScale}
                    interval={interval}
                    degree={degree}
                    displayMode={displayMode}
                    isNut={true}
                    onClick={() => handleNoteClick(note, actualStringIndex, 0)}
                    isSelected={selectedNotes.has(key)}
                    fingerNumber={chordInfo.fingerNumber}
                    isMuted={chordInfo.isMuted}
                    showFingerings={showFingerings}
                  />
                )
              })}
            </div>

            {/* Frets */}
            {Array.from({ length: frets }, (_, fretIndex) => {
              const fret = fretIndex + 1
              return (
                <div
                  key={fret}
                  className={fretStyles.column}
                  style={inlineStyles.getFretWidth(fretIndex)}
                >
                  {/* Fret number */}
                  <div className={fretStyles.number}>
                    {fret}
                  </div>

                  {/* Fret marker dots */}
                  <FretMarker fret={fret} />

                  {/* Strings with notes */}
                  {displayTuning.map((openNote, stringIndex) => {
                    const actualStringIndex = tuning.length - 1 - stringIndex
                    const note = getNoteAtFret(openNote, fret)
                    const inScale = isNoteInScale(note, effectiveRootNote, scaleFormula)
                    const interval = getInterval(effectiveRootNote, note)
                    const degree = getScaleDegree(note, effectiveRootNote, scaleFormula)
                    const isRoot = note === effectiveRootNote
                    const key = `${actualStringIndex}-${fret}`
                    const inPosition = isInPosition(fret)

                    // Check chord voicing info for chord mode
                    const chordInfo = getChordInfo(actualStringIndex, fret)

                    // Determine if note should be shown based on mode
                    const isR35Tone = r35Intervals.includes(interval)
                    const shouldShow = showChordsMode || (showProgressionMode && progressionViewMode === 'chord')
                      ? chordInfo.shouldShow  // Chords/Progression chord mode: only notes in voicing
                      : (!showOnlyChordTones || isR35Tone) && inPosition  // Normal mode or progression scale mode: respect R-3-5 filter

                    return (
                      <div key={stringIndex} className={fretStyles.stringLineWrapper}>
                        {/* String line */}
                        <div
                          className={noteMarkerStyles.stringLine}
                          style={inlineStyles.getStringLineStyle(stringIndex)}
                        />
                        <NoteMarker
                          note={note}
                          isRoot={isRoot}
                          inScale={shouldShow && inScale}
                          interval={interval}
                          degree={degree}
                          displayMode={displayMode}
                          onClick={() => handleNoteClick(note, actualStringIndex, fret)}
                          isSelected={selectedNotes.has(key)}
                          fingerNumber={chordInfo.fingerNumber}
                          isMuted={chordInfo.isMuted}
                          showFingerings={showFingerings}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className={legendStyles.container}>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.root}`} />
            <span className={legendStyles.label}>Root</span>
          </div>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.third}`} />
            <span className={legendStyles.label}>3rd</span>
          </div>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.fifth}`} />
            <span className={legendStyles.label}>5th</span>
          </div>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.seventh}`} />
            <span className={legendStyles.label}>7th</span>
          </div>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.blueNote}`} />
            <span className={legendStyles.label}>Blue Note</span>
          </div>
          <div className={legendStyles.item}>
            <div className={`${legendStyles.colorDot} ${legendColors.scaleNote}`} />
            <span className={legendStyles.label}>Scale Note</span>
          </div>
        </div>

      </div>

      {/* Mobile scroll hint */}
      <div className={mobileHintStyles.hint}>
        ← Swipe to see more frets →
      </div>
      </div>
    </div>
  )
}
