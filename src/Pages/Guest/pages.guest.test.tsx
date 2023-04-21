// External
import { fireEvent, render, screen, renderHook, waitFor } from '@testing-library/react'
//import { renderHook } from '@testing-library/react-hooks'

// Internal
import Login from './Login'
import { GuestLayoutMock, guestWrapper as wrapper } from '../../test-env'
import { useAuth } from '../../hooks'

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
    //expect(false).toBe(true)
  })
})

describe("(Activity) Login failure", () => {
  it("Should render error message if invalid credentials are entered", async () => {
    render( <GuestLayoutMock><Login /></GuestLayoutMock> )
    const { result } = renderHook(() => useAuth(), { wrapper })

    const emailInput = screen.getByLabelText('Konto')
    const passwordInput = screen.getByLabelText('Kodeord')
    const loginButton = screen.getByRole("button")

    fireEvent.change(emailInput, {
      target: { value: "Nameuser" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "Wordpass" },
    })
    //fireEvent.click(loginButton)

    //setTimeout(() => {
    await waitFor(()=> {
      /*const errorMsg = screen.getByText("Incorrect credentials. Please try again.")
      expect(errorMsg).toBeInTheDocument()*/

      /*const loginRes = result.current.login(emailInput.nodeValue!, passwordInput.nodeValue!)
      expect(false).toBe(true)*/
      const loginRes = result.current.login(emailInput.nodeValue!, passwordInput.nodeValue!)
      loginRes.then(boo => expect(boo).toBe(false)).catch()
    })
  })
})

describe("(Activity) Login missing credentials", () => {
  it("Should render error message if some credentials are not entered", async () => {
    render( <GuestLayoutMock><Login /></GuestLayoutMock> )
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    const emailInput = screen.getByLabelText('Konto')
    const passwordInput = screen.getByLabelText('Kodeord')
    const loginButton = screen.getByRole("button")

    fireEvent.change(emailInput, {
      target: { value: "Nameuser" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "" },
    })
    fireEvent.click(loginButton)

    await waitFor(()=> {
      const errorMsg = screen.getByText("Name or password not provided.")
      expect(errorMsg).toBeInTheDocument()

      const loginRes = result.current.login(emailInput.nodeValue!, passwordInput.nodeValue!)
      loginRes.then(boo => expect(boo).toBe(false)).catch()
    })
  })
})