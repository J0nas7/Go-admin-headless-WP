import { useState, useEffect } from 'react'
import axios from 'axios';

export const useAPI = () => {
    const [apiData, setAPIData] = useState<any>(null)
    const [apiRequest, setAPIRequest] = useState<any>(null)

    const endpointUrl = "http://project.detvildeweb.dk/netto/graphql"

    const simpleAPIRequest = (graphQuery: string, graphVariables: any) => {
        setAPIData(false)
        axios({
            url: endpointUrl,
            method: 'post',
            data: {
              "query": graphQuery,
              "variables": graphVariables
            },
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }).then(res => {
            setAPIData(res.data)
        }).catch(err => {
            console.log(err)
        })

        return { apiData }
    }

    const rawAPIRequest = (graphQuery: string, graphVariables: any, logonKey: string = '') => {
        let axiosObj : any = {
            url: endpointUrl,
            method: 'post',
            data: {
              "query": graphQuery,
              "variables": graphVariables
            },
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type" : "Application/json"
            }
        }
        if (logonKey) { axiosObj.headers.Authorization = logonKey }
        
        const axoisReq = axios(axiosObj)

        setAPIRequest(axoisReq)
        return axoisReq
    }

    return {
        apiData,
        simpleAPIRequest,
        rawAPIRequest, 
        apiRequest
    }
}