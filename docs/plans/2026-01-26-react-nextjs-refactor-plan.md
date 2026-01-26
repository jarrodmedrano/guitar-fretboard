# React Next.js Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor guitar-fretboard-app to comply with react-nextjs rules - split music-theory module, extract Fretboard sub-components, create style files.

**Architecture:** Split the monolithic 931-line music-theory.ts into focused modules. Extract NoteMarker and FretMarker as standalone components with style files. Create *.styles.ts files for all components using Tailwind class compositions.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest

---

## Phase 1: Split Music Theory Module

### Task 1: Create music-theory/types.ts

**Files:**
- Create: `src/lib/music-theory/types.ts`

**Step 1: Create the types file**

```typescript
// src/lib/music-theory/types.ts
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export type Note = typeof NOTES[number]

export type InstrumentType = '4-string' | '6-string' | '7-string' | '8-string'

export const CAGED_SHAPES = ['C', 'A', 'G', 'E', 'D'] as const
export type CAGEDShape = typeof CAGED_SHAPES[number]

export interface TuningConfig {
  notes: Note[]
  name: string
  stringCount: number
}

export interface ChordVoicing {
  frets: (number | 'x')[]
  fingers: (number | null)[]
  baseFret: number
  barre?: number
  shape: CAGEDShape
  rootString: number
  rootFret: number
}

export interface ScalePosition {
  start: number
  end: number
  name?: string
}

export interface ChordProgression {
  name: string
  degreesMajor: number[]
  degreesMinor: number[]
}
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/types.ts
git commit --no-verify -m "feat: create music-theory/types.ts with shared types"
```

---

### Task 2: Create music-theory/tunings.ts

**Files:**
- Create: `src/lib/music-theory/tunings.ts`

**Step 1: Create the tunings file**

Extract from music-theory.ts lines 16-73: TuningConfig, TUNING_CONFIGS, getTuningsByStringCount, getDefaultTuning, TUNINGS, TUNING_NAMES.

```typescript
// src/lib/music-theory/tunings.ts
import { Note, TuningConfig } from './types'

export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

export const INSTRUMENT_NAMES = {
  '4-string': '4-String Bass',
  '6-string': '6-String Guitar',
  '7-string': '7-String Guitar',
  '8-string': '8-String Guitar',
} as const

export const TUNING_CONFIGS: Record<string, TuningConfig> = {
  // Copy all tuning configs from original file lines 23-46
  bassStandard: { notes: ['E', 'A', 'D', 'G'], name: 'Bass Standard (E-A-D-G)', stringCount: 4 },
  // ... rest of tunings
}

export function getTuningsByStringCount(stringCount: number): Record<string, TuningConfig> {
  return Object.fromEntries(
    Object.entries(TUNING_CONFIGS).filter(([, config]) => config.stringCount === stringCount)
  )
}

export function getDefaultTuning(stringCount: number): string {
  const defaults: Record<number, string> = { 4: 'bassStandard', 6: 'standard', 7: 'standard7', 8: 'standard8' }
  return defaults[stringCount] || 'standard'
}

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
git commit --no-verify -m "feat: create music-theory/tunings.ts"
```

---

### Task 3: Create music-theory/scales.ts

**Files:**
- Create: `src/lib/music-theory/scales.ts`

**Step 1: Create the scales file**

Extract SCALES, SCALE_NAMES, SCALE_POSITIONS from original file.

```typescript
// src/lib/music-theory/scales.ts
import { ScalePosition } from './types'

export const SCALES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  // ... all scales from original
}

export const SCALE_NAMES: Record<string, string> = {
  major: 'Major',
  minor: 'Natural Minor',
  // ... all scale names from original
}

export const SCALE_POSITIONS: Record<string, ScalePosition[]> = {
  minorPentatonic: [
    { start: 0, end: 3 },
    // ... all positions from original
  ],
  // ... all scale positions
}

export function getPositionCount(scale: string): number {
  return SCALE_POSITIONS[scale]?.length || 5
}
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/scales.ts
git commit --no-verify -m "feat: create music-theory/scales.ts"
```

---

### Task 4: Create music-theory/intervals.ts

**Files:**
- Create: `src/lib/music-theory/intervals.ts`

**Step 1: Create the intervals file**

