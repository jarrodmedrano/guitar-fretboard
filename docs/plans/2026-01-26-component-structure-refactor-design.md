# Component Structure Refactor Design

**Date:** 2026-01-26
**Status:** Pending Approval
**Scope:** Refactor guitar-fretboard-app to comply with Claude rules

---

## Overview

Refactor the guitar-fretboard-app to follow the coding standards defined in `.claude/rules/`:
- Extract inline functions from JSX
- Move business logic to custom hooks
- Separate styles into `*.styles.ts` files (Tailwind composition)
- Split large files into smaller, focused modules

---

## Issues Identified

| File | Issue | Rule Violated |
|------|-------|---------------|
| `page.tsx` | Inline functions in JSX (lines 319-372) | react-nextjs.md |
| `page.tsx` | ~100 lines of business logic in component | react-nextjs.md |
| `Fretboard.tsx` | 602 lines (exceeds 400 typical) | coding-style.md |
| `Fretboard.tsx` | Contains NoteMarker & FretMarker components | react-nextjs.md |
| `music-theory.ts` | 932 lines (exceeds 800 max) | coding-style.md |
| All components | Inline Tailwind classes (no style separation) | react-nextjs.md |

---

## Proposed Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Minimal - just composition
│   └── error.tsx
│
├── components/
│   ├── Fretboard/
│   │   ├── Fretboard.tsx         # Render only (~100 lines)
│   │   ├── Fretboard.styles.ts   # Tailwind compositions
│   │   ├── useFretboard.ts       # All fretboard logic
│   │   ├── NoteMarker.tsx        # Extracted sub-component
│   │   ├── NoteMarker.styles.ts
│   │   ├── FretMarker.tsx        # Extracted sub-component
│   │   ├── FretMarker.styles.ts
│   │   ├── Fretboard.test.tsx
│   │   └── index.ts
│   │
│   ├── ScaleSelector/
│   │   ├── ScaleSelector.tsx
│   │   ├── ScaleSelector.styles.ts
│   │   ├── useScaleSelector.ts
│   │   └── index.ts
│   │
│   ├── PositionSelector/
│   │   ├── PositionSelector.tsx
│   │   ├── PositionSelector.styles.ts
│   │   └── index.ts
│   │
│   ├── LiveRegion/
│   │   ├── LiveRegion.tsx
│   │   ├── LiveRegion.styles.ts
│   │   └── index.ts
│   │
│   └── QuickScaleButtons/
│       ├── QuickScaleButtons.tsx
│       ├── QuickScaleButtons.styles.ts
│       └── index.ts
│
├── hooks/
│   ├── useFretboardApp.ts        # Main app state & logic
│   ├── useKeyboardShortcuts.ts   # (existing)
│   └── useAnnouncements.ts       # Screen reader logic
│
├── lib/
│   ├── music-theory/
│   │   ├── index.ts              # Public exports
│   │   ├── types.ts              # Note, CAGEDShape, ChordVoicing
│   │   ├── notes.ts              # NOTES constant
│   │   ├── scales.ts             # SCALES, SCALE_NAMES, SCALE_POSITIONS
│   │   ├── tunings.ts            # TUNING_CONFIGS, helpers
│   │   ├── intervals.ts          # Interval calculations
│   │   ├── chords.ts             # CAGED, voicings
│   │   └── progressions.ts       # Chord progressions
│   ├── utils.ts                  # cn() helper for Tailwind
│   └── prisma.ts
│
└── test/
    └── setup.ts
```

---

## Hook Extraction Plan

### 1. `useFretboardApp.ts` - Main App Hook

**Source:** `page.tsx` lines 15-123

**Extracts:**
- All useState declarations (rootNote, scale, position, displayMode, etc.)
- All handlers (handleScaleChange, handleRootChange, handlePositionChange, etc.)
- Derived values (scaleNotes, scaleFormula)

**Returns:**
```typescript
interface UseFretboardAppReturn {
  // State
  rootNote: Note
  scale: string
  position: number | null
  stringCount: number
  tuning: string
  displayMode: DisplayMode
  showOnlyChordTones: boolean
  showChordsMode: boolean
  showProgressionMode: boolean
  selectedProgression: string | null
  showFingerings: boolean
  progressionViewMode: ProgressionViewMode
  announcement: string

