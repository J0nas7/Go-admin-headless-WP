// External
import { render, screen, waitFor } from '@testing-library/react'

// Internal
import { PrivateLayoutMock } from '../test-env'

test('Should render top-header logo',  () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    setTimeout(() => {
        const logo = screen.getByRole('img')
        const logoAlt = screen.getByAltText('Go@')
        expect(logo).toBeInTheDocument()
        expect(logoAlt).toBeInTheDocument()
        expect(logoAlt).toHaveAttribute('src')
    }, 2000)
})

test('Should render top-header menu button', () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    const pageTitle = screen.getByText('Min menu')
    expect(pageTitle).toBeInTheDocument()
})

test('Should render top-header page title', () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    /*await waitFor(() => {
        const pageTitle = screen.getByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument();
    });*/
    setTimeout(() => {
        const pageTitle = screen.findByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument()
    }, 2000)
})

test('Should render top-header page description/teaser', () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    /*await waitFor(() => {
        const pageTitle = screen.getByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument();
    });*/
    setTimeout(() => {
        const pageTeaser = screen.findByText(/Gå på/i)
        expect(pageTeaser).toBeInTheDocument()
    }, 2100)
})