'use client'

import { Note, NOTES, SCALES, SCALE_NAMES, INSTRUMENT_NAMES, getTuningsByStringCount, TUNING_CONFIGS, CHORD_PROGRESSIONS } from '@/lib/music-theory'

type DisplayMode = 'notes' | 'intervals' | 'degrees'
type ProgressionViewMode = 'chord' | 'scale'

interface ScaleSelectorProps {
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
    <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 items-stretch md:items-center md:justify-center">
      {/* String Count / Instrument Selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-400 uppercase tracking-wide">Instrument</label>
        <div className="flex gap-1.5 md:gap-1" role="group" aria-label="Select instrument">
          {STRING_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => onStringCountChange(count)}
              className={`
                flex-1 md:flex-none px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all
                ${stringCount === count
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
              aria-label={`Select instrument: ${INSTRUMENT_NAMES[`${count}-string` as keyof typeof INSTRUMENT_NAMES]}`}
              aria-pressed={stringCount === count}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Root Note Selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="root-note-mobile" className="text-xs text-zinc-400 uppercase tracking-wide">Root Note</label>

        {/* Mobile: Dropdown */}
        <select
          id="root-note-mobile"
          value={rootNote}
          onChange={(e) => onRootChange(e.target.value as Note)}
          className="md:hidden px-4 py-3 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          aria-label="Select root note"
        >
          {NOTES.map((note) => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>

        {/* Desktop: Buttons */}
        <div className="hidden md:flex flex-wrap gap-1" role="group" aria-label="Select root note">
          {NOTES.map((note) => (
            <button
              key={note}
              onClick={() => onRootChange(note)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all
                ${rootNote === note
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
              aria-label={`Select root note: ${note}`}
              aria-pressed={rootNote === note}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Scale Selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="scale-select" className="text-xs text-zinc-400 uppercase tracking-wide">Scale</label>
        <select
          id="scale-select"
          value={scale}
          onChange={(e) => onScaleChange(e.target.value)}
          className="px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer text-sm"
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
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tuning-select" className="text-xs text-zinc-400 uppercase tracking-wide">Tuning</label>
        <select
          id="tuning-select"
          value={tuning}
          onChange={(e) => onTuningChange(e.target.value)}
          className="px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer text-sm"
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
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-400 uppercase tracking-wide">Display</label>
        <div className="flex flex-wrap gap-1.5 md:gap-1" role="group" aria-label="Select display mode">
          {(['notes', 'intervals', 'degrees'] as DisplayMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onDisplayModeChange(mode)}
              className={`
                px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize
                ${displayMode === mode
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
              aria-label={`Display ${mode}`}
              aria-pressed={displayMode === mode}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={() => onChordsModeToggle(!showChordsMode)}
            className={`
              px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize
              ${showChordsMode
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
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
            className={`
              px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize
              ${showProgressionMode
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
            aria-label="Show chord progressions"
            aria-pressed={showProgressionMode}
          >
            Progression
          </button>
        </div>
      </div>

      {/* Chord Progression Selector */}
      {showProgressionMode && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="progression-select" className="text-xs text-zinc-400 uppercase tracking-wide">Progression</label>
          <select
            id="progression-select"
            value={selectedProgression || '1-4-5'}
            onChange={(e) => onProgressionSelect(e.target.value)}
            className="px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-sm"
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-400 uppercase tracking-wide">Show</label>
          <div className="flex gap-1.5 md:gap-1" role="group" aria-label="Progression view mode">
            {(['chord', 'scale'] as ProgressionViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onProgressionViewModeChange(mode)}
                className={`
                  flex-1 md:flex-none px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize
                  ${progressionViewMode === mode
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }
                `}
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-400 uppercase tracking-wide">Chord View</label>
          <button
            onClick={() => onFingeringsToggle(!showFingerings)}
            className={`
              px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all
              ${showFingerings
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
            aria-label="Show finger numbers or note labels"
            aria-pressed={showFingerings}
          >
            Fingerings
          </button>
        </div>
      )}

      {/* Chord Tones Only Toggle */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-400 uppercase tracking-wide">Filter</label>
        <button
          onClick={() => onChordTonesToggle(!showOnlyChordTones)}
          className={`
            px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all
            ${showOnlyChordTones
              ? 'bg-amber-500 text-white shadow-lg'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }
          `}
          aria-label="Show only root, third, and fifth notes"
          aria-pressed={showOnlyChordTones}
        >
          R-3-5 Only
        </button>
      </div>
    </div>
  )
}
