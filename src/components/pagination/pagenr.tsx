// External
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Internal
import { Block, Text } from '../'

export const usePageNr = (pageUrl: string, pageNr: any) => {
    const navigate = useNavigate()
    const [pageSize, setPageSize] = useState<number>(10)
    const [currentPageNr, setCurrentPageNr] = useState<number>(pageNr ? parseInt(pageNr?.replace("side-", "")) : 1)
    const [startResult, setStartResult] = useState<number>((currentPageNr - 1) * pageSize + 1)
    const [endResult, setEndResult] = useState<number>(startResult+9)
    const [listSize, setListSize] = useState<number>(0)

    const navigatePageNr = (pageNr: number) => {
        const newStartResult = (pageNr - 1) * pageSize + 1
        setCurrentPageNr(pageNr)
        setStartResult(newStartResult)
        setEndResult(newStartResult+9)
        const urlWithPageNr = `/side-${pageNr}`
        navigate(`${pageUrl}${pageNr > 1 ? urlWithPageNr : ''}`)
    }

    const PaginationIndex = ({
        classList
    } : {
        classList: string
    }) => {
        return (
            <Block className={classList+" md:float-left"}>
                {(listSize > 0) && (
                    <Text variant='span'>Viser resultat: {startResult}-{endResult} af {listSize}</Text>
                )}
            </Block>
        )
    }

    return {
        currentPageNr,
        navigatePageNr,
        startResult,
        endResult,
        pageSize,
        listSize,
        setListSize,

        // Elements
        PaginationIndex
    }
}