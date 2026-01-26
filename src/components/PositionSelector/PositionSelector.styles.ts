import { cn } from '@/lib/utils'

/**
 * Container styles for the PositionSelector component
 */
export const containerStyles = 'flex flex-col gap-2.5 md:gap-3'

/**
 * Header row containing label and info section
 */
export const headerRowStyles = 'flex items-center justify-between gap-4'

/**
 * Label styling for Position/Form text
 */
export const labelStyles = 'text-xs text-zinc-400 uppercase tracking-wide'

/**
 * Info section containing form name and fret range
 */
export const infoSectionStyles = 'flex items-center gap-2 text-xs'

/**
 * Form name display (e.g., CAGED form names)
 */
export const formNameStyles = 'text-emerald-400 font-medium'

/**
 * Fret range display text
 */
export const fretRangeStyles = 'text-zinc-400'

/**
 * Button group container for position buttons
 */
export const buttonGroupStyles = 'flex items-center gap-1.5 md:gap-1 flex-wrap'

/**
 * Base button styles shared across all position buttons
 */
const baseButtonStyles = 'px-4 py-3 md:px-3 md:py-2 text-sm font-medium transition-all'

/**
 * Active button state styles
 */
const activeButtonStyles = 'bg-emerald-500 text-white shadow-lg'

/**
 * Inactive button state styles
 */
const inactiveButtonStyles = 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'

/**
 * Get styles for the "All" button (always has rounded-l-lg)
 */
export function getAllButtonStyles(isActive: boolean): string {
  return cn(
    baseButtonStyles,
    'rounded-l-lg',
    isActive ? activeButtonStyles : inactiveButtonStyles
  )
}

/**
 * Get styles for individual position buttons
 */
export function getPositionButtonStyles(isActive: boolean, isLast: boolean): string {
  return cn(
    baseButtonStyles,
    isLast && 'rounded-r-lg',
    isActive ? activeButtonStyles : inactiveButtonStyles
  )
}

/**
 * Navigation buttons container (prev/next)
 */
export const navButtonGroupStyles = 'flex items-center gap-2'

/**
 * Navigation button styles (prev/next buttons)
 */
export const navButtonStyles = cn(
  'flex-1 px-4 py-3 md:px-3 md:py-1.5 rounded-md text-sm font-medium transition-all',
  'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center gap-1'
)

/**
 * Icon styles for navigation arrows
 */
export const navIconStyles = 'w-4 h-4'
