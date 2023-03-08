// External
import axios from 'axios'

// Internal
import { API_CONFIG } from './laravel-config'

export const laravelAPI = () => {
    const postWithString = (apiPoint : string, searchTerm : string = '') => {
        return axios
            .post(`${API_CONFIG.BASE_URL}/${apiPoint}`, 
            {
                searchTerm: searchTerm
            })
    }

    const getRequest = (apiPoint : string) => {
        return axios
            .get(`${API_CONFIG.BASE_URL}/${apiPoint}`)
    }

    return {
        postWithString,
        getRequest
    }
}