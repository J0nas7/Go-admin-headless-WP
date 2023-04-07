// External
import { render, screen } from '@testing-library/react'

// Internal
import Login from './Login'
import { GuestLayoutMock } from '../../test-env'

// Mount the Login component and test if key elements are rendered
describe("(Page) Login", () => {
  it("Should render all key form elements", () => {
    render( <GuestLayoutMock><Login /></GuestLayoutMock> )
    const emailInput = screen.getByLabelText('Konto')
    const passwordInput = screen.getByLabelText('Kodeord')
    const loginButton = screen.getByRole("button")

    expect(emailInput).toBeInstanceOf(HTMLInputElement)
    expect(passwordInput).toBeInstanceOf(HTMLInputElement)
    expect(loginButton).toBeInstanceOf(HTMLButtonElement)
  })
})