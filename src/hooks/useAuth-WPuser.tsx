// External
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

// Internal
import { useAuthContext } from '../context';
import { laravelAPI } from '../hooks'

const errorCodes : any = {
	invalid_username:
		'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password:
		'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
}

export const useAuth = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const { postWithData } = laravelAPI()
    const [error,setError] = useState<any>(null)
    const [status,setStatus] = useState<any>(null)

    const onLoginSuccess = /*useSafeDispatch( */ (loginData : any) => {
        localStorage.setItem("logonCreds", JSON.stringify(loginData))
        //setIsLoggedIn(loginData)
        //setLoginState(loginData)
        setStatus('resolved')
        navigate("/")
    } //);

    const onLogoutSuccess = /*useSafeDispatch(*/ () => {
		setStatus('resolved')
	} //);

    const onError = /*useSafeDispatch(*/ (errors : any) => {
        const theErrorMsg = errors.message
		setError(
            errorCodes[theErrorMsg] || theErrorMsg || errors
            // `${ stripHtml( decodeEntities( errors.message ) ).result }`
        )
		setStatus('resolved')
	} //);

    const processLoginResult = (loginResult : any) => {
        console.log("THE RESULT")
        console.log(loginResult.data)
        if (loginResult.data.errors) {
            onError(loginResult.data.errors[0])
        } else if (loginResult.data.data.login) {
            onLoginSuccess(loginResult.data.data.login)
        }
    }

    const login = (usernameInput : string, passwordInput : string) => {
		setError(null)
		setStatus('resolving')

        const loginVariables = {
            "username": usernameInput, 
            "password": passwordInput,
            //"token_name": usernameInput, 
        }
        
        console.log(loginVariables)
        //getLaravelSanctumCSRF()
        postWithData("login", loginVariables)
            .then(({ data }) => {
                setStatus('resolved')
                console.log("LOGIN RESULT")
                console.log(data)
            })
	};

    const logout = () => {
        setStatus('resolving')
        localStorage.removeItem("logonCreds")
        setStatus('resolved')
        navigate("/")
        return onLogoutSuccess
		//return logoutMutation().then(onLogoutSuccess).catch(onError);
	};

    return {
		login,
		logout,
		isLoggedIn,
		/*refetchViewer,
		loadingViewer,
		viewer,*/
		error,
		status
	}
}