import { vi } from 'vitest'

interface FakeAudioParam {
  value: number
  setValueAtTime: ReturnType<typeof vi.fn>
  exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
}

export interface FakeOscillatorNode {
  type: string
  frequency: FakeAudioParam
  connect: ReturnType<typeof vi.fn>
  start: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
}

export interface FakeGainNode {
  gain: FakeAudioParam
  connect: ReturnType<typeof vi.fn>
}

export interface FakeBiquadFilterNode {
  type: string
  frequency: FakeAudioParam
  connect: ReturnType<typeof vi.fn>
}

export interface FakeAudioContext {
  currentTime: number
  state: string
  destination: object
  oscillators: FakeOscillatorNode[]
  gains: FakeGainNode[]
  filters: FakeBiquadFilterNode[]
  createOscillator: () => FakeOscillatorNode
  createGain: () => FakeGainNode
  createBiquadFilter: () => FakeBiquadFilterNode
  resume: ReturnType<typeof vi.fn>
  close: ReturnType<typeof vi.fn>
}

function createFakeAudioParam(): FakeAudioParam {
  return {
    value: 0,
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  }
}

export function createFakeAudioContext(): FakeAudioContext {
  const oscillators: FakeOscillatorNode[] = []
  const gains: FakeGainNode[] = []
  const filters: FakeBiquadFilterNode[] = []

  return {
    currentTime: 0,
    state: 'running',
    destination: {},
    oscillators,
    gains,
    filters,
    createOscillator: () => {
      const node: FakeOscillatorNode = {
        type: 'sine',
        frequency: createFakeAudioParam(),
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }
      oscillators.push(node)
      return node
    },
    createGain: () => {
      const node: FakeGainNode = {
        gain: createFakeAudioParam(),
        connect: vi.fn(),
      }
      gains.push(node)
      return node
    },
    createBiquadFilter: () => {
      const node: FakeBiquadFilterNode = {
        type: 'lowpass',
        frequency: createFakeAudioParam(),
        connect: vi.fn(),
      }
      filters.push(node)
      return node
    },
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
  }
}
