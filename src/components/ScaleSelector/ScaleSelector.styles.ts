import { cn } from '@/lib/utils'

// Color mappings for button variants (Tailwind doesn't support dynamic class interpolation)
const colorVariants = {
  purple: {
    active: 'bg-purple-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  red: {
    active: 'bg-red-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  blue: {
    active: 'bg-blue-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  amber: {
    active: 'bg-amber-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  emerald: {
    active: 'bg-emerald-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  cyan: {
    active: 'bg-cyan-500 text-white shadow-lg',
    inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
} as const

export type ButtonColor = keyof typeof colorVariants

export const styles = {
  // Container styles
  container: 'flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 items-stretch md:items-center md:justify-center',

  // Field wrapper and label
  fieldWrapper: 'flex flex-col gap-1.5',
  label: 'text-xs text-zinc-400 uppercase tracking-wide',

  // Button group variants
  buttonGroup: 'flex gap-1.5 md:gap-1',
  buttonGroupWrap: 'flex flex-wrap gap-1.5 md:gap-1',
  buttonGroupDesktopOnly: 'hidden md:flex flex-wrap gap-1',

  // Select input styles
  select: 'px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer text-sm',
  selectMobile: 'md:hidden px-4 py-3 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer',
  selectEmerald: 'px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-sm',

  // Button style functions
  button: (isActive: boolean, color: ButtonColor = 'blue') =>
    cn(
      'px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all',
      isActive ? colorVariants[color].active : colorVariants[color].inactive
    ),

  buttonCapitalize: (isActive: boolean, color: ButtonColor = 'blue') =>
    cn(
      'px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize',
      isActive ? colorVariants[color].active : colorVariants[color].inactive
    ),

  // For flex-1 buttons (instrument selector, progression view mode)
  flexButton: (isActive: boolean, color: ButtonColor = 'purple') =>
    cn(
      'flex-1 md:flex-none px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all',
      isActive ? colorVariants[color].active : colorVariants[color].inactive
    ),

  flexButtonCapitalize: (isActive: boolean, color: ButtonColor = 'purple') =>
    cn(
      'flex-1 md:flex-none px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize',
      isActive ? colorVariants[color].active : colorVariants[color].inactive
    ),

  // Desktop-only button (root note buttons)
  desktopButton: (isActive: boolean, color: ButtonColor = 'red') =>
    cn(
      'px-3 py-2 rounded-md text-sm font-medium transition-all',
      isActive ? colorVariants[color].active : colorVariants[color].inactive
    ),
} as const
