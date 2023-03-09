// External
import { useState } from 'react'

// Internal
import { Block, Text } from './'

export const useSearchForm = () => {
    const [searchterm,setSearchterm] = useState<string>('')
    const [dosearch,setDoSearch] = useState<string>('')

    const performSearch = (e : any) => {
        e.preventDefault()
        console.log("do search: "+searchterm)
        setDoSearch(searchterm)
    }

    const SearchActive = ({
        classList
    } : {
        classList: string
    }) => {
        return (
            <Block className={`${classList} md:text-right md:float-right ${(dosearch ? '' : 'hidden')}`}>
                {dosearch && (
                    <Text variant="span">Søgning efter: "{dosearch}"</Text>
                )}
            </Block>
        )
    }

    const SearchEnter = ({
        classList
    } : {
        classList: string
    }) => {
        return (
            <Block className={`${classList} md:text-right md:float-right ${(searchterm && !dosearch ? '' : 'hidden')}`}>
                {searchterm && !dosearch && (
                    <Text variant="span">Tryk på enter for at søge</Text>
                )}
            </Block>
        )
    }

    return {
        // 
        performSearch,
        searchterm,
        setSearchterm,
        dosearch,

        // Elements
        SearchActive,
        SearchEnter
    }
}