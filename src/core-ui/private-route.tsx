// External
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// Internal
import { PrivateLayout } from './private-layout'
import { useAuthContext } from '../context'
import { useDocumentTitle } from '../hooks'

//export const PrivateRoute = () => {
export const PrivateRoute = ({
        secure = true
    } : {
        secure?: Boolean
    }) => {
    const { isLoggedIn } = useAuthContext()
    const auth = isLoggedIn // determine if authorized, from context or however you're doing it
    useDocumentTitle('')

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ?
        <PrivateLayout secure={secure}>
            <Outlet />
        </PrivateLayout>
        :
        <Navigate to="/login" />
}