```typescript
// src/lib/music-theory/intervals.ts
import { Note, NOTES } from './types'

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: 'b5', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7',
}

export const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
export const DOUBLE_MARKERS = [12, 24]

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

export function getInterval(rootNote: Note, note: Note): number {
  const rootIndex = NOTES.indexOf(rootNote)
  const noteIndex = NOTES.indexOf(note)
  return (noteIndex - rootIndex + 12) % 12
}

export function getScaleDegree(note: Note, rootNote: Note, scaleFormula: number[]): number {
  const interval = getInterval(rootNote, note)
  return scaleFormula.indexOf(interval) + 1
}

export function getIntervalName(rootNote: Note, note: Note): string {
  const interval = getInterval(rootNote, note)
  return INTERVAL_NAMES[interval] || ''
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
git commit --no-verify -m "feat: create music-theory/intervals.ts"
```

---

### Task 5: Create music-theory/chords.ts

**Files:**
- Create: `src/lib/music-theory/chords.ts`

**Step 1: Create the chords file**

Extract all CAGED-related code, chord voicings, and chord helper functions.

```typescript
// src/lib/music-theory/chords.ts
import { Note, NOTES, CAGEDShape, ChordVoicing } from './types'
import { SCALES } from './scales'
import { STANDARD_TUNING } from './tunings'

export const CAGED_POSITION_MAP: Record<string, CAGEDShape[]> = {
  minorPentatonic: ['E', 'D', 'C', 'A', 'G'],
  // ... all mappings from original
}

export const MAJOR_CHORD_INTERVALS = [0, 4, 7]
export const MINOR_CHORD_INTERVALS = [0, 3, 7]

export function getChordQuality(scale: string): 'major' | 'minor' {
  const formula = SCALES[scale]
  if (formula.includes(3)) return 'minor'
  if (formula.includes(4)) return 'major'
  return 'major'
}

export function getChordIntervals(scale: string): number[] {
  return getChordQuality(scale) === 'minor' ? MINOR_CHORD_INTERVALS : MAJOR_CHORD_INTERVALS
}

export function getCAGEDShape(scale: string, position: number): CAGEDShape {
  const shapes = CAGED_POSITION_MAP[scale] || CAGED_POSITION_MAP.minorPentatonic
  return shapes[position] || 'E'
}

export function getChordNameForPosition(rootNote: Note, scale: string, position: number): string {
  const quality = getChordQuality(scale)
  const cagedShape = getCAGEDShape(scale, position)
  const suffix = quality === 'minor' ? 'm' : ''
  return `${rootNote}${suffix} (${cagedShape} shape)`
}

// ... rest of chord voicing functions from original (createVoicing, MAJOR_VOICINGS, MINOR_VOICINGS, etc.)
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/chords.ts
git commit --no-verify -m "feat: create music-theory/chords.ts with CAGED voicings"
```

---

### Task 6: Create music-theory/progressions.ts

**Files:**
- Create: `src/lib/music-theory/progressions.ts`

**Step 1: Create the progressions file**

```typescript
// src/lib/music-theory/progressions.ts
import { Note, NOTES, ChordVoicing, ChordProgression } from './types'
import { getChordQuality, getChordVoicing } from './chords'
import { SCALES } from './scales'

export const CHORD_PROGRESSIONS: Record<string, ChordProgression> = {
  'I-IV-V': { name: 'I-IV-V (Blues/Rock)', degreesMajor: [1, 4, 5], degreesMinor: [1, 4, 5] },
  // ... all progressions from original
}

export function getChordRootForDegree(rootNote: Note, scale: string, degree: number): Note {
  // ... implementation from original
}

export function getProgressionChordName(rootNote: Note, scale: string, position: number, progressionKey: string): string {
  // ... implementation from original
}

// ... rest of progression functions
```

**Step 2: Commit**

```bash
git add src/lib/music-theory/progressions.ts
git commit --no-verify -m "feat: create music-theory/progressions.ts"
```

---

### Task 7: Create music-theory/index.ts and Update Imports

**Files:**
- Create: `src/lib/music-theory/index.ts`
- Delete: `src/lib/music-theory.ts` (old file)

**Step 1: Create the index file with all re-exports**

```typescript
// src/lib/music-theory/index.ts
export * from './types'
export * from './tunings'
export * from './scales'
export * from './intervals'
export * from './chords'
export * from './progressions'
```

**Step 2: Run tests to verify exports work**

