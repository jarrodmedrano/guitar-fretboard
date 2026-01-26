import { cn } from '@/lib/utils'

/**
 * Fretboard Component Styles
 *
 * Organized by component section for easy maintenance.
 * Uses Tailwind CSS classes extracted from the main Fretboard component.
 */

// =============================================================================
// Container & Wrapper Styles
// =============================================================================

export const fretboardStyles = {
  /** Main wrapper container */
  wrapper: 'w-full relative',

  /** Scrollable container for horizontal overflow */
  scrollContainer: 'w-full overflow-x-auto',

  /** Inner container with padding */
  innerContainer: 'inline-block min-w-full p-3 md:p-4',

  /** Main fretboard area with wood grain background */
  fretboardContainer: 'relative rounded-lg overflow-hidden',

  /** Main fretboard flex container (contains nut and frets) */
  mainArea: 'flex ml-10',
}

// =============================================================================
// Scroll Indicator Styles
// =============================================================================

export const scrollIndicatorStyles = {
  /** Left gradient indicator (hidden by default) */
  left: 'absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none z-20 opacity-0 transition-opacity',

  /** Right gradient indicator (visible by default) */
  right: 'absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none z-20',
}

// =============================================================================
// String Labels Styles
// =============================================================================

export const stringLabelStyles = {
  /** Container for string number labels */
  container: 'absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around py-2 bg-zinc-900/50 z-10',

  /** Individual string label */
  label: 'h-8 flex items-center justify-center text-xs font-mono text-zinc-300',
}

// =============================================================================
// Nut Styles (Open Strings)
// =============================================================================

export const nutStyles = {
  /** Nut container (where open strings are displayed) */
  container: 'flex flex-col justify-around py-2 px-1 bg-zinc-200 border-r-4 border-zinc-400',
}

// =============================================================================
// Fret Styles
// =============================================================================

export const fretStyles = {
  /** Individual fret column */
  column: 'relative flex flex-col justify-around py-2 border-r-2 border-zinc-400/60',

  /** Fret number display */
  number: 'absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-500 font-mono',

  /** String line wrapper (contains the string and note marker) */
  stringLineWrapper: 'relative flex items-center justify-center',
}

// =============================================================================
// Fret Marker Styles (Inlay Dots)
// =============================================================================

export const fretMarkerStyles = {
  /** Container for fret marker dots */
  container: 'absolute inset-0 flex items-center justify-center pointer-events-none',

  /** Container for double markers (12th, 24th fret) */
  doubleContainer: 'flex gap-4',

  /** Individual marker dot */
  dot: 'h-3 w-3 rounded-full bg-amber-200/20',
}

// =============================================================================
// Note Marker Styles
// =============================================================================

export const noteMarkerStyles = {
  /** Container for note marker */
  container: 'h-8 w-8 flex items-center justify-center relative z-10',

  /** Muted string marker (X) at the nut */
  mutedMarker: 'h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-zinc-700/30 text-xs font-bold text-zinc-400',

  /** Non-scale note dot at the nut (small dot) */
  nutDot: 'h-2 w-2 rounded-full bg-zinc-700/30 hover:bg-zinc-600/50 cursor-pointer transition-colors',

  /** Base note button styles */
  noteButtonBase: cn(
    'h-7 w-7 sm:h-8 sm:w-8 md:h-7 md:w-7 rounded-full flex items-center justify-center',
    'text-xs font-bold text-white shadow-md',
    'transition-all duration-150 cursor-pointer'
  ),

  /** String line that runs through each fret */
  stringLine: 'absolute inset-x-0 top-1/2 -translate-y-1/2 h-px',
}

/**
 * Get the background color class for a note marker based on its properties
 */
