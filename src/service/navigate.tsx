// External
import { useParams, useNavigate } from 'react-router-dom'

export const useInternNavigate = (pageUrl: string) => {
    const navigate = useNavigate()
    let params = useParams<{ pageNr: string, getSearch: string }>()
    let navigateUrl : string = ''

    const appNavigate = (navData: any) => {
        if (pageUrl === "/cur-orders/") {
            if (navData.role === "pageNr") {
                navigateUrl = "side/"+navData.value
            } else {
                const thePageNr = (params.pageNr ? params.pageNr : 1)
                navigateUrl = "side/"+thePageNr
            }

            if (navData.role === "getSearch") {
                navigateUrl = "side/1"
                if (navData.value) {
                    navigateUrl += "/sog/"+navData.value
                }
            } else if (params.getSearch) {
                navigateUrl += "/sog/"+params.getSearch
            }
        }

        navigate(pageUrl + navigateUrl)
    }

    return {
        appNavigate
    }

}