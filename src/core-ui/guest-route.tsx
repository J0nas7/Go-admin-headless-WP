// External
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// Internal
import { GuestLayout } from './guest-layout'
import { useAuthContext } from '../context'
import { useDocumentTitle } from '../hooks'

export const GuestRoute = () => {
    const { isLoggedIn } = useAuthContext()
    const auth = isLoggedIn // determine if authorized, from context or however you're doing it
    useDocumentTitle('Log på')

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !auth ?
        <GuestLayout>
            <Outlet />
        </GuestLayout>
        :
        <Navigate to="/" />
}