// External
import { useNavigate } from 'react-router-dom'

// Internal
import {
    useAppDispatch, 
    useOrdersActions,
    selectSingleOrder, 
    selectOrdersSummary, 
    selectOrdersSummaryLength,
    setSingleOrder,
    setOrdersSummary, 
    resetOrdersSummary,
    useTypedSelector
} from '../redux'

export const useOrders = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { fetchOrders, resetOrders } = useOrdersActions()
    const singleOrder = useTypedSelector(selectSingleOrder)
    const ordersSummaryList = useTypedSelector(selectOrdersSummary)
    const ordersSummaryListLength = useTypedSelector(selectOrdersSummaryLength)

    // Read summary of all orders
    const readAllOrdersSummary = (pageNr: number, searchterm: string) => {
        const postData = {
            "pageNr" : pageNr ? pageNr : 1,
            "searchTerm" : searchterm
        }
        //return postWithData("readAllOrdersSummary", postData)
        dispatch(resetOrders(resetOrdersSummary))
        dispatch(fetchOrders("readAllOrdersSummary", postData, setOrdersSummary))
    }

    // Read one specific order based on orderNr
    const readOneOrder = (orderNr: number) => {
        const postData = { "orderNr" : orderNr }
        dispatch(fetchOrders("readOneOrder", postData, setSingleOrder))
    }

    // Navigating
    const navigateToOrder = (orderId: number) => {
        navigate("/order/"+orderId)
    }

    return {
        // Data collection
        readAllOrdersSummary,
        readOneOrder,

        // Variables
        singleOrder,
        ordersSummaryList,
        ordersSummaryListLength,

        // Navigating
        navigateToOrder
    }
}