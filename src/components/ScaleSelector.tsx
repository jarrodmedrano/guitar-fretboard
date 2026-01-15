'use client'

import { Note, NOTES, SCALES, SCALE_NAMES, TUNINGS, TUNING_NAMES } from '@/lib/music-theory'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

interface ScaleSelectorProps {
  rootNote: Note
  scale: string
  tuning: string
  displayMode: DisplayMode
  showOnlyChordTones: boolean
  onRootChange: (note: Note) => void
  onScaleChange: (scale: string) => void
  onTuningChange: (tuning: string) => void
  onDisplayModeChange: (mode: DisplayMode) => void
  onChordTonesToggle: (show: boolean) => void
}

export default function ScaleSelector({
  rootNote,
  scale,
  tuning,
  displayMode,
  showOnlyChordTones,
  onRootChange,
  onScaleChange,
  onTuningChange,
  onDisplayModeChange,
  onChordTonesToggle,
}: ScaleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
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

      {/* Tuning Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500 uppercase tracking-wide">Tuning</label>
        <select
          value={tuning}
          onChange={(e) => onTuningChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          {Object.keys(TUNINGS).map((tuningKey) => (
            <option key={tuningKey} value={tuningKey}>
              {TUNING_NAMES[tuningKey]}
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
        </div>
      </div>

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
