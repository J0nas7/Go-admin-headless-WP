// External
import { createSlice } from '@reduxjs/toolkit'

// Internal
import { OrderDTO } from '../../types'
import { RootState } from '../store'

export interface OrdersState {
    singleOrder: OrderDTO | undefined,
    ordersList: OrderDTO[],
    ordersSummaryList: OrderDTO[],
    ordersSummaryListLength: number,
    loading: boolean
}

const initialState = {
    singleOrder: undefined,
    ordersList: [],
    ordersSummaryList: [],
    ordersSummaryListLength: 0,
    loading: true
} as OrdersState

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state:OrdersState, action:any) => {
            state.ordersList = action.payload
            state.loading = false
        },
        setOrdersSummary: (state:OrdersState, action:any) => {
            state.ordersSummaryList = action.payload.data.orders
            state.ordersSummaryListLength = action.payload.data.length
            state.loading = false
        },
        setSingleOrder: (state:OrdersState, action:any) => {
            state.singleOrder = action.payload.data
        },
    },
})

const { actions } = ordersSlice
export const { setOrders, setOrdersSummary, setSingleOrder } = actions

export default ordersSlice.reducer

export const selectSingleOrder = (state: RootState) => state.orders.singleOrder
export const selectOrders = (state: RootState) => state.orders.ordersList
export const selectOrdersSummary = (state: RootState) => state.orders.ordersSummaryList
export const selectOrdersSummaryLength = (state: RootState) => state.orders.ordersSummaryListLength