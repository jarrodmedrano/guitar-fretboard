const MIN_GAIN = 0.001
const PLUCK_GAIN = 0.25
const PLUCK_FILTER_FREQUENCY_RATIO = 4
const PLUCK_FILTER_MAX_FREQUENCY = 8000
const PLUCK_RELEASE_PADDING_SEC = 0.05
const CLICK_FREQUENCY = 1000
const CLICK_ACCENT_FREQUENCY = 1600
const CLICK_GAIN = 0.3
const CLICK_DURATION_SEC = 0.03

export function playPluck(
  ctx: AudioContext,
  when: number,
  frequency: number,
  duration: number,
  gain = PLUCK_GAIN
): void {
  const oscillator = ctx.createOscillator()
  oscillator.type = 'triangle'
  oscillator.frequency.value = frequency

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = Math.min(
    frequency * PLUCK_FILTER_FREQUENCY_RATIO,
    PLUCK_FILTER_MAX_FREQUENCY
  )

  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(gain, when)
  gainNode.gain.exponentialRampToValueAtTime(MIN_GAIN, when + duration)

  oscillator.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start(when)
  oscillator.stop(when + duration + PLUCK_RELEASE_PADDING_SEC)
}

export function playClick(ctx: AudioContext, when: number, accent: boolean): void {
  const oscillator = ctx.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.value = accent ? CLICK_ACCENT_FREQUENCY : CLICK_FREQUENCY

  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(CLICK_GAIN, when)
  gainNode.gain.exponentialRampToValueAtTime(MIN_GAIN, when + CLICK_DURATION_SEC)

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start(when)
  oscillator.stop(when + CLICK_DURATION_SEC)
}
