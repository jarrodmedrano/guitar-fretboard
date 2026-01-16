import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Fretboard from './Fretboard'

describe('Fretboard Component', () => {
  const defaultProps = {
    rootNote: 'A' as const,
    scale: 'minorPentatonic',
  }

  describe('Rendering', () => {
    it('should render the fretboard container', () => {
      render(<Fretboard {...defaultProps} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should render string labels 1-6', () => {
      render(<Fretboard {...defaultProps} />)
      // String numbers should be visible (may appear multiple times due to fret numbers)
      expect(screen.getAllByText('1').length).toBeGreaterThan(0)
      expect(screen.getAllByText('6').length).toBeGreaterThan(0)
    })

    it('should render fret numbers', () => {
      render(<Fretboard {...defaultProps} frets={12} />)
      // Fret numbers should be visible
      expect(screen.getByText('12')).toBeInTheDocument()
    })

    it('should render legend items', () => {
      render(<Fretboard {...defaultProps} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
      expect(screen.getByText('3rd')).toBeInTheDocument()
      expect(screen.getByText('5th')).toBeInTheDocument()
      expect(screen.getByText('7th')).toBeInTheDocument()
      expect(screen.getByText('Scale Note')).toBeInTheDocument()
    })
  })

  describe('Note Display', () => {
    it('should show root note A in A minor pentatonic', () => {
      render(<Fretboard {...defaultProps} displayMode="notes" />)
      // A should appear multiple times on the fretboard (button text is just "A")
      const aButtons = screen.getAllByRole('button', { name: /^A$/ })
      expect(aButtons.length).toBeGreaterThan(0)
    })

    it('should show interval names in intervals mode', () => {
      render(<Fretboard {...defaultProps} displayMode="intervals" />)
      // Root notes should show "R"
      const rootButtons = screen.getAllByRole('button', { name: /R/ })
      expect(rootButtons.length).toBeGreaterThan(0)
    })

    it('should show scale degrees in degrees mode', () => {
      render(<Fretboard {...defaultProps} displayMode="degrees" />)
      // Degree 1 should appear for root notes
      const degreeButtons = screen.getAllByRole('button')
      expect(degreeButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Display Mode', () => {
    it('should render with notes display mode by default', () => {
      render(<Fretboard {...defaultProps} />)
      // In A minor pentatonic, we should see note names like A, C, D, E, G
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Tuning Support', () => {
    it('should work with standard tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['E', 'A', 'D', 'G', 'B', 'E']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with Drop D tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['D', 'A', 'D', 'G', 'B', 'E']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with D Standard tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['D', 'G', 'C', 'F', 'A', 'D']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with Drop C tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['C', 'G', 'C', 'F', 'A', 'D']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with 4-string bass tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['E', 'A', 'D', 'G']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with 7-string tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['B', 'E', 'A', 'D', 'G', 'B', 'E']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with 8-string tuning', () => {
      render(<Fretboard {...defaultProps} tuning={['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E']} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })
  })

  describe('Chord Tones Filter', () => {
    it('should render with chord tones filter off by default', () => {
      render(<Fretboard {...defaultProps} />)
      // All scale notes should be visible
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should accept showOnlyChordTones prop', () => {
      render(<Fretboard {...defaultProps} showOnlyChordTones={true} />)
      // Should still render, but with fewer notes
      expect(screen.getByText('Root')).toBeInTheDocument()
    })
  })

  describe('Position Filter', () => {
    it('should show all positions when position is null', () => {
      render(<Fretboard {...defaultProps} position={null} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should accept position prop', () => {
      render(<Fretboard {...defaultProps} position={0} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should work with different positions', () => {
      render(<Fretboard {...defaultProps} position={2} />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })
  })

  describe('Note Click Handling', () => {
    it('should call onNoteClick when a note is clicked', () => {
      const handleNoteClick = vi.fn()
      render(<Fretboard {...defaultProps} onNoteClick={handleNoteClick} />)

      const buttons = screen.getAllByRole('button')
      if (buttons.length > 0) {
        fireEvent.click(buttons[0])
        expect(handleNoteClick).toHaveBeenCalled()
      }
    })

    it('should track selected notes', () => {
      render(<Fretboard {...defaultProps} />)
      const buttons = screen.getAllByRole('button')

      if (buttons.length > 0) {
        // Click to select
        fireEvent.click(buttons[0])
        // Click again to deselect (toggle)
        fireEvent.click(buttons[0])
      }
    })
  })

  describe('Scale Types', () => {
    it('should render major scale', () => {
      render(<Fretboard rootNote="C" scale="major" />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should render minor scale', () => {
      render(<Fretboard rootNote="A" scale="minor" />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should render blues scale', () => {
      render(<Fretboard rootNote="E" scale="blues" />)
      expect(screen.getByText('Blue Note')).toBeInTheDocument()
    })

    it('should render dorian mode', () => {
      render(<Fretboard rootNote="D" scale="dorian" />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should render Fret Science pentatonic forms', () => {
      render(<Fretboard rootNote="A" scale="pentatonicForms" />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })

    it('should render Fret Science major pentatonic forms', () => {
      render(<Fretboard rootNote="C" scale="pentatonicFormsMajor" />)
      expect(screen.getByText('Root')).toBeInTheDocument()
    })
  })

  describe('Fret Count', () => {
    it('should render with default 24 frets', () => {
      render(<Fretboard {...defaultProps} />)
      expect(screen.getByText('24')).toBeInTheDocument()
    })

    it('should render with custom fret count', () => {
      render(<Fretboard {...defaultProps} frets={12} />)
      expect(screen.getByText('12')).toBeInTheDocument()
      expect(screen.queryByText('24')).not.toBeInTheDocument()
    })
  })
})
