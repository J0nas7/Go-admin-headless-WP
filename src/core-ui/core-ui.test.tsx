import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PrivateLayout } from './private-layout'

const PrivateLayoutMock = () => {
    return (
        <BrowserRouter>
            <PrivateLayout>
                <div>Demo</div>
            </PrivateLayout>
        </BrowserRouter>
    )
}

// GET BY
test('should render top-header content like logo', () => {
    render(<PrivateLayoutMock />)
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
})

test('should render top-header content like menu button', () => {
    render(<PrivateLayoutMock />)
    const pageTitle = screen.getByText('Min menu')
    expect(pageTitle).toBeInTheDocument()
})