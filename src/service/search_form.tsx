// External
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Internal
import { Block, Text } from '../components'
import { useInternNavigate } from '../service'

export const useSearchForm = (pageUrl: string) => {
    const params = useParams<{ getSearch: string }>()
    const initSearchTerm : string = params.getSearch ? params.getSearch : ''
    const [dosearch,setDoSearch] = useState<string>(initSearchTerm)
    const [searchterm,setSearchterm] = useState<string>(initSearchTerm)

    const { appNavigate } = useInternNavigate(pageUrl)
    
    const performSearch = (e: any) => {
        e.preventDefault()
        console.log("SEARCH CHANGE")
        const navData = {
            'role': 'getSearch',
            'value': searchterm
        }
        appNavigate(navData)
        if (!searchterm) {
            setSearchterm('')
            setDoSearch('')
        }
    }

    useEffect(() => {
        if (params.getSearch) {
            console.log("param search changed")
            setSearchterm(params.getSearch)
            setDoSearch(params.getSearch)
        }
    }, [params.getSearch])

    const SearchActive = ({classList}:{classList:string}) => {
        return (
            <Block className={`${classList} md:text-right md:float-right ${(dosearch ? '' : 'hidden')}`}>
                {dosearch && (
                    <Text variant="span">Søgning efter: "{dosearch}"</Text>
                )}
            </Block>
        )
    }

    const SearchEnter = ({classList}:{classList:string}) => {
        return (
            <Block className={`${classList} md:text-right md:float-right ${(searchterm && !dosearch ? '' : 'hidden')}`}>
                {searchterm && !dosearch && (
                    <Text variant="span">Tryk på enter for at søge</Text>
                )}
            </Block>
        )
    }

    return {
        // Functions
        performSearch,
        setSearchterm,
        // Variables
        searchterm,
        dosearch,
        // Elements
        SearchActive,
        SearchEnter
    }
}