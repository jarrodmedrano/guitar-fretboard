import { cn } from '@/lib/utils'

export const containerStyles = 'flex flex-col gap-2.5 md:gap-3'

export const headerRowStyles = 'flex items-center justify-between gap-4'

export const labelStyles = 'text-xs text-zinc-400 uppercase tracking-wide'

export const infoSectionStyles = 'flex items-center gap-2 text-xs'

export const chordNameStyles = 'text-amber-400 font-medium'

export const fretInfoStyles = 'text-zinc-400'

export const buttonGroupStyles = 'flex items-center gap-1.5 md:gap-1 flex-wrap'

const baseButtonStyles = 'px-4 py-3 md:px-3 md:py-2 text-sm font-medium transition-all'

const activeButtonStyles = 'bg-amber-500 text-white shadow-lg'

const inactiveButtonStyles = 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'

export function getAllButtonStyles(isActive: boolean): string {
  return cn(
    baseButtonStyles,
    'rounded-l-lg',
    isActive ? activeButtonStyles : inactiveButtonStyles
  )
}

export function getVoicingButtonStyles(isActive: boolean, isLast: boolean): string {
  return cn(
    baseButtonStyles,
    isLast && 'rounded-r-lg',
    isActive ? activeButtonStyles : inactiveButtonStyles
  )
}
