# Component Structure Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor guitar-fretboard-app to comply with Claude rules - extract hooks, separate styles, split large files.

**Architecture:** Extract all business logic from components into custom hooks. Create `*.styles.ts` files with Tailwind class compositions. Split 932-line music-theory.ts into focused modules. Push client components to leaves.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest

---

## Phase 1: Setup & Utilities

### Task 1: Install Style Utilities

**Files:**
- Modify: `package.json`

**Step 1: Add clsx and tailwind-merge dependencies**

```bash
cd /Users/jarrodmedrano/work/new-proj/guitar-fretboard-app/.worktrees/component-structure-refactor
pnpm add clsx tailwind-merge
```

**Step 2: Verify installation**

Run: `pnpm list clsx tailwind-merge`
Expected: Both packages listed

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add clsx and tailwind-merge for style utilities"
```

---

### Task 2: Create cn() Utility

**Files:**
- Create: `src/lib/utils.ts`

**Step 1: Create the utility file**

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 2: Verify TypeScript compiles**

Run: `pnpm tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add cn() utility for Tailwind class composition"
```

---

## Phase 2: Extract Hooks

### Task 3: Create useAnnouncements Hook

**Files:**
- Create: `src/hooks/useAnnouncements.ts`
- Create: `src/hooks/useAnnouncements.test.ts`

**Step 1: Write the failing test**

```typescript
// src/hooks/useAnnouncements.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAnnouncements } from './useAnnouncements'

