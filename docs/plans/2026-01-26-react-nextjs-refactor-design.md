# React Next.js Refactor Design

**Date:** 2026-01-26
**Status:** In Progress
**Scope:** Refactor guitar-fretboard-app to comply with react-nextjs rules

---

## Overview

Refactor the guitar-fretboard-app to follow the coding standards defined in `.claude/rules/react-nextjs.md`:
- Extract inline functions from JSX
- Move business logic to custom hooks
- Separate styles into `*.styles.ts` files (Tailwind composition)
- Split large files into smaller, focused modules

---

## Completed Work

| Task | Status |
|------|--------|
| Install clsx and tailwind-merge | Done |
| Create cn() utility | Done |
| Create useAnnouncements hook | Done |
| Create useFretboardApp hook | Done |
| Refactor page.tsx to use hooks | Done |

---

## Remaining Issues

| File | Issue | Rule Violated |
|------|-------|---------------|
| `music-theory.ts` | 931 lines (exceeds reasonable size) | File organization |
| `Fretboard.tsx` | 601 lines, contains sub-components | Component structure |
| `page.tsx` | Inline functions in Quick Scale buttons | No inline functions |
| All components | No separate style files | Separate Style Files |

---

## Proposed Folder Structure

```
src/
├── components/
│   ├── Fretboard/
│   │   ├── Fretboard.tsx
│   │   ├── Fretboard.styles.ts
│   │   ├── useFretboard.ts
│   │   ├── NoteMarker.tsx
│   │   ├── FretMarker.tsx
│   │   └── index.ts
│   ├── ScaleSelector/
│   ├── PositionSelector/
│   ├── LiveRegion/
│   └── QuickScaleButtons/
├── hooks/
│   ├── useFretboardApp.ts (done)
│   ├── useAnnouncements.ts (done)
│   └── useKeyboardShortcuts.ts
└── lib/
    ├── utils.ts (done)
    └── music-theory/
        ├── index.ts
        ├── types.ts
        ├── notes.ts
        ├── scales.ts
        ├── tunings.ts
        ├── intervals.ts
        ├── chords.ts
        └── progressions.ts
```

---

## Styling Approach

Use Tailwind class compositions in `*.styles.ts` files:

```typescript
// Example: Fretboard.styles.ts
import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'w-full relative',

  noteMarker: (isRoot: boolean, isSelected: boolean) => cn(
    'h-7 w-7 rounded-full flex items-center justify-center',
    'text-xs font-bold text-white shadow-md',
    isRoot && 'scale-110 bg-red-500',
    isSelected && 'ring-2 ring-white'
  ),
}
```

---

## Music Theory Module Split

| New File | Content | ~Lines |
|----------|---------|--------|
| `types.ts` | Note, interfaces | 30 |
| `notes.ts` | NOTES constant | 10 |
| `scales.ts` | SCALES, SCALE_NAMES | 200 |
| `tunings.ts` | TUNING_CONFIGS, helpers | 80 |
| `intervals.ts` | Interval calculations | 50 |
| `chords.ts` | CAGED voicings | 400 |
| `progressions.ts` | Chord progressions | 150 |
| `index.ts` | Re-exports | 20 |

---

## Implementation Phases

### Phase 1: Split Music Theory (Remaining)
- Create music-theory/ folder structure
- Extract types, notes, scales, tunings, intervals, chords, progressions
- Update imports across codebase

### Phase 2: Refactor Fretboard
- Extract NoteMarker component
- Extract FretMarker component
- Create useFretboard hook
- Create Fretboard.styles.ts

### Phase 3: Component Styles
- Create styles files for ScaleSelector, PositionSelector, LiveRegion
- Extract QuickScaleButtons from page.tsx

### Phase 4: Final Cleanup
- Remove inline functions from JSX
- Run tests, lint, build
- Verify all rules compliance

---

## Success Criteria

- [ ] No inline functions in JSX
- [ ] All business logic in custom hooks
- [ ] All styles in `*.styles.ts` files
- [ ] music-theory.ts split into modules
- [ ] All tests pass
- [ ] Build completes without errors
