// External
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// Internal
import { Block, Text } from '../components'
import { useInternNavigate } from '../service'

export const usePageNr = (pageUrl: string) => {
    const params = useParams<{ pageNr: string }>()
    const initPageNr : number = params.pageNr ? parseInt(params.pageNr) : 1
    const [pageSize, setPageSize] = useState<number>(10)
    const [currentPageNr, setCurrentPageNr] = useState<number>(initPageNr)
    const [startResult, setStartResult] = useState<number>((currentPageNr - 1) * pageSize + 1)
    const [endResult, setEndResult] = useState<number>(startResult+9)
    const [listSize, setListSize] = useState<number>(0)
    const { appNavigate } = useInternNavigate(pageUrl)

    const updatePageNr = (pageNr: number) => {
        const newStartResult = ((pageNr - 1) * pageSize + 1)
        let newEndResult = (newStartResult+9)
        newEndResult = (newEndResult < listSize) ? newEndResult : listSize
        console.log("SET PAGE "+pageNr+" "+currentPageNr)
        setCurrentPageNr(pageNr)
        console.log("PAGE SET "+pageNr+" "+currentPageNr)
        setStartResult(newStartResult)
        setEndResult(newEndResult)
    }

    const paginationChange = (pageNr: number) => {
        console.log("PAGINATION CHANGE")
        const navData = {
            'role': 'pageNr',
            'value': pageNr
        }
        appNavigate(navData)
    }

    useEffect(() => {
        if (params.pageNr) {
            console.log("param pagenr change")
            updatePageNr(parseInt(params.pageNr))
        }
    }, [params.pageNr])

    const PaginationIndex = ({
        classList
    } : {
        classList: string
    }) => {
        return (
            <Block className={classList+" md:float-left"}>
                {(listSize > 0) && (
                    <Text variant='span'>Side {currentPageNr} viser resultat: {startResult}-{endResult} af {listSize}</Text>
                )}
            </Block>
        )
    }

    return {
        // Functions
        paginationChange,
        setCurrentPageNr,
        setListSize,
        // Variables
        currentPageNr,
        startResult,
        endResult,
        pageSize,
        listSize,
        // Elements
        PaginationIndex
    }
}