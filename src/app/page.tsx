'use client'

import Fretboard from '@/components/Fretboard'
import ScaleSelector from '@/components/ScaleSelector'
import PositionSelector from '@/components/PositionSelector'
import { LiveRegion } from '@/components/LiveRegion'
import { QuickScaleButtons } from '@/components/QuickScaleButtons'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useFretboardApp } from '@/hooks/useFretboardApp'
import { SCALE_NAMES, SCALES, TUNINGS, INSTRUMENT_NAMES, getChordNameForPosition, getProgressionChordName } from '@/lib/music-theory'

export default function Home() {
  const {
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
    scaleNotes,
    scaleFormula,
  } = useFretboardApp()

  // Local keyboard shortcut handlers for position navigation
  const handlePrevPosition = () => {
    const positions = SCALES[scale] ? Object.keys(SCALES[scale]).length : 5
    if (position === null) {
      handlePositionChange(0)
    } else if (position > 0) {
      handlePositionChange(position - 1)
    } else {
      handlePositionChange(positions - 1)
    }
  }

  const handleNextPosition = () => {
    const positions = SCALES[scale] ? Object.keys(SCALES[scale]).length : 5
    if (position === null) {
      handlePositionChange(0)
    } else if (position < positions - 1) {
      handlePositionChange(position + 1)
    } else {
      handlePositionChange(0)
    }
  }

  useKeyboardShortcuts({
    onPreviousPosition: handlePrevPosition,
    onNextPosition: handleNextPosition,
    onToggleDisplayMode: handleToggleDisplayMode,
    onToggleChordsMode: handleToggleChordsMode,
  })

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Live region for screen reader announcements */}
      <LiveRegion message={announcement} />

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">🎸</span>
                Fretboard Master
              </h1>
              <p className="text-zinc-400 mt-1">Learn scales, modes, and patterns on guitar and bass fretboards</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Scale Info Card */}
        <div className="bg-zinc-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-zinc-800 animate-scale-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-semibold text-white">
                  {rootNote} {SCALE_NAMES[scale]}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300">
                  {INSTRUMENT_NAMES[`${stringCount}-string` as keyof typeof INSTRUMENT_NAMES]}
                </span>
                {showChordsMode && !showProgressionMode && (
                  position !== null ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300">
                      {getChordNameForPosition(rootNote, scale, position)}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300">
                      All CAGED Shapes
                    </span>
                  )
                )}
                {showProgressionMode && selectedProgression && (
                  position !== null ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300">
                      {getProgressionChordName(rootNote, scale, position, selectedProgression)}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300">
                      Progression: {selectedProgression}
                    </span>
                  )
                )}
              </div>
              <p className="text-zinc-400 mt-1">
                Notes: <span className="text-zinc-200 font-mono">{scaleNotes.join(' - ')}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-zinc-500">Formula:</span>
              <span className="font-mono text-zinc-300 bg-zinc-800 px-3 py-1 rounded">
                {scaleFormula.map((i, idx) => {
                  const intervals = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']
                  return intervals[i]
                }).join('-')}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <section aria-label="Fretboard controls" className="bg-zinc-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-zinc-800 animate-scale-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
          <ScaleSelector
            rootNote={rootNote}
            scale={scale}
            stringCount={stringCount}
            tuning={tuning}
            displayMode={displayMode}
            showOnlyChordTones={showOnlyChordTones}
            showChordsMode={showChordsMode}
            showProgressionMode={showProgressionMode}
            selectedProgression={selectedProgression}
            showFingerings={showFingerings}
            progressionViewMode={progressionViewMode}
            onRootChange={handleRootChange}
            onScaleChange={handleScaleChange}
            onStringCountChange={handleStringCountChange}
            onTuningChange={setTuning}
            onDisplayModeChange={setDisplayMode}
            onChordTonesToggle={setShowOnlyChordTones}
            onChordsModeToggle={handleChordsModeToggle}
            onProgressionModeToggle={handleProgressionModeToggle}
            onProgressionSelect={setSelectedProgression}
            onFingeringsToggle={setShowFingerings}
            onProgressionViewModeChange={setProgressionViewMode}
          />

          {/* Keyboard shortcuts hint */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="text-xs text-zinc-400 flex flex-wrap gap-x-4 gap-y-1" role="note" aria-label="Keyboard shortcuts">
              <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">[</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">]</kbd> Previous/Next Position</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">D</kbd> Display Mode</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">C</kbd> Chords</span>
            </div>
          </div>
        </section>

        {/* Fretboard */}
        <section aria-label="Interactive fretboard">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-zinc-800">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 md:gap-4">
                <div>
                  <h3 className="text-base md:text-lg font-medium text-white">Interactive Fretboard</h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-1">
                    <span className="hidden sm:inline">Click on notes to select them. </span>Scroll horizontally to see more frets.
                  </p>
                </div>
                {/* Position Selector - placed prominently next to fretboard header */}
                <div className="w-full lg:w-auto lg:min-w-[200px]">
                  <PositionSelector
                    scale={scale}
                    rootNote={rootNote}
                    tuning={tuning}
                    position={position}
                    onPositionChange={handlePositionChange}
                  />
                </div>
              </div>
            </div>
            <div className="pb-6 md:pb-8">
              <Fretboard
                rootNote={rootNote}
                scale={scale}
                tuning={TUNINGS[tuning]}
                displayMode={displayMode}
                showOnlyChordTones={showOnlyChordTones}
                showChordsMode={showChordsMode}
                showProgressionMode={showProgressionMode}
                selectedProgression={selectedProgression}
                showFingerings={showFingerings}
                progressionViewMode={progressionViewMode}
                position={position}
                frets={24}
              />
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section aria-label="Quick note reference" className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          <div className="bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-500 text-xl">R</span>
              </div>
              <h4 className="font-semibold text-white">Root Notes</h4>
            </div>
            <p className="text-zinc-400 text-sm">
              The red notes are your root notes. These are the &quot;home base&quot; of your scale - start and end your phrases here.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 text-xl">3</span>
              </div>
              <h4 className="font-semibold text-white">The Third</h4>
            </div>
            <p className="text-zinc-400 text-sm">
              Green notes are the 3rd - they determine if your scale sounds major (happy) or minor (sad).
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500 text-xl">5</span>
              </div>
              <h4 className="font-semibold text-white">The Fifth</h4>
            </div>
            <p className="text-zinc-400 text-sm">
              Blue notes are the 5th - these create power chords and add stability to your playing.
            </p>
          </div>
        </section>

        {/* Scale Categories */}
        <QuickScaleButtons
          onScaleChange={handleScaleChange}
          onRootChange={handleRootChange}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-zinc-500 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
