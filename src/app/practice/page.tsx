'use client'

import Link from 'next/link'
import Fretboard from '@/components/Fretboard'
import { PracticeControls } from '@/components/PracticeControls'
import { usePracticeSession } from '@/hooks/usePracticeSession'
import { INSTRUMENT_NAMES, SCALE_NAMES, type InstrumentType } from '@/lib/music-theory'

export default function PracticePage() {
  const {
    rootNote,
    scale,
    position,
    effectivePosition,
    stringCount,
    tuningKey,
    mode,
    scaleDirection,
    triadStringSetIndex,
    selectedProgression,
    bpm,
    metronomeOn,
    arpeggioOn,
    showFingerings,
    showOnlyChordTones,
    isPlaying,
    tuning,
    steps,
    currentStep,
    activeNotes,
    currentLabel,
    triadStringSets,
    togglePlay,
    setBpm,
    setMetronomeOn,
    setArpeggioOn,
    setShowFingerings,
    setShowOnlyChordTones,
    setMode,
    setRootNote,
    setScale,
    setKey,
    setStringCount,
    setTuningKey,
    setPosition,
    setScaleDirection,
    setTriadStringSetIndex,
    setSelectedProgression,
  } = usePracticeSession()

  const isChordMode = mode === 'chord'
  const isProgressionMode = mode === 'progression'

  // Mirror the main page's chord display: chord and progression modes render
  // the voicing (with fingerings) instead of the scale
  const fretboardPosition = isChordMode
    ? effectivePosition
    : isProgressionMode
      ? (currentStep ?? 0)
      : mode === 'scale'
        ? position
        : null

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <img src="/logo.svg" alt="Fretboard Master logo" className="h-12 w-12 rotate-45" />
                Practice
              </h1>
              <p className="text-zinc-400 mt-1">
                Play along with scales, chords, triads, and progressions
              </p>
            </div>
            <Link
              href="/"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              ← Fretboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Practice controls */}
        <section
          aria-label="Practice controls"
          className="bg-zinc-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-zinc-800"
        >
          <PracticeControls
            mode={mode}
            rootNote={rootNote}
            scale={scale}
            position={position}
            stringCount={stringCount}
            tuningKey={tuningKey}
            scaleDirection={scaleDirection}
            triadStringSets={triadStringSets}
            triadStringSetIndex={triadStringSetIndex}
            selectedProgression={selectedProgression}
            bpm={bpm}
            metronomeOn={metronomeOn}
            arpeggioOn={arpeggioOn}
            showFingerings={showFingerings}
            showOnlyChordTones={showOnlyChordTones}
            isPlaying={isPlaying}
            onModeChange={setMode}
            onStringCountChange={setStringCount}
            onTuningChange={setTuningKey}
            onRootChange={setRootNote}
            onScaleChange={setScale}
            onPositionChange={setPosition}
            onScaleDirectionChange={setScaleDirection}
            onTriadStringSetChange={setTriadStringSetIndex}
            onProgressionChange={setSelectedProgression}
            onKeySelect={setKey}
            onBpmChange={setBpm}
            onMetronomeToggle={setMetronomeOn}
            onArpeggioToggle={setArpeggioOn}
            onFingeringsToggle={setShowFingerings}
            onChordTonesToggle={setShowOnlyChordTones}
            onTogglePlay={togglePlay}
          />
        </section>

        {/* Fretboard */}
        <section
          aria-label="Practice fretboard"
          className="bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800"
        >
          <div className="flex items-center justify-between mb-4 min-h-10">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-white">
                {rootNote} {SCALE_NAMES[scale] || scale}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300">
                {INSTRUMENT_NAMES[`${stringCount}-string` as InstrumentType]}
              </span>
            </div>
            {currentLabel && (
              <span
                className="px-4 py-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold"
                aria-live="polite"
              >
                {currentLabel}
              </span>
            )}
          </div>

          {/* Progression map: every chord in the loop, highlighting the one sounding now */}
          {(mode === 'progression' || mode === 'triad') && steps.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4" aria-label="Progression chords">
              {steps.map((step, index) => (
                <span
                  key={`${step.label}-${index}`}
                  className={
                    currentStep === index
                      ? 'px-3 py-1.5 rounded-md text-sm font-semibold bg-amber-500 text-white shadow-lg scale-105 transition-all'
                      : 'px-3 py-1.5 rounded-md text-sm font-semibold bg-zinc-800 text-zinc-400 transition-all'
                  }
                >
                  {step.label}
                </span>
              ))}
            </div>
          )}
          <Fretboard
            rootNote={rootNote}
            scale={scale}
            tuning={tuning}
            position={fretboardPosition}
            showChordsMode={isChordMode}
            showProgressionMode={isProgressionMode}
            selectedProgression={isProgressionMode ? selectedProgression : null}
            progressionViewMode="chord"
            showFingerings={showFingerings}
            showOnlyChordTones={showOnlyChordTones && !isChordMode && !isProgressionMode}
            activeNotes={activeNotes}
          />
        </section>
      </main>
    </div>
  )
}
