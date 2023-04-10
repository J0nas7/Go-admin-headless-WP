// External
import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { BrowserRouter } from "react-router-dom"

// Internal
import { GuestLayout } from "./core-ui/guest-layout"
import { PrivateLayout } from "./core-ui/private-layout"
import { ReduxProviderWrapper } from "./redux/test.reduxWrapper"

export const GuestLayoutMock = ({children}:any) => {
    return (
        <ReduxProviderWrapper>
            <BrowserRouter>
                <GuestLayout>
                    { children }
                </GuestLayout>
            </BrowserRouter>
        </ReduxProviderWrapper>
    )
}

export const PrivateLayoutMock = ({children}:any) => {
    return (
        <ReduxProviderWrapper>
            <BrowserRouter>
                <PrivateLayout secure={true}>
                    { children }
                </PrivateLayout>
            </BrowserRouter>
        </ReduxProviderWrapper>
    )
}

export const wrapper = ({children}:any) => {
    return <GuestLayoutMock>{children}</GuestLayoutMock>;
}