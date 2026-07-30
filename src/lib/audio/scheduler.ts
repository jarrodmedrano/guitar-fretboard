export interface SchedulerStep {
  stepIndex: number
  durationBeats: number
}

export interface SchedulerOptions {
  getBpm: () => number
  metronome: () => boolean
  beatsPerBar: number
  loop: boolean
}

export interface SchedulerCallbacks {
  onScheduleStep: (stepIndex: number, audioTime: number, secondsPerBeat: number) => void
  onScheduleBeat: (beatInBar: number, audioTime: number) => void
  onStepChange: (stepIndex: number) => void
}

interface SchedulerConfig {
  clock: { currentTime: number }
  setIntervalFn?: typeof setInterval
  clearIntervalFn?: typeof clearInterval
  lookaheadMs?: number
  scheduleAheadSec?: number
}

export const START_DELAY_SEC = 0.05

const DEFAULT_LOOKAHEAD_MS = 25
const DEFAULT_SCHEDULE_AHEAD_SEC = 0.1
const SECONDS_PER_MINUTE = 60

// Lookahead scheduler ("A Tale of Two Clocks" pattern): a coarse timer tick
// schedules audio events at exact AudioContext times slightly in the future,
// so timer jitter affects only how early events are queued, never when they sound.
export class LookaheadScheduler {
  private readonly clock: { currentTime: number }
  private readonly setIntervalFn: typeof setInterval
  private readonly clearIntervalFn: typeof clearInterval
  private readonly lookaheadMs: number
  private readonly scheduleAheadSec: number

  private intervalId: ReturnType<typeof setInterval> | null = null
  private steps: SchedulerStep[] = []
  private options: SchedulerOptions | null = null
  private callbacks: SchedulerCallbacks | null = null

  private stepPointer = 0
  private nextStepTime = 0
  private nextBeatTime = 0
  private beatInBar = 0
  private stepsExhausted = false
  private pendingUiEvents: { stepIndex: number; audioTime: number }[] = []
  private pendingCustomEvents: { audioTime: number; emit: () => void }[] = []

  constructor(config: SchedulerConfig) {
    this.clock = config.clock
    // Wrapped in arrows so the browser's setInterval/clearInterval are invoked
    // with their expected receiver (calling them with `this` bound to the class
    // instance throws "Illegal invocation")
    this.setIntervalFn =
      config.setIntervalFn ??
      (((handler: () => void, timeout?: number) =>
        setInterval(handler, timeout)) as typeof setInterval)
    this.clearIntervalFn = config.clearIntervalFn ?? ((id) => clearInterval(id))
    this.lookaheadMs = config.lookaheadMs ?? DEFAULT_LOOKAHEAD_MS
    this.scheduleAheadSec = config.scheduleAheadSec ?? DEFAULT_SCHEDULE_AHEAD_SEC
  }

  start(steps: SchedulerStep[], options: SchedulerOptions, callbacks: SchedulerCallbacks): void {
    this.stop()
    if (steps.length === 0) return

    this.steps = steps
    this.options = options
    this.callbacks = callbacks
    this.stepPointer = 0
    this.beatInBar = 0
    this.stepsExhausted = false
    this.pendingUiEvents = []
    this.pendingCustomEvents = []

    const startTime = this.clock.currentTime + START_DELAY_SEC
    this.nextStepTime = startTime
    this.nextBeatTime = startTime

    this.tick()
    this.intervalId = this.setIntervalFn(() => this.tick(), this.lookaheadMs)
  }

  stop(): void {
    if (this.intervalId !== null) {
      this.clearIntervalFn(this.intervalId)
      this.intervalId = null
      this.callbacks?.onStepChange(-1)
    }
    this.pendingUiEvents = []
    this.pendingCustomEvents = []
    this.options = null
    this.callbacks = null
  }

  // Queue an arbitrary UI callback to fire when the audio clock reaches
  // audioTime (used for sub-step sync like per-note arpeggio highlighting)
  enqueueUiEvent(audioTime: number, emit: () => void): void {
    this.pendingCustomEvents = [...this.pendingCustomEvents, { audioTime, emit }]
  }

  private tick(): void {
    if (!this.options || !this.callbacks) return
    const horizon = this.clock.currentTime + this.scheduleAheadSec

    this.scheduleSteps(horizon)
    this.scheduleBeats(horizon)
    this.flushUiEvents()
  }

  private scheduleSteps(horizon: number): void {
    if (!this.options || !this.callbacks) return

    while (!this.stepsExhausted && this.nextStepTime < horizon) {
      const step = this.steps[this.stepPointer]
      const secondsPerBeat = SECONDS_PER_MINUTE / this.options.getBpm()

      this.callbacks.onScheduleStep(step.stepIndex, this.nextStepTime, secondsPerBeat)
      this.pendingUiEvents = [
        ...this.pendingUiEvents,
        { stepIndex: step.stepIndex, audioTime: this.nextStepTime },
      ]

      this.nextStepTime += step.durationBeats * secondsPerBeat
      this.stepPointer += 1

      if (this.stepPointer >= this.steps.length) {
        if (this.options.loop) {
          this.stepPointer = 0
        } else {
          this.stepsExhausted = true
        }
      }
    }

    if (
      this.stepsExhausted &&
      this.pendingUiEvents.length === 0 &&
      this.clock.currentTime >= this.nextStepTime
    ) {
      this.stop()
    }
  }

  private scheduleBeats(horizon: number): void {
    if (!this.options || !this.callbacks) return

    while (this.nextBeatTime < horizon) {
      if (this.options.metronome()) {
        this.callbacks.onScheduleBeat(this.beatInBar, this.nextBeatTime)
      }

      const secondsPerBeat = SECONDS_PER_MINUTE / this.options.getBpm()
      this.nextBeatTime += secondsPerBeat
      this.beatInBar = (this.beatInBar + 1) % this.options.beatsPerBar
    }
  }

  private flushUiEvents(): void {
    if (!this.callbacks) return
    const now = this.clock.currentTime

    const due = this.pendingUiEvents.filter((event) => event.audioTime <= now)
    if (due.length > 0) {
      this.pendingUiEvents = this.pendingUiEvents.filter((event) => event.audioTime > now)
      this.callbacks.onStepChange(due[due.length - 1].stepIndex)
    }

    // Custom events flush after step changes so a step's reset (e.g. clearing a
    // note highlight) never clobbers a same-tick note event
    const dueCustom = this.pendingCustomEvents
      .filter((event) => event.audioTime <= now)
      .sort((a, b) => a.audioTime - b.audioTime)
    if (dueCustom.length > 0) {
      this.pendingCustomEvents = this.pendingCustomEvents.filter(
        (event) => event.audioTime > now
      )
      dueCustom.forEach((event) => event.emit())
    }
  }
}
