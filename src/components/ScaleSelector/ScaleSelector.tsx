'use client'

import { Note, NOTES, SCALES, SCALE_NAMES, INSTRUMENT_NAMES, getTuningsByStringCount, CHORD_PROGRESSIONS } from '@/lib/music-theory'
import { styles } from './ScaleSelector.styles'

type DisplayMode = 'notes' | 'intervals' | 'degrees'
type ProgressionViewMode = 'chord' | 'scale'

export interface ScaleSelectorProps {
  rootNote: Note
  scale: string
  stringCount: number
  tuning: string
  displayMode: DisplayMode
  showOnlyChordTones: boolean
  showChordsMode: boolean
  showProgressionMode: boolean
  selectedProgression: string | null
  showFingerings: boolean
  progressionViewMode: ProgressionViewMode
  onRootChange: (note: Note) => void
  onScaleChange: (scale: string) => void
  onStringCountChange: (count: number) => void
  onTuningChange: (tuning: string) => void
  onDisplayModeChange: (mode: DisplayMode) => void
  onChordTonesToggle: (show: boolean) => void
  onChordsModeToggle: (show: boolean) => void
  onProgressionModeToggle: (show: boolean) => void
  onProgressionSelect: (progression: string | null) => void
  onFingeringsToggle: (show: boolean) => void
  onProgressionViewModeChange: (mode: ProgressionViewMode) => void
}

const STRING_COUNTS = [4, 6, 7, 8] as const

export default function ScaleSelector({
  rootNote,
  scale,
  stringCount,
  tuning,
  displayMode,
  showOnlyChordTones,
  showChordsMode,
  showProgressionMode,
  selectedProgression,
  showFingerings,
  progressionViewMode,
  onRootChange,
  onScaleChange,
  onStringCountChange,
  onTuningChange,
  onDisplayModeChange,
  onChordTonesToggle,
  onChordsModeToggle,
  onProgressionModeToggle,
  onProgressionSelect,
  onFingeringsToggle,
  onProgressionViewModeChange,
}: ScaleSelectorProps) {
  // Get tunings filtered by current string count
  const availableTunings = getTuningsByStringCount(stringCount)

  return (
    <div className={styles.container}>
      {/* String Count / Instrument Selector */}
      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Instrument</label>
        <div className={styles.buttonGroup} role="group" aria-label="Select instrument">
          {STRING_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => onStringCountChange(count)}
              className={styles.flexButton(stringCount === count, 'purple')}
              aria-label={`Select instrument: ${INSTRUMENT_NAMES[`${count}-string` as keyof typeof INSTRUMENT_NAMES]}`}
              aria-pressed={stringCount === count}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Root Note Selector */}
      <div className={styles.fieldWrapper}>
        <label htmlFor="root-note-mobile" className={styles.label}>Root Note</label>

        {/* Mobile: Dropdown */}
        <select
          id="root-note-mobile"
          value={rootNote}
          onChange={(e) => onRootChange(e.target.value as Note)}
          className={styles.selectMobile}
          aria-label="Select root note"
        >
          {NOTES.map((note) => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>

        {/* Desktop: Buttons */}
        <div className={styles.buttonGroupDesktopOnly} role="group" aria-label="Select root note">
          {NOTES.map((note) => (
            <button
              key={note}
              onClick={() => onRootChange(note)}
              className={styles.desktopButton(rootNote === note, 'red')}
              aria-label={`Select root note: ${note}`}
              aria-pressed={rootNote === note}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Scale Selector */}
      <div className={styles.fieldWrapper}>
        <label htmlFor="scale-select" className={styles.label}>Scale</label>
        <select
          id="scale-select"
          value={scale}
          onChange={(e) => onScaleChange(e.target.value)}
          className={styles.select}
          aria-label="Select scale type"
        >
          {Object.keys(SCALES).map((scaleKey) => (
            <option key={scaleKey} value={scaleKey}>
              {SCALE_NAMES[scaleKey]}
            </option>
          ))}
        </select>
      </div>

      {/* Tuning Selector - filtered by string count */}
      <div className={styles.fieldWrapper}>
        <label htmlFor="tuning-select" className={styles.label}>Tuning</label>
        <select
          id="tuning-select"
          value={tuning}
          onChange={(e) => onTuningChange(e.target.value)}
          className={styles.select}
          aria-label="Select tuning"
        >
          {Object.entries(availableTunings).map(([tuningKey, config]) => (
            <option key={tuningKey} value={tuningKey}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Mode */}
      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Display</label>
        <div className={styles.buttonGroupWrap} role="group" aria-label="Select display mode">
          {(['notes', 'intervals', 'degrees'] as DisplayMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onDisplayModeChange(mode)}
              className={styles.buttonCapitalize(displayMode === mode, 'blue')}
              aria-label={`Display ${mode}`}
              aria-pressed={displayMode === mode}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={() => onChordsModeToggle(!showChordsMode)}
            className={styles.buttonCapitalize(showChordsMode, 'amber')}
            aria-label="Show CAGED chord shapes"
            aria-pressed={showChordsMode}
          >
            Chords
          </button>
          <button
            onClick={() => {
              onProgressionModeToggle(!showProgressionMode)
              if (!showProgressionMode && !selectedProgression) {
                onProgressionSelect('1-4-5') // Default to I-IV-V
              }
            }}
            className={styles.buttonCapitalize(showProgressionMode, 'emerald')}
            aria-label="Show chord progressions"
            aria-pressed={showProgressionMode}
          >
            Progression
          </button>
        </div>
      </div>

      {/* Chord Progression Selector */}
      {showProgressionMode && (
        <div className={styles.fieldWrapper}>
          <label htmlFor="progression-select" className={styles.label}>Progression</label>
          <select
            id="progression-select"
            value={selectedProgression || '1-4-5'}
            onChange={(e) => onProgressionSelect(e.target.value)}
            className={styles.selectEmerald}
            aria-label="Select chord progression"
          >
            {Object.entries(CHORD_PROGRESSIONS).map(([key, prog]) => (
              <option key={key} value={key}>
                {prog.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Progression View Mode Toggle - only visible in Progression mode */}
      {showProgressionMode && (
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Show</label>
          <div className={styles.buttonGroup} role="group" aria-label="Progression view mode">
            {(['chord', 'scale'] as ProgressionViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onProgressionViewModeChange(mode)}
                className={styles.flexButtonCapitalize(progressionViewMode === mode, 'emerald')}
                aria-label={`Show ${mode}`}
                aria-pressed={progressionViewMode === mode}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fingerings Toggle - only visible when showing chord voicings */}
      {(showChordsMode || (showProgressionMode && progressionViewMode === 'chord')) && (
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Chord View</label>
          <button
            onClick={() => onFingeringsToggle(!showFingerings)}
            className={styles.button(showFingerings, 'cyan')}
            aria-label="Show finger numbers or note labels"
            aria-pressed={showFingerings}
          >
            Fingerings
          </button>
        </div>
      )}

      {/* Chord Tones Only Toggle */}
      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Filter</label>
        <button
          onClick={() => onChordTonesToggle(!showOnlyChordTones)}
          className={`${styles.button(showOnlyChordTones && !(showChordsMode || (showProgressionMode && progressionViewMode === 'chord')), 'amber')} ${(showChordsMode || (showProgressionMode && progressionViewMode === 'chord')) ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Show only root, third, and fifth notes"
          aria-pressed={showOnlyChordTones}
          disabled={showChordsMode || (showProgressionMode && progressionViewMode === 'chord')}
        >
          R-3-5 Only
        </button>
      </div>
    </div>
  )
}
