// External
import { Dispatch } from 'redux'

// Internal
import { useLaravelAPI } from '../../hooks'

export const useOrdersActions = () => {
    const { httpPostWithData } = useLaravelAPI()

    const fetchOrders = (httpUrl : string, postData : Object, __reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpPostWithData(httpUrl, postData)
            if (data) dispatch(__reducer(data))
        } catch (e) {
            console.log(e)
        }
    }

    return {
        fetchOrders
    }
}