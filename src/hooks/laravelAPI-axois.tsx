// External
import axios from 'axios'

// Internal
import { API_CONFIG } from './laravel-config'

export const laravelAPI = () => {
    const readAllOrders = (searchTerm : string) => {
        return axios
            .post(`${API_CONFIG.BASE_URL}/readAllOrdersSummary`, 
            {
                searchTerm: searchTerm
            })
        /*return axios
            .get(`${API_CONFIG.BASE_URL}/readAllOrdersSummary`)*/
    }

    return {
        readAllOrders
    }
}