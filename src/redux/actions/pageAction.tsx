// External
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

// Internal
import { useLaravelAPI } from '../../hooks'

export const usePageActions = () => {
    const { httpGetRequest } = useLaravelAPI()
    const navigate = useNavigate()

    const fetchOptions = (httpUrl : string, __reducer: Function) => async (dispatch: Dispatch) => {
        try {
            const data = await httpGetRequest(httpUrl)
            
            if (data === "Unauthorized") {
                console.log("Error unauthorized")
                navigate("/logout")
            } else if (data) {
                dispatch(__reducer(data))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        fetchOptions
    }
}