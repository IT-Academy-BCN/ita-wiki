import { render, screen } from '@testing-library/react'
import { Title } from '../../components/atoms'

describe('Title', () => {
    it('should render the title', () => {
        render(
            <Title as="h2" fontWeight="bold">
                test
            </Title>
        )

        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByText('test').tagName).toBe('H2')
        expect(screen.getByText('test')).toHaveStyle({ 'font-weight': 'bold' })
    })
})
