import { cn } from '@/lib/utils'

export const styles = {
  wrapper: 'h-8 w-8 flex items-center justify-center relative z-10',

  mutedMarker:
    'h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-zinc-700/30 text-xs font-bold text-zinc-400',

  emptyNutDot:
    'h-2 w-2 rounded-full bg-zinc-700/30 hover:bg-zinc-600/50 cursor-pointer transition-colors',

  noteButton: (options: { isRoot: boolean; isSelected: boolean }) =>
    cn(
      'h-7 w-7 sm:h-8 sm:w-8 md:h-7 md:w-7 rounded-full flex items-center justify-center',
      'text-xs font-bold text-white shadow-md',
      'transition-all duration-150 cursor-pointer',
      options.isRoot && 'scale-110',
      options.isSelected && 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
    ),

  // Background colors by interval/mode
  bgColor: {
    fingerRoot: 'bg-orange-500 hover:bg-orange-400',
    fingerOther: 'bg-slate-600 hover:bg-slate-500',
    root: 'bg-red-500 hover:bg-red-400',
    third: 'bg-green-500 hover:bg-green-400',
    fifth: 'bg-blue-500 hover:bg-blue-400',
    seventh: 'bg-purple-500 hover:bg-purple-400',
    blueNote: 'bg-cyan-500 hover:bg-cyan-400',
    default: 'bg-zinc-500 hover:bg-zinc-400',
  },
}