export function getNoteBackgroundColor(options: {
  isRoot: boolean
  interval: number
  fingerNumber?: number
  showFingerings?: boolean
}): string {
  const { isRoot, interval, fingerNumber, showFingerings } = options

  // If showing finger numbers in chord mode, use neutral colors
  if (fingerNumber !== undefined && showFingerings) {
    if (isRoot) return 'bg-orange-500 hover:bg-orange-400'
    return 'bg-slate-600 hover:bg-slate-500'
  }

  // Normal color coding for scale notes
  if (isRoot) return 'bg-red-500 hover:bg-red-400'
  if (interval === 4 || interval === 3) return 'bg-green-500 hover:bg-green-400' // 3rd
  if (interval === 7) return 'bg-blue-500 hover:bg-blue-400' // 5th
  if (interval === 10 || interval === 11) return 'bg-purple-500 hover:bg-purple-400' // 7th
  if (interval === 6) return 'bg-cyan-500 hover:bg-cyan-400' // blue note

  return 'bg-zinc-500 hover:bg-zinc-400'
}

/**
 * Get combined classes for a note button
 */
export function getNoteButtonClasses(options: {
  isRoot: boolean
  interval: number
  isSelected?: boolean
  fingerNumber?: number
  showFingerings?: boolean
}): string {
  const { isRoot, isSelected, ...colorOptions } = options
  const backgroundColor = getNoteBackgroundColor({ isRoot, ...colorOptions })

  return cn(
    noteMarkerStyles.noteButtonBase,
    backgroundColor,
    isSelected && 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900',
    isRoot && 'scale-110'
  )
}

// =============================================================================
// Legend Styles
// =============================================================================

export const legendStyles = {
  /** Legend container */
  container: 'mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center text-xs md:text-sm',

  /** Individual legend item */
  item: 'flex items-center gap-2 transition-transform hover:scale-110 cursor-default',

  /** Color indicator dot */
  colorDot: 'h-4 w-4 rounded-full',

  /** Legend label text */
  label: 'text-zinc-400',
}

/** Legend color definitions */
export const legendColors = {
  root: 'bg-red-500',
  third: 'bg-green-500',
  fifth: 'bg-blue-500',
  seventh: 'bg-purple-500',
  blueNote: 'bg-cyan-500',
  scaleNote: 'bg-zinc-500',
}

// =============================================================================
// Chord Name Display Styles
// =============================================================================

export const chordNameStyles = {
  /** Container for chord name display */
  container: 'mt-6 text-center',

  /** Chord name box */
  box: 'inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg bg-zinc-800/50 border border-zinc-700',

  /** "Current Chord" label */
  label: 'text-xs md:text-sm text-zinc-500 uppercase tracking-wide mb-1',

  /** Chord name text */
  name: 'text-2xl md:text-3xl font-bold text-white',
}

// =============================================================================
// Empty State Styles
// =============================================================================

export const emptyStateStyles = {
  /** Main container for empty state */
  container: 'w-full flex items-center justify-center h-64 animate-fade-in',

  /** Inner content container */
  content: 'text-center space-y-4 max-w-md px-4',

  /** Icon container */
  iconWrapper: 'flex justify-center',

  /** Icon background circle */
  iconCircle: 'h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center',

  /** Icon SVG styles */
  icon: 'h-8 w-8 text-zinc-500',

  /** Heading text */
  heading: 'text-lg font-semibold text-white mb-2',

  /** Description text */
  description: 'text-sm text-zinc-400',
}

// =============================================================================
// Mobile Scroll Hint Styles
// =============================================================================

export const mobileHintStyles = {
  /** Mobile scroll hint text */
  hint: 'text-xs text-zinc-500 text-center mt-3 md:hidden',
}

// =============================================================================
// Inline Styles (non-Tailwind CSS values)
// =============================================================================

export const inlineStyles = {
  /** Fretboard wood grain gradient background */
  fretboardBackground: {
    background: 'linear-gradient(to bottom, #78350f, #451a03)',
  },

  /**
   * Calculate fret width based on fret index
   * Frets get narrower as they go higher (simulating real guitar)
   */
  getFretWidth: (fretIndex: number): React.CSSProperties => ({
    minWidth: `${Math.max(36, 55 - fretIndex * 0.8)}px`,
  }),

  /**
   * Get string line gradient based on string position
   * Thicker strings at the bottom, thinner at the top
   */
  getStringLineStyle: (stringIndex: number): React.CSSProperties => ({
    background: 'linear-gradient(to bottom, #d4d4d4, #a3a3a3)',
    height: `${1 + (5 - stringIndex) * 0.3}px`,
  }),
}
