'use client'

import type { ChangeEvent } from 'react'
import {
  KEY_POPULARITY,
  NOTES,
  SCALE_NAMES,
  getChordQuality,
  getChordVoicingCount,
  getPositionCount,
  getProgressionsForScale,
  type Note,
} from '@/lib/music-theory'
import type { PracticeMode, ScaleDirection } from '@/lib/practice-sequence'
import type { TriadStringSet } from '@/lib/triads'
import { styles } from './PracticeControls.styles'

const MODES: PracticeMode[] = ['scale', 'chord', 'triad', 'progression']
const MIN_BPM = 40
const MAX_BPM = 220
const BPM_STEP = 5

export interface PracticeControlsProps {
  mode: PracticeMode
  rootNote: Note
  scale: string
  position: number
  scaleDirection: ScaleDirection
  triadStringSets: TriadStringSet[]
  triadStringSetIndex: number
  selectedProgression: string
  bpm: number
  metronomeOn: boolean
  arpeggioOn: boolean
  showFingerings: boolean
  showOnlyChordTones: boolean
  isPlaying: boolean
  onModeChange: (mode: PracticeMode) => void
  onRootChange: (note: Note) => void
  onScaleChange: (scale: string) => void
  onPositionChange: (position: number) => void
  onScaleDirectionChange: (direction: ScaleDirection) => void
  onTriadStringSetChange: (index: number) => void
  onProgressionChange: (progression: string) => void
  onKeySelect: (root: Note, scale: string) => void
  onBpmChange: (bpm: number) => void
  onMetronomeToggle: (on: boolean) => void
  onArpeggioToggle: (on: boolean) => void
  onFingeringsToggle: (show: boolean) => void
  onChordTonesToggle: (show: boolean) => void
  onTogglePlay: () => void
}

const KEY_PICKER_MODES = ['major', 'minor', 'mixolydian', 'dorian', 'lydian', 'phrygian', 'locrian']

