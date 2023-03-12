// External
import { useEffect, useState } from 'react'
import axios from 'axios'

// Internal
import { API_CONFIG } from './laravel-config'

export const laravelAPI = () => {
    const postWithData = (apiPoint : string, postContent : any = '') => {
        return axios
            .post(`${API_CONFIG.BASE_URL}/${apiPoint}`, 
            {
                postContent: JSON.stringify(postContent)
            })
    }

    const getRequest = (apiPoint : string) => {
        return axios
            .get(`${API_CONFIG.BASE_URL}/${apiPoint}`)
    }

    return {
        postWithData,
        getRequest
    }
}