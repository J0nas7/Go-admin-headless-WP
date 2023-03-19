// External
import { useEffect, useState } from 'react'
import axios from 'axios'

// Internal
import { env, paths } from './environment'

export const laravelAPI = () => {
    const postWithData = async (apiEndPoint : string, postContent : any = '') => {
        //await getLaravelSanctumToken()
        return axios
            .post(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`, 
            {
                postContent: JSON.stringify(postContent)
            },
            {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json'
                },
            })
    }

    const getRequest = (apiEndPoint : string) => {
        return axios
            .get(`${env.url.API_URL+paths.API_ROUTE}/${apiEndPoint}`)
    }

    const getLaravelSanctumToken = async () => {
        await axios.post(`${env.url.API_URL+paths.API_ROUTE}/tokens/create`).then(response => {
            console.log(response)
            //axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
        });
    }

    const getLaravelSanctumCSRF = async () => {
        await axios.get(`${env.url.API_URL}/sanctum/csrf-cookie`).then(response => {
            console.log(response)
            console.log(response.data.token)
            //axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
        });
    }

    return {
        postWithData,
        getRequest,
        /*getLaravelSanctumToken,
        getLaravelSanctumCSRF*/
    }
}