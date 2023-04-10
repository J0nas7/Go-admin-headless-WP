// External
import { render, screen, waitFor } from '@testing-library/react'
//import { useDispatch, useSelector } from "react-redux";

// Internal
import { PrivateLayoutMock } from '../test-env'

/*const reactRedux = { useDispatch, useSelector }
beforeEach(() => {
    /*const mockDispatch = jest.fn()
    useDispatchMock.mockReturnValue(mockDispatch)*
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch")
    let fnc = jest.fn
    useDispatchMock.mockImplementation(() : any => {
        return undefined
    })
})*/

test('Should render top-header logo',  async () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    await waitFor(() => {
        const logo = screen.getByRole('img')
        const logoAlt = screen.getByAltText('Gogo')
        expect(logo).toBeInTheDocument()
        expect(logoAlt).toBeInTheDocument()
        expect(logoAlt).toHaveAttribute('src')
    })
})

test('Should render top-header menu button', () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    const pageTitle = screen.getByText('Min menu')
    expect(pageTitle).toBeInTheDocument()
})

test('Should render top-header page title', async () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    const title = "Gogo"
    await waitFor(() => {
        const pageTitle = screen.getByText(title)
        expect(pageTitle).toBeInTheDocument()
    })
    expect(await screen.findByText(title)).toBeVisible()
})

test('Should render top-header page description/teaser', async () => {
    render(<PrivateLayoutMock><div>Demo</div></PrivateLayoutMock>)
    await waitFor(() => {
        const pageTeaser = screen.getByText(/Description/i)
        expect(pageTeaser).toBeInTheDocument()
    })
})