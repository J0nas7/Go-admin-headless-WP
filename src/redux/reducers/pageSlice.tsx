// External
import { createSlice } from '@reduxjs/toolkit'

// Internal
import { RootState } from '../store'

export interface PageState {
    basicPageInfo: Object | undefined,
    sideNavMenuItems: []
}

const initialState = {
    basicPageInfo: undefined,
    sideNavMenuItems: []
} as PageState

export const pageSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setBasicPageInfo: (state:PageState, action:any) => {
            state.basicPageInfo = action.payload.data
        },
        setSideNavMenuItems: (state:PageState, action:any) => {
            state.sideNavMenuItems = action.payload.data
        },
    }
})

const { actions } = pageSlice
export const { setBasicPageInfo, setSideNavMenuItems } = actions

export default pageSlice.reducer

export const selectBasicPageInfo = (state: RootState) => state.page.basicPageInfo
export const selectSideNavMenuItems = (state: RootState) => state.page.sideNavMenuItems