export function PracticeControls({
  mode,
  rootNote,
  scale,
  position,
  scaleDirection,
  triadStringSets,
  triadStringSetIndex,
  selectedProgression,
  bpm,
  metronomeOn,
  arpeggioOn,
  showFingerings,
  showOnlyChordTones,
  isPlaying,
  onModeChange,
  onRootChange,
  onScaleChange,
  onPositionChange,
  onScaleDirectionChange,
  onTriadStringSetChange,
  onProgressionChange,
  onKeySelect,
  onBpmChange,
  onMetronomeToggle,
  onArpeggioToggle,
  onFingeringsToggle,
  onChordTonesToggle,
  onTogglePlay,
}: PracticeControlsProps) {
  // Chord mode selects among curated voicings; scale mode among scale positions
  const positionCount =
    mode === 'chord'
      ? getChordVoicingCount(rootNote, getChordQuality(scale))
      : getPositionCount(scale)
  const positionLabel = mode === 'chord' ? 'Voicing' : 'Position'
  const showPosition = mode === 'scale' || mode === 'chord'
  const availableProgressions = getProgressionsForScale(scale)
  const selectedKey =
    KEY_POPULARITY.find((key) => key.root === rootNote && key.scale === scale) ?? null

  const handleKeySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const [keyRoot, keyScale] = event.target.value.split('|')
    if (!keyRoot || !keyScale) return
    onKeySelect(keyRoot as Note, keyScale)
  }

  const handleRootSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onRootChange(event.target.value as Note)
  }

  const handleScaleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onScaleChange(event.target.value)
  }

  const handlePositionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onPositionChange(Number(event.target.value))
  }

  const handleTriadStringSetSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onTriadStringSetChange(Number(event.target.value))
  }

  const handleProgressionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onProgressionChange(event.target.value)
  }

  const handleBpmSlider = (event: ChangeEvent<HTMLInputElement>) => {
    onBpmChange(Number(event.target.value))
  }

  const handleBpmDecrease = () => {
    onBpmChange(bpm - BPM_STEP)
  }

  const handleBpmIncrease = () => {
    onBpmChange(bpm + BPM_STEP)
  }

  const handleMetronomeClick = () => {
    onMetronomeToggle(!metronomeOn)
  }

  // Arpeggio applies to strummed material; scale runs are already note-by-note
  const isArpeggioAvailable = mode !== 'scale'

  const handleArpeggioClick = () => {
    if (!isArpeggioAvailable) return
    onArpeggioToggle(!arpeggioOn)
  }

  // Chord and progression modes render voicings, so fingerings apply there;
  // the R-3-5 filter applies to the scale display (scale and triad modes)
  const isChordView = mode === 'chord' || mode === 'progression'

  const handleFingeringsClick = () => {
    onFingeringsToggle(!showFingerings)
  }

  const handleChordTonesClick = () => {
    if (isChordView) return
    onChordTonesToggle(!showOnlyChordTones)
  }

  return (
    <div className={styles.container}>
      {/* Practice mode tabs */}
      <div className={styles.fieldWrapper}>
        <span className={styles.label}>Practice</span>
        <div className={styles.modeRow} role="tablist" aria-label="Practice mode">
          {MODES.map((practiceMode) => (
            <button
              key={practiceMode}
              role="tab"
              aria-selected={mode === practiceMode}
              className={styles.modeButton(mode === practiceMode)}
              onClick={() => onModeChange(practiceMode)}
            >
              {practiceMode === 'triad' ? 'Triads' : `${practiceMode}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Material selectors */}
      <div className={styles.optionsRow}>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="practice-key">
            Popular Key
          </label>
          <select
            id="practice-key"
            className={styles.select}
            value={selectedKey ? `${selectedKey.root}|${selectedKey.scale}` : ''}
            onChange={handleKeySelect}
          >
            <option value="" disabled>
              Choose a key…
            </option>
            {KEY_PICKER_MODES.map((pickerMode) => (
              <optgroup key={pickerMode} label={SCALE_NAMES[pickerMode] || pickerMode}>
                {KEY_POPULARITY.filter((key) => key.scale === pickerMode).map((key) => (
                  <option key={`${key.root}|${key.scale}`} value={`${key.root}|${key.scale}`}>
                    {key.name} ({key.popularity}%)
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="practice-root">
            Root
          </label>
          <select
            id="practice-root"
            className={styles.select}
            value={rootNote}
            onChange={handleRootSelect}
          >
            {NOTES.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="practice-scale">
            Scale
          </label>
          <select
            id="practice-scale"
            className={styles.select}
            value={scale}
            onChange={handleScaleSelect}
          >
            {Object.entries(SCALE_NAMES).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {showPosition && (
          <div className={styles.fieldWrapper}>
            <label className={styles.label} htmlFor="practice-position">
              {positionLabel}
            </label>
            <select
              id="practice-position"
              className={styles.select}
              value={Math.min(position, Math.max(0, positionCount - 1))}
              onChange={handlePositionSelect}
            >
              {Array.from({ length: positionCount }, (_, index) => (
                <option key={index} value={index}>
                  {positionLabel} {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === 'scale' && (
          <div className={styles.fieldWrapper}>
            <span className={styles.label}>Direction</span>
            <div className={styles.buttonGroup}>
              <button
                className={styles.directionButton(scaleDirection === 'asc')}
                onClick={() => onScaleDirectionChange('asc')}
              >
                Up
              </button>
              <button
                className={styles.directionButton(scaleDirection === 'asc-desc')}
                onClick={() => onScaleDirectionChange('asc-desc')}
              >
                Up &amp; Down
              </button>
            </div>
          </div>
        )}

        {mode === 'triad' && (
          <div className={styles.fieldWrapper}>
            <label className={styles.label} htmlFor="practice-string-set">
              String Set
            </label>
            <select
              id="practice-string-set"
              className={styles.select}
              value={triadStringSetIndex}
              onChange={handleTriadStringSetSelect}
            >
              {triadStringSets.map((stringSet, index) => (
                <option key={stringSet.label} value={index}>
                  {stringSet.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === 'progression' && (
          <div className={styles.fieldWrapper}>
            <label className={styles.label} htmlFor="practice-progression">
              Progression
            </label>
            <select
              id="practice-progression"
              className={styles.select}
              value={selectedProgression}
              onChange={handleProgressionSelect}
            >
              {availableProgressions.map(([key, progression]) => (
                <option key={key} value={key}>
                  {progression.name} — {progression.description}
                </option>
              ))}
            </select>
          </div>
        )}

        {isChordView && (
          <div className={styles.fieldWrapper}>
            <span className={styles.label}>Chord View</span>
            <button
              onClick={handleFingeringsClick}
              className={styles.fingeringsButton(showFingerings)}
              aria-label="Show finger numbers or note labels"
              aria-pressed={showFingerings}
            >
              Fingerings
            </button>
          </div>
        )}

        <div className={styles.fieldWrapper}>
          <span className={styles.label}>Filter</span>
          <button
            onClick={handleChordTonesClick}
            className={styles.chordTonesButton(showOnlyChordTones && !isChordView, isChordView)}
            aria-label="Show only root, third, and fifth notes"
            aria-pressed={showOnlyChordTones && !isChordView}
            disabled={isChordView}
          >
            R-3-5 Only
          </button>
        </div>
      </div>

      {/* Playback controls */}
      <div className={styles.playbackRow}>
        <div className={styles.bpmGroup}>
          <div className={styles.fieldWrapper}>
            <label className={styles.label} htmlFor="practice-bpm">
              Tempo (BPM)
            </label>
            <div className={styles.bpmStepper}>
              <button
                className={styles.bpmButton}
                onClick={handleBpmDecrease}
                aria-label="Decrease tempo"
              >
                −
              </button>
              <span className={styles.bpmValue} aria-live="polite">
                {bpm}
              </span>
              <button
                className={styles.bpmButton}
                onClick={handleBpmIncrease}
                aria-label="Increase tempo"
              >
                +
              </button>
              <input
                id="practice-bpm"
                type="range"
                min={MIN_BPM}
                max={MAX_BPM}
                value={bpm}
                onChange={handleBpmSlider}
                className={styles.bpmSlider}
                aria-label="Tempo in beats per minute"
              />
            </div>
          </div>
        </div>

        <div className={styles.toggleGroup}>
          <button
            className={styles.metronomeButton(metronomeOn)}
            onClick={handleMetronomeClick}
            aria-pressed={metronomeOn}
          >
            🎵 Metronome {metronomeOn ? 'On' : 'Off'}
          </button>
          <button
            className={styles.arpeggioButton(arpeggioOn && isArpeggioAvailable, !isArpeggioAvailable)}
            onClick={handleArpeggioClick}
            disabled={!isArpeggioAvailable}
            aria-pressed={arpeggioOn && isArpeggioAvailable}
            title={
              isArpeggioAvailable
                ? 'Play chords one note at a time'
                : 'Arpeggio applies to chords, triads, and progressions'
            }
          >
            🎶 Arpeggio {arpeggioOn && isArpeggioAvailable ? 'On' : 'Off'}
          </button>
          <button className={styles.playButton(isPlaying)} onClick={onTogglePlay}>
            {isPlaying ? '■ Stop' : '▶ Play'}
          </button>
        </div>
      </div>
    </div>
  )
}
