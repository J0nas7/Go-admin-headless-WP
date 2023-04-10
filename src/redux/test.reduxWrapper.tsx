// External
import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

// Internal
import appStore, { appReducer, RootState } from "./store"
const wpInfo = {
    blogname: "Gogo",
    blogdescription: "Description"
}
const preload : PreloadedState<RootState> = {
    page: {
        basicPageInfo: wpInfo,
        sideNavMenuItems: []
    }
}

export const createTestStore = (preloadedState?: PreloadedState<RootState>) => {
    const store = configureStore({
        reducer: appReducer,
        preloadedState,
    })
    return store
}
const store = createTestStore(preload)

export const ReduxProviderWrapper = ({ children } : any) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}