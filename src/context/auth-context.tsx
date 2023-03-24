// External
import { useState } from 'react';

// Internal
import { useLocalStorage } from '../hooks';

export const useAuthContext = () => {
    //const [isLoggedIn, setIsLoggedIn] = useState<any>(null)
    //const [state, setState] = useLocalStorage("logonCreds")
    const [authID, setAuthID] = useState<number>(0)
    const [authKey, setAuthKey] = useState<string>('')
    
    let logonCreds : any = null
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        logonCreds = localStorage.getItem("adminLoggedIn")
        if (logonCreds != null) {
            //logonCreds = JSON.parse(logonCreds)
            //if (logonCreds.userID && logonCreds.keyWithSalt) {
            if (logonCreds == "Is logged in") {
                /*setAuthID(logonCreds.userID)
                setAuthKey(logonCreds.keyWithSalt)*/
                //console.log("logonCreds true", logonCreds)
                return true
            }
        }
        
        console.log("logonCreds false")
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
        authID,
        authKey,
        isLoggedIn,
        setIsLoggedIn,
        logonCreds
        /*state, 
        setState*/
    }
}