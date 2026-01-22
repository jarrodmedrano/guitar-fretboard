'use client'

import { Note, NOTES, SCALES, SCALE_NAMES, INSTRUMENT_NAMES, getTuningsByStringCount, TUNING_CONFIGS, CHORD_PROGRESSIONS } from '@/lib/music-theory'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

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
}: ScaleSelectorProps) {
  // Get tunings filtered by current string count
  const availableTunings = getTuningsByStringCount(stringCount)

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {/* String Count / Instrument Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Instrument</label>
        <div className="flex gap-1">
          {STRING_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => onStringCountChange(count)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all
                ${stringCount === count
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
              title={INSTRUMENT_NAMES[`${count}-string` as keyof typeof INSTRUMENT_NAMES]}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Root Note Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Root Note</label>
        <div className="flex flex-wrap gap-1">
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
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Scale Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Scale</label>
        <select
          value={scale}
          onChange={(e) => onScaleChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          {Object.keys(SCALES).map((scaleKey) => (
            <option key={scaleKey} value={scaleKey}>
              {SCALE_NAMES[scaleKey]}
            </option>
          ))}
        </select>
      </div>

      {/* Tuning Selector - filtered by string count */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Tuning</label>
        <select
          value={tuning}
          onChange={(e) => onTuningChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          {Object.entries(availableTunings).map(([tuningKey, config]) => (
            <option key={tuningKey} value={tuningKey}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Mode */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Display</label>
        <div className="flex gap-1">
          {(['notes', 'intervals', 'degrees'] as DisplayMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onDisplayModeChange(mode)}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all capitalize
                ${displayMode === mode
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }
              `}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={() => onChordsModeToggle(!showChordsMode)}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-all capitalize
              ${showChordsMode
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
            title="Show CAGED chord shapes"
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
              px-3 py-2 rounded-md text-sm font-medium transition-all capitalize
              ${showProgressionMode
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
            title="Show chord progressions"
          >
            Progression
          </button>
        </div>
      </div>

      {/* Chord Progression Selector */}
      {showProgressionMode && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wide">Progression</label>
          <select
            value={selectedProgression || '1-4-5'}
            onChange={(e) => onProgressionSelect(e.target.value)}
            className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {Object.entries(CHORD_PROGRESSIONS).map(([key, prog]) => (
              <option key={key} value={key}>
                {prog.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Fingerings Toggle - only visible when Chords or Progression mode is active */}
      {(showChordsMode || showProgressionMode) && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-wide">Chord View</label>
          <button
            onClick={() => onFingeringsToggle(!showFingerings)}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-all
              ${showFingerings
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
            title="Show finger numbers or note labels"
          >
            Fingerings
          </button>
        </div>
      )}

      {/* Chord Tones Only Toggle */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Filter</label>
        <button
          onClick={() => onChordTonesToggle(!showOnlyChordTones)}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-all
            ${showOnlyChordTones
              ? 'bg-amber-500 text-white shadow-lg'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }
          `}
          title="Show only Root, 3rd, and 5th"
        >
          R-3-5 Only
        </button>
      </div>
    </div>
  )
}
