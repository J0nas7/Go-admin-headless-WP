// External
import { Provider } from "react-redux"

// Internal
import appStore from "./store"

export const ReduxProviderWrapper = ({ children } : any) => {
    return (
        <Provider store={appStore(undefined)}>
            { children }
        </Provider>
    )
}