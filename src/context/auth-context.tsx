// External
import { useState } from 'react';

// Internal
import { useLocalStorage } from '../hooks';

export const useAuthContext = () => {
    //const [isLoggedIn, setIsLoggedIn] = useState<any>(null)
    //const [state, setState] = useLocalStorage("logonCreds")
    
    let logonCreds : any = null
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        logonCreds = localStorage.getItem("logonCreds")
        if (logonCreds != null) {
            logonCreds = JSON.parse(logonCreds)
            if (logonCreds.authToken) return true
        }
        
        return false
    })

    /*const [logonCreds, setLogonCreds] = useState(() => {
        let logonCreds : any = localStorage.getItem("logonCreds")
        if (logonCreds)
            logonCreds = JSON.parse(logonCreds)
            if (logonCreds.authToken) return logonCreds
        
        return false
    })*/

    //console.log("local "+state)

    return {
        isLoggedIn,
        setIsLoggedIn,
        logonCreds
        /*state, 
        setState*/
    }
}