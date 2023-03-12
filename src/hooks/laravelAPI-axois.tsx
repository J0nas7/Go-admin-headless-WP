// External
import { useEffect, useState } from 'react'
import axios from 'axios'

// Internal
import { env, paths } from './environment'

export const laravelAPI = () => {
    const postWithData = (apiEndPoint : string, postContent : any = '') => {
        return axios
            .post(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`, 
            {
                postContent: JSON.stringify(postContent)
            })
    }

    const getRequest = (apiEndPoint : string) => {
        return axios
            .get(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`)
    }

    return {
        postWithData,
        getRequest
    }
}