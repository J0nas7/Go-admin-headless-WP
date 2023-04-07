// External
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Internal
import { PrivateLayout } from './private-layout'
import { ReduxProviderWrapper } from '../redux/test.reduxWrapper'

const PrivateLayoutMock = () => {
    return (
        <ReduxProviderWrapper>
            <BrowserRouter>
                <PrivateLayout secure={true}>
                    <div>Demo</div>
                </PrivateLayout>
            </BrowserRouter>
        </ReduxProviderWrapper>
    )
}

// GET BY
test('should render top-header content like logo',  () => {
    render(<PrivateLayoutMock />)
    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
})

test('should render top-header content like menu button', () => {
    render(<PrivateLayoutMock />)
    const pageTitle = screen.getByText('Min menu')
    expect(pageTitle).toBeInTheDocument()
})

// FIND BY
test('shound render top-header page title', () => {
    render(<PrivateLayoutMock />)
    /*await waitFor(() => {
        const pageTitle = screen.getByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument();
    });*/
    setTimeout(() => {
        const pageTitle = screen.findByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument()
    }, 2000);
})

test('shound render top-header page description/teaser', () => {
    render(<PrivateLayoutMock />)
    /*await waitFor(() => {
        const pageTitle = screen.getByText(/Go@/i)
        expect(pageTitle).toBeInTheDocument();
    });*/
    setTimeout(() => {
        const pageTeaser = screen.findByText(/Gå på/i)
        expect(pageTeaser).toBeInTheDocument()
    }, 2100);
})