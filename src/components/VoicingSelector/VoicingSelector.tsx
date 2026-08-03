'use client'

import {
  CHORD_SUFFIXES,
  STANDARD_TUNING,
  getChordQuality,
  getChordVoicingsForTuning,
  type ChordQuality,
  type Note,
} from '@/lib/music-theory'
import {
  containerStyles,
  headerRowStyles,
  labelStyles,
  infoSectionStyles,
  chordNameStyles,
  fretInfoStyles,
  buttonGroupStyles,
  getAllButtonStyles,
  getVoicingButtonStyles,
} from './VoicingSelector.styles'

export interface VoicingSelectorProps {
  rootNote: Note
  scale: string
  tuning?: Note[]
  chordQuality?: ChordQuality | null // explicit chord type; null follows the scale
  position: number | null // voicing index; null means "All"
  onPositionChange: (position: number | null) => void
}

export default function VoicingSelector({
  rootNote,
  scale,
  tuning = STANDARD_TUNING,
  chordQuality = null,
  position,
  onPositionChange,
}: VoicingSelectorProps) {
  const quality = chordQuality ?? getChordQuality(scale)
  const voicings = getChordVoicingsForTuning(rootNote, quality, tuning)
  const chordName = `${rootNote}${CHORD_SUFFIXES[quality]}`
  const currentVoicing = position !== null ? voicings[position] : null

  return (
    <div className={containerStyles}>
      <div className={headerRowStyles}>
        <label className={labelStyles}>Voicing</label>
        <div className={infoSectionStyles}>
          <span className={chordNameStyles}>{chordName}</span>
          {currentVoicing && (
            <span className={fretInfoStyles}>
              {currentVoicing.baseFret === 0
                ? 'Open position'
                : `Fret ${currentVoicing.baseFret}`}
            </span>
          )}
        </div>
      </div>

      <div className={buttonGroupStyles} role="group" aria-label="Voicing selector">
        <button
          onClick={() => onPositionChange(null)}
          className={getAllButtonStyles(position === null)}
          aria-label="Show all voicings across fretboard"
          aria-pressed={position === null}
        >
          All
        </button>

        {voicings.map((voicing, index) => (
          <button
            key={index}
            onClick={() => onPositionChange(index)}
            className={getVoicingButtonStyles(position === index, index === voicings.length - 1)}
            aria-label={`Voicing ${index + 1}, ${
              voicing.baseFret === 0 ? 'open position' : `fret ${voicing.baseFret}`
            }`}
            aria-current={position === index ? 'true' : undefined}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