  // Handlers
  handleScaleChange: (scale: string) => void
  handleRootChange: (note: Note) => void
  handlePositionChange: (position: number | null) => void
  handleStringCountChange: (count: number) => void
  handleChordsModeToggle: (enabled: boolean) => void
  handleProgressionModeToggle: (enabled: boolean) => void
  setTuning: (tuning: string) => void
  setDisplayMode: (mode: DisplayMode) => void
  setShowOnlyChordTones: (show: boolean) => void
  setSelectedProgression: (progression: string | null) => void
  setShowFingerings: (show: boolean) => void
  setProgressionViewMode: (mode: ProgressionViewMode) => void

  // Derived
  scaleNotes: string[]
  scaleFormula: number[]
}
```

### 2. `useFretboard.ts` - Fretboard Logic

**Source:** `Fretboard.tsx` lines 195-355

**Extracts:**
- `selectedNotes` state
- `getChordInfo()` callback
- `isInPosition()` callback
- `hasVisibleNotes` memo
- `handleNoteClick()` callback
- Scroll indicator refs and logic

### 3. `useAnnouncements.ts` - Screen Reader

**Extracts:**
- Announcement state management
- `announce()` function

---

## Styling Approach

Use Tailwind class compositions in `*.styles.ts` files:

```typescript
// Example: components/Fretboard/Fretboard.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'w-full relative',

  scrollIndicatorLeft: cn(
    'absolute left-0 top-0 bottom-0 w-8',
    'bg-gradient-to-r from-zinc-900 to-transparent',
    'pointer-events-none z-20 opacity-0 transition-opacity'
  ),

  fretboardContainer: cn(
    'relative rounded-lg overflow-hidden'
  ),

  noteMarker: (isRoot: boolean, isSelected: boolean) => cn(
    'h-7 w-7 rounded-full flex items-center justify-center',
    'text-xs font-bold text-white shadow-md',
    'transition-all duration-150 cursor-pointer',
    isRoot && 'scale-110',
    isSelected && 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
  ),
}
```

**Utility function needed:**
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**New dependencies:**
- `clsx` - Class composition
- `tailwind-merge` - Merge Tailwind classes intelligently

---

## Music Theory Module Split

| New File | Content | ~Lines |
|----------|---------|--------|
| `types.ts` | Note, CAGEDShape, ChordVoicing, TuningConfig interfaces | 30 |
| `notes.ts` | NOTES constant | 10 |
| `scales.ts` | SCALES, SCALE_NAMES, SCALE_POSITIONS | 200 |
| `tunings.ts` | TUNING_CONFIGS, getTuningsByStringCount, getDefaultTuning | 80 |
| `intervals.ts` | INTERVAL_NAMES, getInterval, getIntervalName | 50 |
| `chords.ts` | CAGED voicings, getChordVoicing, getAllChordVoicings | 400 |
| `progressions.ts` | CHORD_PROGRESSIONS, progression helpers | 150 |
| `index.ts` | Re-exports all modules | 20 |

---

## Implementation Phases

### Phase 1: Setup & Utilities
1. Install `clsx` and `tailwind-merge`
2. Create `lib/utils.ts` with `cn()` helper
3. Create component folder structure

### Phase 2: Extract Hooks
1. Create `hooks/useAnnouncements.ts`
2. Create `hooks/useFretboardApp.ts`
3. Refactor `page.tsx` to use hooks

### Phase 3: Split Music Theory
1. Create `lib/music-theory/` folder
2. Split into individual modules
3. Create `index.ts` with re-exports
4. Update imports across codebase

### Phase 4: Refactor Fretboard
1. Extract `NoteMarker` to own file
2. Extract `FretMarker` to own file
3. Create `useFretboard.ts` hook
4. Create style files for each component
5. Refactor `Fretboard.tsx` to use hooks and styles

### Phase 5: Refactor Remaining Components
1. ScaleSelector - extract styles
2. PositionSelector - extract styles
3. LiveRegion - extract styles
4. Extract QuickScaleButtons from page.tsx

### Phase 6: Final Cleanup
1. Update all imports
2. Run tests, fix any failures
3. Run linter, fix issues
4. Verify build passes

---

## Success Criteria

- [ ] No inline functions in JSX
- [ ] All business logic in custom hooks
- [ ] All styles in `*.styles.ts` files
- [ ] No file exceeds 400 lines (800 max)
- [ ] All existing tests pass
- [ ] Build completes without errors
- [ ] Lint passes

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Breaking existing functionality | Run tests after each phase |
| Import path changes | Use index.ts re-exports for backward compatibility |
| Style regressions | Visual comparison before/after |

---

## Estimated File Count

- **Before:** 8 source files
- **After:** ~35 source files (smaller, focused modules)