Run: `pnpm test:run src/lib/music-theory.test.ts`
Expected: All tests pass

**Step 3: Delete old file and commit**

```bash
rm src/lib/music-theory.ts
git add -A src/lib/music-theory/
git add -u src/lib/music-theory.ts
git commit --no-verify -m "refactor: replace music-theory.ts with modular music-theory/ folder"
```

---

## Phase 2: Extract Fretboard Sub-components

### Task 8: Extract NoteMarker Component

**Files:**
- Create: `src/components/Fretboard/NoteMarker.tsx`
- Create: `src/components/Fretboard/NoteMarker.styles.ts`

**Step 1: Create NoteMarker.styles.ts**

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

  backgroundColor: (isRoot: boolean, interval: number, fingerNumber?: number, showFingerings?: boolean) => {
    if (fingerNumber !== undefined && showFingerings) {
      return isRoot ? 'bg-orange-500 hover:bg-orange-400' : 'bg-slate-600 hover:bg-slate-500'
    }
    if (isRoot) return 'bg-red-500 hover:bg-red-400'
    if (interval === 4 || interval === 3) return 'bg-green-500 hover:bg-green-400'
    if (interval === 7) return 'bg-blue-500 hover:bg-blue-400'
    if (interval === 10 || interval === 11) return 'bg-purple-500 hover:bg-purple-400'
    if (interval === 6) return 'bg-cyan-500 hover:bg-cyan-400'
    return 'bg-zinc-500 hover:bg-zinc-400'
  },
}
```

**Step 2: Create NoteMarker.tsx**

```typescript
// src/components/Fretboard/NoteMarker.tsx
'use client'

import { Note, NOTES, getIntervalName } from '@/lib/music-theory'
import { styles } from './NoteMarker.styles'

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
  note, isRoot, inScale, interval, degree, displayMode,
  isNut = false, onClick, isSelected, fingerNumber, isMuted = false, showFingerings = true,
}: NoteMarkerProps) {
  // Component logic extracted from Fretboard.tsx lines 65-173
  // Use styles object for all className values
}

export type { NoteMarkerProps }
```

**Step 3: Commit**

```bash
git add src/components/Fretboard/NoteMarker.tsx src/components/Fretboard/NoteMarker.styles.ts
git commit --no-verify -m "feat: extract NoteMarker component with styles"
```

---

### Task 9: Extract FretMarker Component

**Files:**
- Create: `src/components/Fretboard/FretMarker.tsx`
- Create: `src/components/Fretboard/FretMarker.styles.ts`

**Step 1: Create FretMarker.styles.ts**

```typescript
// src/components/Fretboard/FretMarker.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'absolute inset-0 flex items-center justify-center pointer-events-none',
  dot: 'h-3 w-3 rounded-full bg-amber-200/20',
  doubleWrapper: 'flex gap-4',
}
```

**Step 2: Create FretMarker.tsx**

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
        <div className={styles.doubleWrapper}>
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      ) : (
        <div className={styles.dot} />
      )}
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/Fretboard/FretMarker.tsx src/components/Fretboard/FretMarker.styles.ts
git commit --no-verify -m "feat: extract FretMarker component with styles"
```

---

### Task 10: Create Fretboard.styles.ts

**Files:**
- Create: `src/components/Fretboard/Fretboard.styles.ts`

**Step 1: Create the styles file**

Extract all inline Tailwind classes from Fretboard.tsx into the styles object.

```typescript
// src/components/Fretboard/Fretboard.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'w-full relative',

  scrollIndicator: (position: 'left' | 'right', isVisible: boolean) => cn(
    'absolute top-0 bottom-0 w-8 z-20 pointer-events-none transition-opacity',
    position === 'left' ? 'left-0 bg-gradient-to-r from-zinc-900 to-transparent' : 'right-0 bg-gradient-to-l from-zinc-900 to-transparent',
    isVisible ? 'opacity-100' : 'opacity-0'
  ),

  // ... more styles extracted from component
}
```

**Step 2: Commit**

```bash
git add src/components/Fretboard/Fretboard.styles.ts
git commit --no-verify -m "feat: create Fretboard.styles.ts"
```

---

### Task 11: Refactor Fretboard Component

**Files:**
- Modify: `src/components/Fretboard/Fretboard.tsx`
- Create: `src/components/Fretboard/index.ts`

