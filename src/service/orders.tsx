// External
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Internal
import { useLaravelAPI } from '../hooks'

export const useOrders = () => {
    const { postWithData } = useLaravelAPI()
    const navigate = useNavigate()

    // Read summary of all orders
    const readAllOrdersSummary = (pageNr: number, searchterm: string) => {
        const postData = {
            "pageNr" : pageNr ? pageNr : 1,
            "searchTerm" : searchterm
        }
        return postWithData("readAllOrdersSummary", postData)
    }

    // Read one specific order based on orderNr
    const readOneOrder = (orderNr: number) => {
        const postData = {
            "orderNr" : orderNr
        }
        return postWithData("readOneOrder", postData)
    }

    // Navigating
    const navigateToOrder = (orderId: number) => {
        navigate("/order/"+orderId)
    }

    return {
        // Data collection
        readAllOrdersSummary,
        readOneOrder,

        // Navigating
        navigateToOrder
    }
}