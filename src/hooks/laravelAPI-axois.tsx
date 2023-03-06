// External
import axios from 'axios'

// Internal
import { API_CONFIG } from './laravel-config'

export const laravelAPI = () => {
    const readAllOrders = () => {
        return axios
            .get(`${API_CONFIG.BASE_URL}/readAllOrdersSummary`)
    }

    return {
        readAllOrders
    }
}