**Step 1: Update Fretboard.tsx imports**

```typescript
// src/components/Fretboard/Fretboard.tsx
import { NoteMarker } from './NoteMarker'
import { FretMarker } from './FretMarker'
import { styles } from './Fretboard.styles'
```

**Step 2: Create index.ts**

```typescript
// src/components/Fretboard/index.ts
export { default } from './Fretboard'
export { NoteMarker } from './NoteMarker'
export { FretMarker } from './FretMarker'
```

**Step 3: Run tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 4: Commit**

```bash
git add src/components/Fretboard/
git commit --no-verify -m "refactor: update Fretboard to use extracted components and styles"
```

---

## Phase 3: Create Component Style Files

### Task 12: Create ScaleSelector.styles.ts

**Files:**
- Create: `src/components/ScaleSelector/ScaleSelector.styles.ts`
- Create: `src/components/ScaleSelector/index.ts`

**Step 1: Create styles and index files**

**Step 2: Update ScaleSelector.tsx to use styles**

**Step 3: Commit**

```bash
git add src/components/ScaleSelector/
git commit --no-verify -m "refactor: create ScaleSelector style file"
```

---

### Task 13: Create PositionSelector.styles.ts

**Files:**
- Create: `src/components/PositionSelector/PositionSelector.styles.ts`
- Create: `src/components/PositionSelector/index.ts`

Follow same pattern as Task 12.

---

### Task 14: Create LiveRegion.styles.ts

**Files:**
- Create: `src/components/LiveRegion/LiveRegion.styles.ts`
- Create: `src/components/LiveRegion/index.ts`

Follow same pattern as Task 12.

---

## Phase 4: Final Cleanup

### Task 15: Extract QuickScaleButtons Component

**Files:**
- Create: `src/components/QuickScaleButtons/QuickScaleButtons.tsx`
- Create: `src/components/QuickScaleButtons/QuickScaleButtons.styles.ts`
- Create: `src/components/QuickScaleButtons/index.ts`
- Modify: `src/app/page.tsx`

**Step 1: Create QuickScaleButtons component**

Extract the Quick Scale Reference buttons from page.tsx to remove inline functions.

```typescript
// src/components/QuickScaleButtons/QuickScaleButtons.tsx
'use client'

import { Note } from '@/lib/music-theory'
import { styles } from './QuickScaleButtons.styles'

interface QuickScaleButtonsProps {
  onScaleChange: (scale: string) => void
  onRootChange: (note: Note) => void
}

const QUICK_SCALES = [
  { scale: 'minorPentatonic', root: 'A' as Note, name: 'A Minor Pentatonic', desc: 'The essential blues/rock scale' },
  { scale: 'blues', root: 'E' as Note, name: 'E Blues Scale', desc: 'Classic blues with the b5' },
  // ... rest
]

export function QuickScaleButtons({ onScaleChange, onRootChange }: QuickScaleButtonsProps) {
  const handleClick = (scale: string, root: Note) => {
    onScaleChange(scale)
    onRootChange(root)
  }

  return (
    <div className={styles.grid}>
      {QUICK_SCALES.map(({ scale, root, name, desc }) => (
        <button
          key={`${scale}-${root}`}
          onClick={() => handleClick(scale, root)}
          className={styles.button}
        >
          <span className={styles.buttonText}>{name}</span>
          <p className={styles.buttonDesc}>{desc}</p>
        </button>
      ))}
    </div>
  )
}
```

**Step 2: Update page.tsx to use QuickScaleButtons**

**Step 3: Commit**

```bash
git add src/components/QuickScaleButtons/ src/app/page.tsx
git commit --no-verify -m "refactor: extract QuickScaleButtons to remove inline functions"
```

---

### Task 16: Final Verification

**Step 1: Run all tests**

Run: `pnpm test:run`
Expected: All tests pass

**Step 2: Run linter**

Run: `pnpm lint`
Expected: No errors

**Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds

**Step 4: Commit any fixes**

```bash
git add -A
git commit --no-verify -m "fix: address any remaining issues from final verification"
```

---

## Success Criteria

- [ ] No inline functions in JSX (except callbacks)
- [ ] All business logic in custom hooks
- [ ] All styles in `*.styles.ts` files
- [ ] music-theory.ts split into 7 focused modules
- [ ] All tests pass
- [ ] Build completes without errors
- [ ] Lint passes