describe('useAnnouncements', () => {
  it('should initialize with empty announcement', () => {
    const { result } = renderHook(() => useAnnouncements())
    expect(result.current.announcement).toBe('')
  })

  it('should update announcement when announce is called', () => {
    const { result } = renderHook(() => useAnnouncements())

    act(() => {
      result.current.announce('Test message')
    })

    expect(result.current.announcement).toBe('Test message')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:run src/hooks/useAnnouncements.test.ts`
Expected: FAIL - module not found

**Step 3: Write minimal implementation**

```typescript
// src/hooks/useAnnouncements.ts
'use client'

import { useState, useCallback } from 'react'

export function useAnnouncements() {
  const [announcement, setAnnouncement] = useState('')

  const announce = useCallback((message: string) => {
    setAnnouncement(message)
  }, [])

  return { announcement, announce }
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm test:run src/hooks/useAnnouncements.test.ts`
Expected: 2 tests PASS

**Step 5: Commit**

```bash
git add src/hooks/useAnnouncements.ts src/hooks/useAnnouncements.test.ts
git commit -m "feat: add useAnnouncements hook for screen reader support"
```

---

### Task 4: Create useFretboardApp Hook

**Files:**
- Create: `src/hooks/useFretboardApp.ts`
- Create: `src/hooks/useFretboardApp.test.ts`

**Step 1: Write the failing test**

```typescript
// src/hooks/useFretboardApp.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFretboardApp } from './useFretboardApp'

describe('useFretboardApp', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFretboardApp())

    expect(result.current.rootNote).toBe('A')
    expect(result.current.scale).toBe('minorPentatonic')
    expect(result.current.position).toBe(null)
    expect(result.current.stringCount).toBe(6)
    expect(result.current.displayMode).toBe('notes')
  })

  it('should update root note and announce change', () => {
    const { result } = renderHook(() => useFretboardApp())

    act(() => {
      result.current.handleRootChange('C')
    })

    expect(result.current.rootNote).toBe('C')
    expect(result.current.announcement).toBe('Root note changed to C')
  })

  it('should reset position when scale changes', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Set a position first
    act(() => {
      result.current.handlePositionChange(2)
    })
    expect(result.current.position).toBe(2)

    // Change scale - position should reset
    act(() => {
      result.current.handleScaleChange('blues')
    })

    expect(result.current.scale).toBe('blues')
    expect(result.current.position).toBe(null)
  })

  it('should disable progression mode when chords mode is enabled', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Enable progression mode first
    act(() => {
      result.current.handleProgressionModeToggle(true)
    })
    expect(result.current.showProgressionMode).toBe(true)

    // Enable chords mode - should disable progression mode
    act(() => {
      result.current.handleChordsModeToggle(true)
    })

    expect(result.current.showChordsMode).toBe(true)
    expect(result.current.showProgressionMode).toBe(false)
  })

  it('should calculate scaleNotes correctly', () => {
    const { result } = renderHook(() => useFretboardApp())

    // Default is A minor pentatonic: A, C, D, E, G
    expect(result.current.scaleNotes).toEqual(['A', 'C', 'D', 'E', 'G'])
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:run src/hooks/useFretboardApp.test.ts`
Expected: FAIL - module not found

**Step 3: Write implementation**

```typescript
// src/hooks/useFretboardApp.ts
'use client'

import { useState, useCallback, useMemo } from 'react'
import { Note, SCALE_NAMES, SCALES, getDefaultTuning } from '@/lib/music-theory'
import { useAnnouncements } from './useAnnouncements'

type DisplayMode = 'notes' | 'intervals' | 'degrees'
type ProgressionViewMode = 'chord' | 'scale'

export function useFretboardApp() {
  const { announcement, announce } = useAnnouncements()

  // Core state
  const [rootNote, setRootNote] = useState<Note>('A')
  const [scale, setScale] = useState('minorPentatonic')
  const [stringCount, setStringCount] = useState(6)
  const [tuning, setTuning] = useState('standard')
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes')
  const [position, setPosition] = useState<number | null>(null)

  // Feature toggles
  const [showOnlyChordTones, setShowOnlyChordTones] = useState(false)
  const [showChordsMode, setShowChordsMode] = useState(false)
  const [showProgressionMode, setShowProgressionMode] = useState(false)
  const [selectedProgression, setSelectedProgression] = useState<string | null>(null)
  const [showFingerings, setShowFingerings] = useState(true)
  const [progressionViewMode, setProgressionViewMode] = useState<ProgressionViewMode>('chord')

  // Handlers
  const handleScaleChange = useCallback((newScale: string) => {
    setScale(newScale)
    setPosition(null)
    announce(`Scale changed to ${SCALE_NAMES[newScale]}, position reset`)
  }, [announce])

  const handleRootChange = useCallback((newRoot: Note) => {
    setRootNote(newRoot)
    announce(`Root note changed to ${newRoot}`)
  }, [announce])

  const handlePositionChange = useCallback((newPosition: number | null) => {
    setPosition(newPosition)
    if (newPosition === null) {
      announce('Showing all positions')
    } else {
      announce(`Position ${newPosition + 1} selected`)
    }
  }, [announce])

  const handleStringCountChange = useCallback((count: number) => {
    setStringCount(count)
    setTuning(getDefaultTuning(count))
  }, [])

  const handleChordsModeToggle = useCallback((enabled: boolean) => {
    setShowChordsMode(enabled)
    if (enabled) {
      setShowProgressionMode(false)
    }
  }, [])

  const handleProgressionModeToggle = useCallback((enabled: boolean) => {
    setShowProgressionMode(enabled)
    if (enabled) {
      setShowChordsMode(false)
    }
  }, [])

  const handleToggleDisplayMode = useCallback(() => {
    const modes: DisplayMode[] = ['notes', 'intervals', 'degrees']
    const currentIndex = modes.indexOf(displayMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setDisplayMode(nextMode)
    announce(`Display mode changed to ${nextMode}`)
  }, [displayMode, announce])

  const handleToggleChordsMode = useCallback(() => {
    const newValue = !showChordsMode
    handleChordsModeToggle(newValue)
    announce(newValue ? 'Chords mode enabled' : 'Chords mode disabled')
  }, [showChordsMode, handleChordsModeToggle, announce])

  // Derived values
  const scaleFormula = SCALES[scale] || SCALES.minorPentatonic

  const scaleNotes = useMemo(() => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const rootIndex = noteNames.indexOf(rootNote)
    return scaleFormula.map((interval) =>
      noteNames[(rootIndex + interval) % 12]
    )
  }, [rootNote, scaleFormula])

  return {
    // State
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

    // Handlers
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

    // Derived
    scaleNotes,
    scaleFormula,
  }
}

export type UseFretboardAppReturn = ReturnType<typeof useFretboardApp>
```

**Step 4: Run test to verify it passes**

Run: `pnpm test:run src/hooks/useFretboardApp.test.ts`
Expected: 5 tests PASS

**Step 5: Commit**

```bash
git add src/hooks/useFretboardApp.ts src/hooks/useFretboardApp.test.ts
git commit -m "feat: add useFretboardApp hook with all app state and handlers"
```

---

### Task 5: Refactor page.tsx to Use Hooks

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Refactor page.tsx**

```typescript
// src/app/page.tsx
'use client'

import Fretboard from '@/components/Fretboard'
import ScaleSelector from '@/components/ScaleSelector'
import PositionSelector from '@/components/PositionSelector'
import { LiveRegion } from '@/components/LiveRegion'
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

  // Keyboard shortcut handlers
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
                {scaleFormula.map((i) => {
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

        {/* Quick Scale Buttons */}
        <section aria-label="Quick scale reference">
          <div className="mt-6 md:mt-8 bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800">
            <h3 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4">Quick Scale Reference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              <QuickScaleButton
                label="A Minor Pentatonic"
                description="The essential blues/rock scale"
                onClick={() => { handleScaleChange('minorPentatonic'); handleRootChange('A') }}
              />
              <QuickScaleButton
                label="E Blues Scale"
                description="Classic blues with the b5"
                onClick={() => { handleScaleChange('blues'); handleRootChange('E') }}
              />
              <QuickScaleButton
                label="C Major Scale"
                description="The foundation of music theory"
                onClick={() => { handleScaleChange('major'); handleRootChange('C') }}
              />
              <QuickScaleButton
                label="D Dorian Mode"
                description="Jazz and funk favorite"
                onClick={() => { handleScaleChange('dorian'); handleRootChange('D') }}
              />
              <QuickScaleButton
                label="Minor Pent. Forms"
                description="Fret Science (minor)"
                onClick={() => { handleScaleChange('pentatonicForms'); handleRootChange('A') }}
                accentColor="emerald"
              />
              <QuickScaleButton
                label="Major Pent. Forms"
                description="Fret Science (major)"
                onClick={() => { handleScaleChange('pentatonicFormsMajor'); handleRootChange('C') }}
                accentColor="emerald"
              />
            </div>
          </div>
        </section>
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

// Extracted component to avoid inline functions in JSX
interface QuickScaleButtonProps {
  label: string
  description: string
  onClick: () => void
  accentColor?: 'red' | 'emerald'
}

function QuickScaleButton({ label, description, onClick, accentColor = 'red' }: QuickScaleButtonProps) {
  const hoverColor = accentColor === 'emerald' ? 'group-hover:text-emerald-400' : 'group-hover:text-red-400'

  return (
    <button
      onClick={onClick}
      className="text-left p-3 md:p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group"
    >
      <span className={`text-white text-sm md:text-base font-medium ${hoverColor} transition-colors`}>
        {label}
      </span>
      <p className="text-zinc-500 text-xs md:text-sm mt-1">{description}</p>
    </button>
  )
}
```

**Step 2: Run existing tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 3: Verify app still works**

Run: `pnpm dev`
Expected: App runs without errors, same functionality

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "refactor: extract state and handlers to useFretboardApp hook"
```

---

## Phase 3: Split Music Theory Module

### Task 6: Create Music Theory Types

**Files:**
- Create: `src/lib/music-theory/types.ts`

**Step 1: Create types file**

```typescript
// src/lib/music-theory/types.ts
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

export type InstrumentType = '4-string' | '6-string' | '7-string' | '8-string'

export interface TuningConfig {
  notes: Note[]
  name: string
  stringCount: number
}

export const CAGED_SHAPES = ['C', 'A', 'G', 'E', 'D'] as const
export type CAGEDShape = typeof CAGED_SHAPES[number]

export interface ChordVoicing {
  frets: (number | 'x')[]
  fingers: (number | null)[]
  baseFret: number
  barre?: number
  shape: CAGEDShape
  rootString: number
  rootFret: number
}

export interface ChordProgression {
  name: string
  degreesMajor: number[]
  degreesMinor: number[]
  description: string
}
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/types.ts
git commit -m "refactor: extract music theory types to separate module"
```

---

### Task 7: Create Notes Module

**Files:**
- Create: `src/lib/music-theory/notes.ts`

**Step 1: Create notes file**

```typescript
// src/lib/music-theory/notes.ts
export { NOTES, type Note } from './types'
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/notes.ts
git commit -m "refactor: create notes module re-export"
```

---

### Task 8: Create Tunings Module

**Files:**
- Create: `src/lib/music-theory/tunings.ts`

**Step 1: Create tunings file**

```typescript
// src/lib/music-theory/tunings.ts
import { Note, TuningConfig, InstrumentType } from './types'

export const INSTRUMENT_NAMES: Record<InstrumentType, string> = {
  '4-string': '4-String Bass',
  '6-string': '6-String Guitar',
  '7-string': '7-String Guitar',
  '8-string': '8-String Guitar',
}

export const TUNING_CONFIGS: Record<string, TuningConfig> = {
  // 4-string bass tunings
  bassStandard: { notes: ['E', 'A', 'D', 'G'], name: 'Bass Standard (E-A-D-G)', stringCount: 4 },
  bassDropD: { notes: ['D', 'A', 'D', 'G'], name: 'Bass Drop D (D-A-D-G)', stringCount: 4 },
  bassDStandard: { notes: ['D', 'G', 'C', 'F'], name: 'Bass D Standard (D-G-C-F)', stringCount: 4 },

  // 6-string guitar tunings
  standard: { notes: ['E', 'A', 'D', 'G', 'B', 'E'], name: 'Standard (E-A-D-G-B-E)', stringCount: 6 },
  dropD: { notes: ['D', 'A', 'D', 'G', 'B', 'E'], name: 'Drop D (D-A-D-G-B-E)', stringCount: 6 },
  dStandard: { notes: ['D', 'G', 'C', 'F', 'A', 'D'], name: 'D Standard (D-G-C-F-A-D)', stringCount: 6 },
  dropC: { notes: ['C', 'G', 'C', 'F', 'A', 'D'], name: 'Drop C (C-G-C-F-A-D)', stringCount: 6 },
  openG: { notes: ['D', 'G', 'D', 'G', 'B', 'D'], name: 'Open G (D-G-D-G-B-D)', stringCount: 6 },
  openD: { notes: ['D', 'A', 'D', 'F#', 'A', 'D'], name: 'Open D (D-A-D-F#-A-D)', stringCount: 6 },

  // 7-string guitar tunings
  standard7: { notes: ['B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '7-String Standard (B-E-A-D-G-B-E)', stringCount: 7 },
  dropA7: { notes: ['A', 'E', 'A', 'D', 'G', 'B', 'E'], name: '7-String Drop A (A-E-A-D-G-B-E)', stringCount: 7 },
  aStandard7: { notes: ['A', 'D', 'G', 'C', 'F', 'A', 'D'], name: '7-String A Standard (A-D-G-C-F-A-D)', stringCount: 7 },

  // 8-string guitar tunings
  standard8: { notes: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '8-String Standard (F#-B-E-A-D-G-B-E)', stringCount: 8 },
  dropE8: { notes: ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'], name: '8-String Drop E (E-B-E-A-D-G-B-E)', stringCount: 8 },
  eStandard8: { notes: ['E', 'A', 'D', 'G', 'C', 'F', 'A', 'D'], name: '8-String E Standard (E-A-D-G-C-F-A-D)', stringCount: 8 },
}

export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

export function getTuningsByStringCount(stringCount: number): Record<string, TuningConfig> {
  return Object.fromEntries(
    Object.entries(TUNING_CONFIGS).filter(([, config]) => config.stringCount === stringCount)
  )
}

export function getDefaultTuning(stringCount: number): string {
  const defaults: Record<number, string> = {
    4: 'bassStandard',
    6: 'standard',
    7: 'standard7',
    8: 'standard8',
  }
  return defaults[stringCount] || 'standard'
}

// Legacy exports for backwards compatibility
export const TUNINGS: Record<string, Note[]> = Object.fromEntries(
  Object.entries(TUNING_CONFIGS).map(([key, config]) => [key, config.notes])
)

export const TUNING_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(TUNING_CONFIGS).map(([key, config]) => [key, config.name])
)
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/tunings.ts
git commit -m "refactor: extract tunings to separate module"
```

---

### Task 9: Create Scales Module

**Files:**
- Create: `src/lib/music-theory/scales.ts`

**Step 1: Create scales file (content from original music-theory.ts lines 75-261)**

```typescript
// src/lib/music-theory/scales.ts
export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  minorPentatonic: [0, 3, 5, 7, 10],
  pentatonicForms: [0, 3, 5, 7, 10],
  pentatonicFormsMajor: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
}

export const SCALE_NAMES: Record<string, string> = {
  major: 'Major',
  minor: 'Natural Minor',
  majorPentatonic: 'Major Pentatonic',
  minorPentatonic: 'Minor Pentatonic',
  pentatonicForms: 'Minor Pentatonic Forms (Fret Science)',
  pentatonicFormsMajor: 'Major Pentatonic Forms (Fret Science)',
  blues: 'Blues',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',
  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',
}

export const SCALE_POSITIONS: Record<string, { start: number; end: number; name?: string }[]> = {
  minorPentatonic: [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 5, end: 8 },
    { start: 7, end: 10 },
    { start: 10, end: 13 },
  ],
  majorPentatonic: [
    { start: 0, end: 4 },
    { start: 2, end: 5 },
    { start: 4, end: 7 },
    { start: 7, end: 10 },
    { start: 9, end: 12 },
  ],
  pentatonicForms: [
    { start: 0, end: 3, name: 'Form 1 (Box)' },
    { start: 2, end: 5, name: 'Form 2' },
    { start: 4, end: 8, name: 'Form 3' },
    { start: 7, end: 10, name: 'Form 4' },
    { start: 9, end: 12, name: 'Form 5' },
  ],
  pentatonicFormsMajor: [
    { start: -3, end: 0, name: 'Form 1' },
    { start: -1, end: 2, name: 'Form 2' },
    { start: 1, end: 5, name: 'Form 3' },
    { start: 4, end: 7, name: 'Form 4' },
    { start: 6, end: 9, name: 'Form 5' },
  ],
  blues: [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 5, end: 8 },
    { start: 7, end: 10 },
    { start: 10, end: 13 },
  ],
  major: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
  minor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  dorian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 10, end: 14 },
  ],
  phrygian: [
    { start: 0, end: 4 },
    { start: 1, end: 5 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  lydian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 6, end: 10 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
  mixolydian: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 4, end: 8 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 10, end: 14 },
  ],
  locrian: [
    { start: 0, end: 4 },
    { start: 1, end: 5 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 6, end: 10 },
    { start: 8, end: 12 },
    { start: 10, end: 14 },
  ],
  harmonicMinor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 8, end: 12 },
    { start: 11, end: 15 },
  ],
  melodicMinor: [
    { start: 0, end: 4 },
    { start: 2, end: 6 },
    { start: 3, end: 7 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 9, end: 13 },
    { start: 11, end: 15 },
  ],
}

export function getPositionCount(scale: string): number {
  return SCALE_POSITIONS[scale]?.length || 5
}
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/scales.ts
git commit -m "refactor: extract scales to separate module"
```

---

### Task 10: Create Intervals Module

**Files:**
- Create: `src/lib/music-theory/intervals.ts`

**Step 1: Create intervals file**

```typescript
// src/lib/music-theory/intervals.ts
import { Note, NOTES } from './types'

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7',
}

export const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
export const DOUBLE_MARKERS = [12, 24]

export function getInterval(rootNote: Note, note: Note): number {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  return (noteIndex - rootIndex + 12) % 12
}

export function getIntervalName(rootNote: Note, note: Note): string {
  const interval = getInterval(rootNote, note)
  return INTERVAL_NAMES[interval] || ''
}

export function getNoteAtFret(openNote: Note, fret: number): Note {
  const startIndex = NOTES.indexOf(openNote)
  return NOTES[(startIndex + fret) % 12]
}

export function isNoteInScale(note: Note, rootNote: Note, scaleFormula: number[]): boolean {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  const interval = (noteIndex - rootIndex + 12) % 12
  return scaleFormula.includes(interval)
}

export function getScaleDegree(note: Note, rootNote: Note, scaleFormula: number[]): number {
  const interval = getInterval(rootNote, note)
  return scaleFormula.indexOf(interval) + 1
}

export function getRootFret(rootNote: Note, tuning: Note[]): number {
  const lowestString = tuning[0]
  const openNoteIndex = NOTES.indexOf(lowestString)
  const rootIndex = NOTES.indexOf(rootNote)
  return (rootIndex - openNoteIndex + 12) % 12
}
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/intervals.ts
git commit -m "refactor: extract intervals to separate module"
```

---

### Task 11: Create Chords Module

**Files:**
- Create: `src/lib/music-theory/chords.ts`

**Step 1: Create chords file (content from original music-theory.ts lines 304-693)**

This is a large file - copy the chord-related code from the original `music-theory.ts`:
- Lines 304-337: CAGED_POSITION_MAP
- Lines 339-358: Chord intervals and quality functions
- Lines 360-605: MAJOR_VOICINGS, MINOR_VOICINGS
- Lines 607-693: getChordVoicing, getAllChordVoicings

```typescript
// src/lib/music-theory/chords.ts
import { Note, NOTES, CAGEDShape, ChordVoicing } from './types'
import { SCALES, SCALE_POSITIONS } from './scales'
import { STANDARD_TUNING } from './tunings'
import { getRootFret } from './intervals'

// [Full content from original file - too long to include here]
// Copy lines 304-693 from the original music-theory.ts
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/chords.ts
git commit -m "refactor: extract chords to separate module"
```

---

### Task 12: Create Progressions Module

**Files:**
- Create: `src/lib/music-theory/progressions.ts`

**Step 1: Create progressions file (content from original music-theory.ts lines 695-931)**

```typescript
// src/lib/music-theory/progressions.ts
import { Note, NOTES, ChordProgression, ChordVoicing, CAGEDShape } from './types'
import { SCALES, SCALE_POSITIONS } from './scales'
import { STANDARD_TUNING } from './tunings'
import { getRootFret } from './intervals'
import { getChordQuality, MINOR_VOICINGS, MAJOR_VOICINGS } from './chords'

export const CHORD_PROGRESSIONS: Record<string, ChordProgression> = {
  '1-4-5': {
    name: 'I-IV-V',
    degreesMajor: [1, 4, 5],
    degreesMinor: [1, 4, 5],
    description: 'Classic rock and blues progression'
  },
  '1-5-6-4': {
    name: 'I-V-vi-IV',
    degreesMajor: [1, 5, 6, 4],
    degreesMinor: [1, 5, 6, 4],
    description: 'Popular pop progression'
  },
  '6-4-1-5': {
    name: 'vi-IV-I-V',
    degreesMajor: [6, 4, 1, 5],
    degreesMinor: [6, 4, 1, 5],
    description: 'Emotional/sad progression'
  },
  '2-5-1': {
    name: 'ii-V-I',
    degreesMajor: [2, 5, 1],
    degreesMinor: [2, 5, 1],
    description: 'Jazz turnaround'
  },
  '1-6-4-5': {
    name: 'I-vi-IV-V',
    degreesMajor: [1, 6, 4, 5],
    degreesMinor: [1, 6, 4, 5],
    description: '50s doo-wop progression'
  },
  '1-4-1-5': {
    name: 'I-IV-I-V',
    degreesMajor: [1, 4, 1, 5],
    degreesMinor: [1, 4, 1, 5],
    description: 'Simple blues progression'
  }
}

// [Copy remaining progression functions from original file lines 742-931]
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/progressions.ts
git commit -m "refactor: extract progressions to separate module"
```

---

### Task 13: Create Index Re-exports

**Files:**
- Create: `src/lib/music-theory/index.ts`
- Delete: `src/lib/music-theory.ts` (after verification)

**Step 1: Create index file**

```typescript
// src/lib/music-theory/index.ts
// Types
export { NOTES, type Note, type InstrumentType, type TuningConfig, CAGED_SHAPES, type CAGEDShape, type ChordVoicing, type ChordProgression } from './types'

// Notes
export * from './notes'

// Tunings
export { INSTRUMENT_NAMES, TUNING_CONFIGS, STANDARD_TUNING, getTuningsByStringCount, getDefaultTuning, TUNINGS, TUNING_NAMES } from './tunings'

// Scales
export { SCALES, SCALE_NAMES, SCALE_POSITIONS, getPositionCount } from './scales'

// Intervals
export { INTERVAL_NAMES, FRET_MARKERS, DOUBLE_MARKERS, getInterval, getIntervalName, getNoteAtFret, isNoteInScale, getScaleDegree, getRootFret } from './intervals'

// Chords
export { CAGED_POSITION_MAP, MAJOR_CHORD_INTERVALS, MINOR_CHORD_INTERVALS, getChordQuality, getChordIntervals, getCAGEDShape, getChordNameForPosition, MAJOR_VOICINGS, MINOR_VOICINGS, getChordVoicing, getAllChordVoicings } from './chords'

// Progressions
export { CHORD_PROGRESSIONS, getChordRootForDegree, getProgressionChordVoicing, getAllProgressionChordVoicings, getProgressionChordName } from './progressions'
```

**Step 2: Update imports across codebase**

Update all files that import from `@/lib/music-theory` - they should continue to work without changes due to re-exports.

**Step 3: Run tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 4: Delete old file**

```bash
rm src/lib/music-theory.ts
```

**Step 5: Run tests again**

Run: `pnpm test:run`
Expected: All tests still pass

**Step 6: Commit**

```bash
git add src/lib/music-theory/
git rm src/lib/music-theory.ts
git commit -m "refactor: complete music-theory module split with index re-exports"
```

---

## Phase 4: Refactor Fretboard Component

### Task 14: Extract NoteMarker Component

**Files:**
- Create: `src/components/Fretboard/NoteMarker.tsx`
- Create: `src/components/Fretboard/NoteMarker.styles.ts`

**Step 1: Create styles file**

```typescript
// src/components/Fretboard/NoteMarker.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'h-8 w-8 flex items-center justify-center relative z-10',

  mutedMarker: cn(
    'h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center',
    'rounded-full bg-zinc-700/30 text-xs font-bold text-zinc-400'
  ),

  emptyDot: cn(
    'h-2 w-2 rounded-full bg-zinc-700/30',
    'hover:bg-zinc-600/50 cursor-pointer transition-colors'
  ),

  noteButton: (isRoot: boolean, isSelected: boolean) => cn(
    'h-7 w-7 sm:h-8 sm:w-8 md:h-7 md:w-7 rounded-full',
    'flex items-center justify-center',
    'text-xs font-bold text-white shadow-md',
    'transition-all duration-150 cursor-pointer',
    isRoot && 'scale-110',
    isSelected && 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
  ),

  // Color variants
  colors: {
    root: 'bg-red-500 hover:bg-red-400',
    rootChord: 'bg-orange-500 hover:bg-orange-400',
    third: 'bg-green-500 hover:bg-green-400',
    fifth: 'bg-blue-500 hover:bg-blue-400',
    seventh: 'bg-purple-500 hover:bg-purple-400',
    blueNote: 'bg-cyan-500 hover:bg-cyan-400',
    default: 'bg-zinc-500 hover:bg-zinc-400',
    chordTone: 'bg-slate-600 hover:bg-slate-500',
  }
}
```

**Step 2: Create component file**

```typescript
// src/components/Fretboard/NoteMarker.tsx
'use client'

import { Note, NOTES, getIntervalName } from '@/lib/music-theory'
import { styles } from './NoteMarker.styles'
import { cn } from '@/lib/utils'

type DisplayMode = 'notes' | 'intervals' | 'degrees'

interface NoteMarkerProps {
  note: Note
  isRoot: boolean
  inScale: boolean
  interval: number
  degree: number
  displayMode: DisplayMode
  isNut?: boolean
  onClick?: () => void
  isSelected?: boolean
  fingerNumber?: number | null
  isMuted?: boolean
  showFingerings?: boolean
}

export function NoteMarker({
  note,
  isRoot,
  inScale,
  interval,
  degree,
  displayMode,
  isNut = false,
  onClick,
  isSelected,
  fingerNumber,
  isMuted = false,
  showFingerings = true,
}: NoteMarkerProps) {
  // Handle muted strings
  if (isMuted && isNut) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mutedMarker}>X</div>
      </div>
    )
  }

  if (isMuted) {
    return <div className={styles.wrapper} />
  }

  if (!inScale) {
    return (
      <div className={styles.wrapper}>
        {isNut ? (
          <div
            className={styles.emptyDot}
            onClick={onClick}
            title={note}
          />
        ) : null}
      </div>
    )
  }

  const getBackgroundColor = () => {
    if (fingerNumber !== undefined && showFingerings) {
      if (isRoot) return styles.colors.rootChord
      return styles.colors.chordTone
    }

    if (isRoot) return styles.colors.root
    if (interval === 4 || interval === 3) return styles.colors.third
    if (interval === 7) return styles.colors.fifth
    if (interval === 10 || interval === 11) return styles.colors.seventh
    if (interval === 6) return styles.colors.blueNote
    return styles.colors.default
  }

  const getDisplayText = () => {
    if (fingerNumber !== undefined) {
      if (showFingerings) {
        if (fingerNumber !== null) return fingerNumber.toString()
        if (fingerNumber === null && isNut) return 'O'
      }
    }

    switch (displayMode) {
      case 'intervals':
        return getIntervalName(NOTES[0] as Note, NOTES[interval] as Note) || 'R'
      case 'degrees':
        return degree > 0 ? degree.toString() : ''
      default:
        return note
    }
  }

  const intervalName = getIntervalName(NOTES[0] as Note, NOTES[interval] as Note)

  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        className={cn(styles.noteButton(isRoot, !!isSelected), getBackgroundColor())}
        aria-label={`${note} - ${intervalName}`}
        aria-pressed={isSelected}
      >
        {getDisplayText()}
      </button>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Fretboard/NoteMarker.tsx src/components/Fretboard/NoteMarker.styles.ts
git commit -m "refactor: extract NoteMarker component with styles"
```

---

### Task 15: Extract FretMarker Component

**Files:**
- Create: `src/components/Fretboard/FretMarker.tsx`
- Create: `src/components/Fretboard/FretMarker.styles.ts`

**Step 1: Create styles file**

```typescript
// src/components/Fretboard/FretMarker.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'absolute inset-0 flex items-center justify-center pointer-events-none',

  doubleMarkerContainer: 'flex gap-4',

  marker: 'h-3 w-3 rounded-full bg-amber-200/20',
}
```

**Step 2: Create component file**

```typescript
// src/components/Fretboard/FretMarker.tsx
import { FRET_MARKERS, DOUBLE_MARKERS } from '@/lib/music-theory'
import { styles } from './FretMarker.styles'

interface FretMarkerProps {
  fret: number
}

export function FretMarker({ fret }: FretMarkerProps) {
  const isDouble = DOUBLE_MARKERS.includes(fret)
  const hasMarker = FRET_MARKERS.includes(fret)

  if (!hasMarker) return null

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {isDouble ? (
        <div className={styles.doubleMarkerContainer}>
          <div className={styles.marker} />
          <div className={styles.marker} />
        </div>
      ) : (
        <div className={styles.marker} />
      )}
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Fretboard/FretMarker.tsx src/components/Fretboard/FretMarker.styles.ts
git commit -m "refactor: extract FretMarker component with styles"
```

---

### Task 16: Create useFretboard Hook

**Files:**
- Create: `src/components/Fretboard/useFretboard.ts`

**Step 1: Create hook**

Extract logic from Fretboard.tsx lines 195-355 into this hook.

```typescript
// src/components/Fretboard/useFretboard.ts
'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import {
  Note,
  SCALES,
  SCALE_POSITIONS,
  getRootFret,
  getChordIntervals,
  getChordVoicing,
  getAllChordVoicings,
  ChordVoicing,
  getProgressionChordVoicing,
  getAllProgressionChordVoicings,
  getChordQuality,
  getChordRootForDegree,
  CHORD_PROGRESSIONS,
  isNoteInScale,
  getInterval,
} from '@/lib/music-theory'

// [Full hook implementation - extract from Fretboard.tsx]
```

**Step 2: Commit**

```bash
git add src/components/Fretboard/useFretboard.ts
git commit -m "refactor: extract useFretboard hook"
```

---

### Task 17: Create Fretboard Styles

**Files:**
- Create: `src/components/Fretboard/Fretboard.styles.ts`

**Step 1: Create styles file**

```typescript
// src/components/Fretboard/Fretboard.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'w-full relative',

  scrollIndicatorLeft: cn(
    'absolute left-0 top-0 bottom-0 w-8',
    'bg-gradient-to-r from-zinc-900 to-transparent',
    'pointer-events-none z-20 opacity-0 transition-opacity'
  ),

  scrollIndicatorRight: cn(
    'absolute right-0 top-0 bottom-0 w-8',
    'bg-gradient-to-l from-zinc-900 to-transparent',
    'pointer-events-none z-20'
  ),

  scrollContainer: 'w-full overflow-x-auto',

  innerContainer: 'inline-block min-w-full p-3 md:p-4',

  fretboardContainer: 'relative rounded-lg overflow-hidden',

  stringLabels: cn(
    'absolute left-0 top-0 bottom-0 w-10',
    'flex flex-col justify-around py-2 bg-zinc-900/50 z-10'
  ),

  stringLabel: 'h-8 flex items-center justify-center text-xs font-mono text-zinc-300',

  mainArea: 'flex ml-10',

  nut: 'flex flex-col justify-around py-2 px-1 bg-zinc-200 border-r-4 border-zinc-400',

  fret: 'relative flex flex-col justify-around py-2 border-r-2 border-zinc-400/60',

  fretNumber: 'absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-500 font-mono',

  stringLine: 'absolute inset-x-0 top-1/2 -translate-y-1/2 h-px',

  legend: 'mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center text-xs md:text-sm',

  legendItem: 'flex items-center gap-2 transition-transform hover:scale-110 cursor-default',

  legendDot: (color: string) => `h-4 w-4 rounded-full ${color}`,

  chordNameDisplay: 'mt-6 text-center',

  chordNameBox: cn(
    'inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg',
    'bg-zinc-800/50 border border-zinc-700'
  ),

  chordNameLabel: 'text-xs md:text-sm text-zinc-500 uppercase tracking-wide mb-1',

  chordNameValue: 'text-2xl md:text-3xl font-bold text-white',

  mobileHint: 'text-xs text-zinc-500 text-center mt-3 md:hidden',

  emptyState: 'w-full flex items-center justify-center h-64 animate-fade-in',

  emptyStateContent: 'text-center space-y-4 max-w-md px-4',

  emptyStateIcon: 'h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center',
}
```

**Step 2: Commit**

```bash
git add src/components/Fretboard/Fretboard.styles.ts
git commit -m "refactor: create Fretboard styles file"
```

---

### Task 18: Refactor Fretboard Component

**Files:**
- Modify: `src/components/Fretboard/Fretboard.tsx`
- Create: `src/components/Fretboard/index.ts`

**Step 1: Refactor Fretboard.tsx to use extracted components and hook**

The new Fretboard.tsx should:
- Import NoteMarker, FretMarker from local files
- Import styles from Fretboard.styles.ts
- Use useFretboard hook
- Be ~150 lines (render only)

**Step 2: Create index.ts**

```typescript
// src/components/Fretboard/index.ts
export { default } from './Fretboard'
export { NoteMarker } from './NoteMarker'
export { FretMarker } from './FretMarker'
export { useFretboard } from './useFretboard'
```

**Step 3: Run tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 4: Commit**

```bash
git add src/components/Fretboard/
git commit -m "refactor: complete Fretboard component refactor with hooks and styles"
```

---

## Phase 5: Remaining Components

### Task 19-22: Refactor ScaleSelector, PositionSelector, LiveRegion

For each component, create:
- `ComponentName.styles.ts` - Tailwind compositions
- Update component to use styles
- Create `index.ts` re-export

Follow same pattern as Fretboard refactor.

---

## Phase 6: Final Cleanup

### Task 23: Final Verification

**Step 1: Run all tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 2: Run linter**

Run: `pnpm lint`
Expected: No errors

**Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds

**Step 4: Manual verification**

Run: `pnpm dev`
Verify: All features work as before

**Step 5: Final commit**

```bash
git add .
git commit -m "refactor: complete component structure refactor per Claude rules"
```

---

## Summary

| Phase | Tasks | Commits |
|-------|-------|---------|
| 1. Setup | 2 | 2 |
| 2. Hooks | 3 | 3 |
| 3. Music Theory | 8 | 8 |
| 4. Fretboard | 5 | 5 |
| 5. Other Components | 4 | 4 |
| 6. Cleanup | 1 | 1 |
| **Total** | **23** | **23** |
