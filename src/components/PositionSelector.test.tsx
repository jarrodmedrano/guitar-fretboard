import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PositionSelector from './PositionSelector'

describe('PositionSelector Component', () => {
  const defaultProps = {
    scale: 'minorPentatonic',
    rootNote: 'A' as const,
    tuning: 'standard',
    position: null as number | null,
    onPositionChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the All button', () => {
      render(<PositionSelector {...defaultProps} />)
      expect(screen.getByRole('button', { name: /show all positions/i })).toBeInTheDocument()
    })

    it('should render position buttons for pentatonic (5 positions)', () => {
      render(<PositionSelector {...defaultProps} />)
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByRole('button', { name: new RegExp(`Position ${i}`, 'i') })).toBeInTheDocument()
      }
    })

    it('should render Prev and Next navigation buttons', () => {
      render(<PositionSelector {...defaultProps} />)
      expect(screen.getByRole('button', { name: /previous position/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /next position/i })).toBeInTheDocument()
    })
  })

  describe('Position Selection', () => {
    it('should highlight All when position is null', () => {
      render(<PositionSelector {...defaultProps} position={null} />)
      const allButton = screen.getByRole('button', { name: /show all positions/i })
      expect(allButton).toHaveClass('bg-emerald-500')
    })

    it('should highlight selected position', () => {
      render(<PositionSelector {...defaultProps} position={0} />)
      const positionButton = screen.getByRole('button', { name: /Position 1/i })
      expect(positionButton).toHaveClass('bg-emerald-500')
    })

    it('should call onPositionChange when position is clicked', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /Position 2/i }))
      expect(onPositionChange).toHaveBeenCalledWith(1) // 0-indexed
    })

    it('should call onPositionChange with null when All is clicked', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={0} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /show all positions/i }))
      expect(onPositionChange).toHaveBeenCalledWith(null)
    })
  })

  describe('Navigation', () => {
    it('should go to position 0 when Prev is clicked from All', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={null} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /previous position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(0)
    })

    it('should go to position 0 when Next is clicked from All', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={null} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /next position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(0)
    })

    it('should decrement position when Prev is clicked', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={2} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /previous position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(1)
    })

    it('should increment position when Next is clicked', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={2} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /next position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(3)
    })

    it('should wrap to last position when Prev is clicked at position 0', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={0} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /previous position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(4) // Last position (5 positions, 0-indexed)
    })

    it('should wrap to first position when Next is clicked at last position', () => {
      const onPositionChange = vi.fn()
      render(<PositionSelector {...defaultProps} position={4} onPositionChange={onPositionChange} />)

      fireEvent.click(screen.getByRole('button', { name: /next position/i }))
      expect(onPositionChange).toHaveBeenCalledWith(0)
    })
  })

  describe('Fret Range Display', () => {
    it('should show fret range when position is selected', () => {
      render(<PositionSelector {...defaultProps} position={0} />)
      expect(screen.getByText(/frets/i)).toBeInTheDocument()
    })

    it('should not show fret range when All is selected', () => {
      render(<PositionSelector {...defaultProps} position={null} />)
      // The fret range text shouldn't appear
      const fretTexts = screen.queryAllByText(/frets \d+-\d+/i)
      expect(fretTexts).toHaveLength(0)
    })
  })

  describe('Form Names', () => {
    it('should show Form label for Fret Science scales', () => {
      render(<PositionSelector {...defaultProps} scale="pentatonicForms" />)
      expect(screen.getByText(/form/i)).toBeInTheDocument()
    })

    it('should show Position label for regular scales', () => {
      render(<PositionSelector {...defaultProps} scale="minorPentatonic" />)
      expect(screen.getByText(/position/i)).toBeInTheDocument()
    })

    it('should show form name for Fret Science minor forms', () => {
      render(<PositionSelector {...defaultProps} scale="pentatonicForms" position={0} />)
      expect(screen.getByText(/form 1/i)).toBeInTheDocument()
    })
  })

  describe('Different Scales', () => {
    it('should render 7 positions for major scale', () => {
      render(<PositionSelector {...defaultProps} scale="major" />)
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByRole('button', { name: new RegExp(`Position ${i}`, 'i') })).toBeInTheDocument()
      }
    })

    it('should render 5 positions for blues scale', () => {
      render(<PositionSelector {...defaultProps} scale="blues" />)
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByRole('button', { name: new RegExp(`Position ${i}`, 'i') })).toBeInTheDocument()
      }
    })
  })

  describe('Tuning Support', () => {
    it('should calculate fret range correctly for standard tuning', () => {
      render(<PositionSelector {...defaultProps} tuning="standard" position={0} />)
      // A in standard tuning starts at fret 5
      expect(screen.getByText(/frets 5-8/i)).toBeInTheDocument()
    })

    it('should calculate fret range correctly for Drop D tuning', () => {
      render(<PositionSelector {...defaultProps} tuning="dropD" position={0} />)
      // A in Drop D tuning starts at fret 7
      expect(screen.getByText(/frets 7-10/i)).toBeInTheDocument()
    })

    it('should show Open for frets starting at 0', () => {
      render(<PositionSelector {...defaultProps} rootNote="E" tuning="standard" position={0} />)
      expect(screen.getByText(/open/i)).toBeInTheDocument()
    })
  })
})
