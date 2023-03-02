// External
import { useState } from 'react';

// Internal
import { useLocalStorage } from '../hooks';

export const useAuthContext = () => {
    //const [isLoggedIn, setIsLoggedIn] = useState<any>(null)
    //const [state, setState] = useLocalStorage("logonCreds")
    
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        let logonCreds : any = localStorage.getItem("logonCreds")
        if (logonCreds)
            logonCreds = JSON.parse(logonCreds)
            if (logonCreds.authToken) return true
        
        return false
    })

    //console.log("local "+state)

    return {
        isLoggedIn,
        setIsLoggedIn,
        /*state, 
        setState*/
    }
}