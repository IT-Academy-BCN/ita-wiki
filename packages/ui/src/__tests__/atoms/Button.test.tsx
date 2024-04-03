import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { dimensions, colors } from '../../styles'
import {Button} from '../../components/atoms/Button'
  
const mockClick = vi.fn()

describe('Button', () => {
    it('renders correctly', async () => {
        render(
            <Button data-testid="button" onClick={mockClick}>
                Test text
            </Button>
        )

        const button = screen.getByTestId('button')
        expect(button).toBeInTheDocument()

        //NOTE: WaitFor is needed to wait for the styles to be applied
        waitFor(() => {
            expect(screen.getByText('Test text')).toBeInTheDocument()
            expect(button).toHaveStyle(`border-radius: ${dimensions.borderRadius.base}`)
            expect(button).toHaveStyle(`padding: ${dimensions.spacing.base}`)
            expect(button).toHaveStyle(`background-color: ${colors.primary}`)
            expect(button).toHaveStyle(`color: ${colors.white}`)
            expect(button).toHaveStyle('cursor: pointer')
        })

        fireEvent.click(button)
        expect(mockClick).toHaveBeenCalled()
    })

    it('renders correctly with secondary', () => {
        render(
            <Button data-testid="button" secondary>
                Test text
            </Button>
        )
        const button = screen.getByTestId('button')

        //NOTE: WaitFor is needed to wait for the styles to be applied
        waitFor(() =>{
            expect(button).toHaveStyle(`background-color: ${colors.secondary}`)
            expect(button).toHaveStyle(`border: 2px solid ${colors.secondary}`)
            expect(button).toHaveStyle(`color: ${colors.white}`)
        })
    })

    it.only('renders correctly with outline', () => {
        render(
            <Button data-testid="button" outline>
                Test text
            </Button>
        )
        const button = screen.getByTestId('button')

        //NOTE: WaitFor is needed to wait for the styles to be applied
        waitFor(() =>{
            expect(button).toHaveStyle(`background-color: ${colors.white}`)
            expect(button).toHaveStyle(`border: 2px solid ${colors.gray.gray4}`)
            expect(button).toHaveStyle(`color: ${colors.gray.gray2}`)
        })
    })
})
