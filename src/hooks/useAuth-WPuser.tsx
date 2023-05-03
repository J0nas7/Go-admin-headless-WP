// External
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

// Internal
import { useAuthContext } from '../context';
import { useLaravelAPI } from '../hooks'
import {
    useAppDispatch, 
    useTypedSelector, 
    useAuthActions, 
    setLoggedIn, 
    setLoggedOut, 
    setLoginErrorType, 
    selectLoginErrorType 
} from '../redux'

const errorCodes : any = {
    wrong_credentials: 'Incorrect credentials. Please try again.',
	invalid_username: 'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password: 'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
    "Login Attempt Failed": 'Incorrect credentials. Please try again.',
    "Empty request": 'Name or password not provided.',
}

export const useAuth = () => {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useAuthContext()
    const { httpPostWithData, requestCSRF } = useLaravelAPI()
    const [error,setError] = useState<any>(null)
    const [status,setStatus] = useState<any>(null)

    const dispatch = useAppDispatch()
    const loginErrorType = useTypedSelector(selectLoginErrorType)
    const { fetchAdminLoggedInStatus, adminDoLogout } = useAuthActions()

    const onLoginSuccess = /*useSafeDispatch( */ () => {
        localStorage.setItem("adminLoggedIn", "Is logged in")
        setIsLoggedIn(true)
        navigate("/")
    }

    const onError = /*useSafeDispatch(*/ (errors? : any) => {
        if (loginErrorType) {
            const theErrorMsg = loginErrorType//errors.message
            setError(
                errorCodes[theErrorMsg] || theErrorMsg || loginErrorType
                // `${ stripHtml( decodeEntities( errors.message ) ).result }`
            )
        } else if (errors) {
            dispatch(setLoginErrorType({
                "data": errors.message
            }))
        } else if (loginErrorType === "") {
            setError(null)
        }
	} //);
    useEffect(() => {
        onError()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginErrorType])

    const processLoginResult = (loginResult : any) => {
        console.log("THE LOGIN RESULT", loginResult)
        setStatus('resolved')
        if (loginResult.success === false) {
            onError(loginResult)
            console.log("answer", false)
        } else if (loginResult.success === true) {
            onLoginSuccess()
            console.log("answer", true)
            return true
        }
        return false
    }

    const adminLoggedInTest = () => {
        dispatch(fetchAdminLoggedInStatus(setLoggedIn))
        /*getRequest("adminLoggedInTest").then(({ data }) => {
            if (data.success === true && data.data === true) {
                onLoginSuccess()
            }
        })*/
    }

    const login = async (usernameInput : string, passwordInput : string) : Promise<boolean> => {
        setStatus('resolving')
        const loginVariables = {
            "username": usernameInput, 
            "password": passwordInput,
            //"token_name": usernameInput, 
        }
        
        // If name/email or password is empty
        if (!usernameInput || !passwordInput) {
            const data = {
                "success": false,
                "message": "Empty request",
                "data": false
            }
            processLoginResult(data)
            return false
        }
        
        // Resetting the errorType triggers another dispatch that resets the error
        dispatch(setLoginErrorType({ "data": "" }))
        
        console.log("loginVariables", loginVariables)
        // Request a new server-side Laravel Sanctum CSRF cookie
        requestCSRF().then(async csrfResp => {
            // Send login variables to the API for authentication
            try {
                const data = await httpPostWithData("adminLogin", loginVariables)
                return processLoginResult(data)
            } catch (e) {
                console.log("useAuth login error", e)
            }
        })
        return false
	}

    const logout = () => {
        console.log("Admin logging out")
        setStatus('resolving')
        dispatch(adminDoLogout(setLoggedOut))
        localStorage.removeItem("adminLoggedIn")
        setStatus('resolved')
        navigate("/login")
        return true
	}

    return {
		login,
		logout,
        onLoginSuccess,
        adminLoggedInTest,
		isLoggedIn,
		error,
		status,
		/*refetchViewer,
		loadingViewer,
		viewer,*/
	}
}