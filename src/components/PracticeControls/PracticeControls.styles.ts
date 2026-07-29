import { cn } from '@/lib/utils'

const modeVariants = {
  active: 'bg-amber-500 text-white shadow-lg',
  inactive: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
} as const

export const styles = {
  container: 'flex flex-col gap-4',

  fieldWrapper: 'flex flex-col gap-1.5',
  label: 'text-xs text-zinc-400 uppercase tracking-wide',

  modeRow: 'flex flex-wrap gap-1.5 md:gap-1',
  modeButton: (isActive: boolean) =>
    cn(
      'flex-1 md:flex-none px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all capitalize',
      isActive ? modeVariants.active : modeVariants.inactive
    ),

  optionsRow: 'flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 items-stretch md:items-end',

  select:
    'px-4 py-3 md:py-2 rounded-md bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer text-sm',

  playbackRow: 'flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end md:justify-between border-t border-zinc-800 pt-4',

  bpmGroup: 'flex items-end gap-3',
  bpmStepper: 'flex items-center gap-2',
  bpmButton:
    'h-10 w-10 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-lg font-bold transition-colors',
  bpmValue: 'w-16 text-center text-xl font-bold text-white tabular-nums',
  bpmSlider: 'w-40 accent-amber-500 cursor-pointer',

  toggleGroup: 'flex gap-2',
  metronomeButton: (isOn: boolean) =>
    cn(
      'px-4 py-3 md:py-2 rounded-md text-sm font-medium transition-all',
      isOn ? 'bg-cyan-500 text-white shadow-lg' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
    ),

  playButton: (isPlaying: boolean) =>
    cn(
      'px-8 py-3 rounded-lg text-base font-bold transition-all shadow-lg',
      isPlaying
        ? 'bg-red-500 hover:bg-red-400 text-white'
        : 'bg-emerald-500 hover:bg-emerald-400 text-white'
    ),

  directionButton: (isActive: boolean) =>
    cn(
      'px-4 py-3 md:px-3 md:py-2 rounded-md text-sm font-medium transition-all',
      isActive ? 'bg-blue-500 text-white shadow-lg' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
    ),

  buttonGroup: 'flex gap-1.5 md:gap-1',
} as const
