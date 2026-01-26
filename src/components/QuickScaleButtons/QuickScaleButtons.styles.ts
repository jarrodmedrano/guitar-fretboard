import { cn } from '@/lib/utils'

export const styles = {
  container: 'mt-6 md:mt-8 bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800',
  heading: 'text-base md:text-lg font-medium text-white mb-3 md:mb-4',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4',

  button: 'text-left p-3 md:p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group',

  buttonTitle: (hoverColor: 'red' | 'emerald' = 'red') => cn(
    'text-white text-sm md:text-base font-medium transition-colors',
    hoverColor === 'red' ? 'group-hover:text-red-400' : 'group-hover:text-emerald-400'
  ),

  buttonDescription: 'text-zinc-500 text-xs md:text-sm mt-1',
}
