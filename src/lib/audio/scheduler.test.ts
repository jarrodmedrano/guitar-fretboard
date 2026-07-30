import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { LookaheadScheduler, START_DELAY_SEC, type SchedulerCallbacks } from './scheduler'

function createCallbacks(): SchedulerCallbacks {
  return {
    onScheduleStep: vi.fn(),
    onScheduleBeat: vi.fn(),
    onStepChange: vi.fn(),
  }
}

function createScheduler(clock: { currentTime: number }) {
  return new LookaheadScheduler({ clock, lookaheadMs: 25, scheduleAheadSec: 0.1 })
}

const oneBeatSteps = [
  { stepIndex: 0, durationBeats: 1 },
  { stepIndex: 1, durationBeats: 1 },
  { stepIndex: 2, durationBeats: 1 },
]

const defaultOptions = {
  getBpm: () => 60,
  metronome: () => true,
  beatsPerBar: 4,
  loop: true,
}

describe('LookaheadScheduler', () => {
  let clock: { currentTime: number }

  beforeEach(() => {
    vi.useFakeTimers()
    clock = { currentTime: 0 }
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('schedules the first step and beat at the start delay', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    expect(callbacks.onScheduleStep).toHaveBeenCalledWith(0, START_DELAY_SEC, 1)
    expect(callbacks.onScheduleBeat).toHaveBeenCalledWith(0, START_DELAY_SEC)
    scheduler.stop()
  })

  it('schedules subsequent steps at exact beat-spaced audio times', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    clock.currentTime = 2.0
    vi.advanceTimersByTime(50)

    const stepCalls = vi.mocked(callbacks.onScheduleStep).mock.calls
    expect(stepCalls[1]).toEqual([1, START_DELAY_SEC + 1, 1])
    expect(stepCalls[2]).toEqual([2, START_DELAY_SEC + 2, 1])
    scheduler.stop()
  })

  it('loops back to the first step', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    clock.currentTime = 3.0
    vi.advanceTimersByTime(50)

    const scheduledIndices = vi.mocked(callbacks.onScheduleStep).mock.calls.map((c) => c[0])
    expect(scheduledIndices).toEqual([0, 1, 2, 0])
    scheduler.stop()
  })

  it('cycles metronome beats through the bar starting at beat 0', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    clock.currentTime = 4.0
    vi.advanceTimersByTime(50)

    const beats = vi.mocked(callbacks.onScheduleBeat).mock.calls.map((c) => c[0])
    expect(beats.slice(0, 5)).toEqual([0, 1, 2, 3, 0])
    scheduler.stop()
  })

  it('skips clicks while metronome() is false but keeps the grid aligned', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    let metronomeOn = false
    scheduler.start(oneBeatSteps, { ...defaultOptions, metronome: () => metronomeOn }, callbacks)
    expect(callbacks.onScheduleBeat).not.toHaveBeenCalled()

    metronomeOn = true
    clock.currentTime = 2.0
    vi.advanceTimersByTime(50)
    const beatTimes = vi.mocked(callbacks.onScheduleBeat).mock.calls.map((c) => c[1] as number)
    expect(beatTimes.length).toBeGreaterThan(0)
    beatTimes.forEach((time) => {
      const beatsFromStart = time - START_DELAY_SEC
      expect(Math.abs(beatsFromStart - Math.round(beatsFromStart))).toBeCloseTo(0, 5)
    })
    scheduler.stop()
  })

  it('reflects live BPM changes in subsequent step spacing', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    let bpm = 60
    scheduler.start(oneBeatSteps, { ...defaultOptions, getBpm: () => bpm }, callbacks)

    bpm = 120
    clock.currentTime = 2.0
    vi.advanceTimersByTime(50)

    const stepCalls = vi.mocked(callbacks.onScheduleStep).mock.calls
    const spacing = (stepCalls[2][1] as number) - (stepCalls[1][1] as number)
    expect(spacing).toBeCloseTo(0.5, 5)
    scheduler.stop()
  })

  it('emits onStepChange when the audio time for a step is reached', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    expect(callbacks.onStepChange).not.toHaveBeenCalled()

    clock.currentTime = START_DELAY_SEC + 0.01
    vi.advanceTimersByTime(25)
    expect(callbacks.onStepChange).toHaveBeenCalledWith(0)

    clock.currentTime = START_DELAY_SEC + 1.01
    vi.advanceTimersByTime(25)
    expect(callbacks.onStepChange).toHaveBeenLastCalledWith(1)
    scheduler.stop()
  })

  it('stop() halts scheduling and emits onStepChange(-1)', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)
    scheduler.stop()

    expect(callbacks.onStepChange).toHaveBeenLastCalledWith(-1)

    const callCount = vi.mocked(callbacks.onScheduleStep).mock.calls.length
    clock.currentTime = 10
    vi.advanceTimersByTime(200)
    expect(vi.mocked(callbacks.onScheduleStep).mock.calls.length).toBe(callCount)
  })

  it('flushes queued custom UI events at their audio time, after step changes', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    const order: string[] = []
    vi.mocked(callbacks.onStepChange).mockImplementation((i) => order.push(`step:${i}`))
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)

    scheduler.enqueueUiEvent(START_DELAY_SEC, () => order.push('note:0'))
    scheduler.enqueueUiEvent(START_DELAY_SEC + 0.5, () => order.push('note:1'))

    clock.currentTime = START_DELAY_SEC + 0.01
    vi.advanceTimersByTime(25)
    expect(order).toEqual(['step:0', 'note:0'])

    clock.currentTime = START_DELAY_SEC + 0.51
    vi.advanceTimersByTime(25)
    expect(order).toEqual(['step:0', 'note:0', 'note:1'])
    scheduler.stop()
  })

  it('drops queued custom UI events on stop()', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    const emit = vi.fn()
    scheduler.start(oneBeatSteps, defaultOptions, callbacks)
    scheduler.enqueueUiEvent(START_DELAY_SEC + 0.5, emit)
    scheduler.stop()

    clock.currentTime = 2
    vi.advanceTimersByTime(100)
    expect(emit).not.toHaveBeenCalled()
  })

  it('does nothing when started with no steps', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start([], defaultOptions, callbacks)

    clock.currentTime = 2
    vi.advanceTimersByTime(100)
    expect(callbacks.onScheduleStep).not.toHaveBeenCalled()
    expect(callbacks.onScheduleBeat).not.toHaveBeenCalled()
    scheduler.stop()
  })

  it('respects step durations when spacing steps', () => {
    const scheduler = createScheduler(clock)
    const callbacks = createCallbacks()
    scheduler.start(
      [
        { stepIndex: 0, durationBeats: 4 },
        { stepIndex: 1, durationBeats: 4 },
      ],
      defaultOptions,
      callbacks
    )

    clock.currentTime = 4.0
    vi.advanceTimersByTime(50)

    const stepCalls = vi.mocked(callbacks.onScheduleStep).mock.calls
    expect((stepCalls[1][1] as number) - (stepCalls[0][1] as number)).toBeCloseTo(4, 5)
    scheduler.stop()
  })
})
