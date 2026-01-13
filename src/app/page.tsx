'use client'

import { useState } from 'react'
import Fretboard from '@/components/Fretboard'
import ScaleSelector from '@/components/ScaleSelector'
import PositionSelector from '@/components/PositionSelector'
import { Note, SCALE_NAMES, SCALES } from '@/lib/music-theory'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

export default function Home() {
  const [rootNote, setRootNote] = useState<Note>('A')
  const [scale, setScale] = useState('minorPentatonic')
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes')
  const [showOnlyChordTones, setShowOnlyChordTones] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  // Reset position when scale changes (different scales have different position counts)
  const handleScaleChange = (newScale: string) => {
    setScale(newScale)
    setPosition(null)
  }

  const scaleFormula = SCALES[scale]
  const scaleNotes = scaleFormula.map((interval) => {
    const rootIndex = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(rootNote)
    return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][(rootIndex + interval) % 12]
  })

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">🎸</span>
                Fretboard Master
              </h1>
              <p className="text-zinc-500 mt-1">Learn scales, modes, and patterns on the guitar fretboard</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="/api/scales" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Scales API
              </a>
              <a href="/api/chords" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Chords API
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Scale Info Card */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {rootNote} {SCALE_NAMES[scale]}
              </h2>
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
        <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
          <ScaleSelector
            rootNote={rootNote}
            scale={scale}
            displayMode={displayMode}
            showOnlyChordTones={showOnlyChordTones}
            onRootChange={setRootNote}
            onScaleChange={handleScaleChange}
            onDisplayModeChange={setDisplayMode}
            onChordTonesToggle={setShowOnlyChordTones}
          />
        </div>

        {/* Fretboard */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white">Interactive Fretboard</h3>
                <p className="text-zinc-500 text-sm mt-1">
                  Click on notes to select them. Scroll horizontally to see more frets.
                </p>
              </div>
              {/* Position Selector - placed prominently next to fretboard header */}
              <div className="lg:min-w-[200px]">
                <PositionSelector
                  scale={scale}
                  rootNote={rootNote}
                  position={position}
                  onPositionChange={setPosition}
                />
              </div>
            </div>
          </div>
          <div className="pb-8">
            <Fretboard
              rootNote={rootNote}
              scale={scale}
              displayMode={displayMode}
              showOnlyChordTones={showOnlyChordTones}
              position={position}
              frets={24}
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
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

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
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

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
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
        </div>

        {/* Scale Categories */}
        <div className="mt-8 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Quick Scale Reference</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => { setScale('minorPentatonic'); setRootNote('A') }}
              className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
            >
              <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                A Minor Pentatonic
              </span>
              <p className="text-zinc-500 text-sm mt-1">The essential blues/rock scale</p>
            </button>
            <button
              onClick={() => { setScale('blues'); setRootNote('E') }}
              className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
            >
              <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                E Blues Scale
              </span>
              <p className="text-zinc-500 text-sm mt-1">Classic blues with the b5</p>
            </button>
            <button
              onClick={() => { setScale('major'); setRootNote('C') }}
              className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
            >
              <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                C Major Scale
              </span>
              <p className="text-zinc-500 text-sm mt-1">The foundation of music theory</p>
            </button>
            <button
              onClick={() => { setScale('dorian'); setRootNote('D') }}
              className="text-left p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
            >
              <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                D Dorian Mode
              </span>
              <p className="text-zinc-500 text-sm mt-1">Jazz and funk favorite</p>
            </button>
          </div>
        </div>
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
