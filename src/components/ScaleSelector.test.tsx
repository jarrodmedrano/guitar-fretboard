import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ScaleSelector from './ScaleSelector'

describe('ScaleSelector Component', () => {
  const defaultProps = {
    rootNote: 'A' as const,
    scale: 'minorPentatonic',
    stringCount: 6,
    tuning: 'standard',
    displayMode: 'notes' as const,
    showOnlyChordTones: false,
    showChordsMode: false,
    showProgressionMode: false,
    selectedProgression: null,
    showFingerings: false,
    progressionViewMode: 'chord' as const,
    onRootChange: vi.fn(),
    onScaleChange: vi.fn(),
    onStringCountChange: vi.fn(),
    onTuningChange: vi.fn(),
    onDisplayModeChange: vi.fn(),
    onChordTonesToggle: vi.fn(),
    onChordsModeToggle: vi.fn(),
    onProgressionModeToggle: vi.fn(),
    onProgressionSelect: vi.fn(),
    onFingeringsToggle: vi.fn(),
    onProgressionViewModeChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('String Count / Instrument Selector', () => {
    it('should render string count buttons', () => {
      render(<ScaleSelector {...defaultProps} />)
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument()
    })

    it('should highlight the selected string count', () => {
      render(<ScaleSelector {...defaultProps} stringCount={6} />)
      const button = screen.getByRole('button', { name: '6' })
      expect(button).toHaveClass('bg-purple-500')
    })

    it('should call onStringCountChange when clicked', () => {
      const onStringCountChange = vi.fn()
      render(<ScaleSelector {...defaultProps} onStringCountChange={onStringCountChange} />)

      fireEvent.click(screen.getByRole('button', { name: '7' }))
      expect(onStringCountChange).toHaveBeenCalledWith(7)
    })

    it('should show 4-string bass tunings when 4 is selected', () => {
      render(<ScaleSelector {...defaultProps} stringCount={4} tuning="bassStandard" />)
      expect(screen.getByRole('option', { name: /Bass Standard/ })).toBeInTheDocument()
    })

    it('should show 7-string tunings when 7 is selected', () => {
      render(<ScaleSelector {...defaultProps} stringCount={7} tuning="standard7" />)
      expect(screen.getByRole('option', { name: /7-String Standard/ })).toBeInTheDocument()
    })

    it('should show 8-string tunings when 8 is selected', () => {
      render(<ScaleSelector {...defaultProps} stringCount={8} tuning="standard8" />)
      expect(screen.getByRole('option', { name: /8-String Standard/ })).toBeInTheDocument()
    })
  })

  describe('Root Note Selector', () => {
    it('should render all 12 root note buttons', () => {
      render(<ScaleSelector {...defaultProps} />)
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      notes.forEach(note => {
        expect(screen.getByRole('button', { name: note })).toBeInTheDocument()
      })
    })

    it('should highlight the selected root note', () => {
      render(<ScaleSelector {...defaultProps} rootNote="A" />)
      const aButton = screen.getByRole('button', { name: 'A' })
      expect(aButton).toHaveClass('bg-red-500')
    })

    it('should call onRootChange when a root note is clicked', () => {
      const onRootChange = vi.fn()
      render(<ScaleSelector {...defaultProps} onRootChange={onRootChange} />)

      fireEvent.click(screen.getByRole('button', { name: 'C' }))
      expect(onRootChange).toHaveBeenCalledWith('C')
    })
  })

  describe('Scale Selector', () => {
    it('should render scale dropdown', () => {
      render(<ScaleSelector {...defaultProps} />)
      // Find the select element that contains scale options
      const selects = screen.getAllByRole('combobox')
      const scaleSelect = selects.find(select =>
        select.querySelector('option[value="major"]')
      )
      expect(scaleSelect).toBeInTheDocument()
    })

    it('should have all scale options', () => {
      render(<ScaleSelector {...defaultProps} />)
      // Check for some scale options (exact match for minor pentatonic to avoid matching Fret Science variant)
      expect(screen.getByRole('option', { name: /^Major$/ })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /^Minor Pentatonic$/ })).toBeInTheDocument()
    })

    it('should call onScaleChange when scale is changed', () => {
      const onScaleChange = vi.fn()
      render(<ScaleSelector {...defaultProps} onScaleChange={onScaleChange} />)

      // Find scale select (the one with scale options)
      const selects = screen.getAllByRole('combobox')
      const scaleSelect = selects.find(select =>
        select.querySelector('option[value="major"]')
      )
      fireEvent.change(scaleSelect!, { target: { value: 'major' } })
      expect(onScaleChange).toHaveBeenCalledWith('major')
    })
  })

  describe('Tuning Selector', () => {
    it('should render tuning dropdown', () => {
      render(<ScaleSelector {...defaultProps} />)
      // Find the select element that contains tuning options
      const selects = screen.getAllByRole('combobox')
      const tuningSelect = selects.find(select =>
        select.querySelector('option[value="dropD"]')
      )
      expect(tuningSelect).toBeInTheDocument()
    })

    it('should have 6-string tuning options when stringCount is 6', () => {
      render(<ScaleSelector {...defaultProps} stringCount={6} />)
      expect(screen.getByRole('option', { name: /Standard \(E-A-D-G-B-E\)/ })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /Drop D/ })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /D Standard/ })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /Drop C/ })).toBeInTheDocument()
    })

    it('should call onTuningChange when tuning is changed', () => {
      const onTuningChange = vi.fn()
      render(<ScaleSelector {...defaultProps} onTuningChange={onTuningChange} />)

      // Find tuning select (the one with tuning options)
      const selects = screen.getAllByRole('combobox')
      const tuningSelect = selects.find(select =>
        select.querySelector('option[value="dropD"]')
      )
      fireEvent.change(tuningSelect!, { target: { value: 'dropD' } })
      expect(onTuningChange).toHaveBeenCalledWith('dropD')
    })
  })

  describe('Display Mode', () => {
    it('should render display mode buttons', () => {
      render(<ScaleSelector {...defaultProps} />)
      expect(screen.getByRole('button', { name: /notes/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /intervals/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /degrees/i })).toBeInTheDocument()
    })

    it('should highlight the selected display mode', () => {
      render(<ScaleSelector {...defaultProps} displayMode="intervals" />)
      const intervalsButton = screen.getByRole('button', { name: /intervals/i })
      expect(intervalsButton).toHaveClass('bg-blue-500')
    })

    it('should call onDisplayModeChange when mode is changed', () => {
      const onDisplayModeChange = vi.fn()
      render(<ScaleSelector {...defaultProps} onDisplayModeChange={onDisplayModeChange} />)

      fireEvent.click(screen.getByRole('button', { name: /intervals/i }))
      expect(onDisplayModeChange).toHaveBeenCalledWith('intervals')
    })
  })

  describe('Chord Tones Toggle', () => {
    it('should render R-3-5 Only button', () => {
      render(<ScaleSelector {...defaultProps} />)
      expect(screen.getByRole('button', { name: /show only root, third, and fifth notes/i })).toBeInTheDocument()
    })

    it('should highlight when showOnlyChordTones is true', () => {
      render(<ScaleSelector {...defaultProps} showOnlyChordTones={true} />)
      const button = screen.getByRole('button', { name: /show only root, third, and fifth notes/i })
      expect(button).toHaveClass('bg-amber-500')
    })

    it('should call onChordTonesToggle when clicked', () => {
      const onChordTonesToggle = vi.fn()
      render(<ScaleSelector {...defaultProps} onChordTonesToggle={onChordTonesToggle} />)

      fireEvent.click(screen.getByRole('button', { name: /show only root, third, and fifth notes/i }))
      expect(onChordTonesToggle).toHaveBeenCalledWith(true)
    })

    it('should toggle off when already on', () => {
      const onChordTonesToggle = vi.fn()
      render(<ScaleSelector {...defaultProps} showOnlyChordTones={true} onChordTonesToggle={onChordTonesToggle} />)

      fireEvent.click(screen.getByRole('button', { name: /show only root, third, and fifth notes/i }))
      expect(onChordTonesToggle).toHaveBeenCalledWith(false)
    })
  })

  describe('Labels', () => {
    it('should render all section labels', () => {
      render(<ScaleSelector {...defaultProps} />)
      expect(screen.getByText(/instrument/i)).toBeInTheDocument()
      expect(screen.getByText(/root note/i)).toBeInTheDocument()
      expect(screen.getByText(/scale/i)).toBeInTheDocument()
      expect(screen.getByText(/tuning/i)).toBeInTheDocument()
      expect(screen.getByText(/display/i)).toBeInTheDocument()
      expect(screen.getByText(/filter/i)).toBeInTheDocument()
    })
  })
})
