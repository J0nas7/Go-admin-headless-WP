// External
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

// Internal
import { useAuthContext } from '../context';
import { useLaravelAPI } from '../hooks'

const errorCodes : any = {
    wrong_credentials: 'Incorrect credentials. Please try again.',
	invalid_username: 'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password: 'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
    "Login Attempt Failed": 'Incorrect credentials. Please try again.',
}

export const useAuth = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const { getRequest, postWithData, requestCSRF } = useLaravelAPI()
    const [error,setError] = useState<any>(null)
    const [status,setStatus] = useState<any>(null)

    const onLoginSuccess = /*useSafeDispatch( */ () => {
        /*loginData = {
            "userID": loginData.userID,
            "keyWithSalt": loginData.keyWithSalt,
        }
        localStorage.setItem("logonCreds", JSON.stringify(loginData))*/
        localStorage.setItem("adminLoggedIn", "Is logged in")
        //setIsLoggedIn(loginData)
        //setLoginState(loginData)
        setStatus('resolved')
        navigate("/")
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
        console.log(loginResult)
        if (loginResult.success == false) {
            onError(loginResult)
        } else if (loginResult.success == true) {
            onLoginSuccess()
        }
    }

    const adminLoggedInTest = () => {
        getRequest("adminLoggedInTest").then(({ data }) => {
            if (data.success == true && data.data == true) {
                onLoginSuccess()
            }
        })
    }

    const login = async (usernameInput : string, passwordInput : string) => {
		setError(null)
		setStatus('resolving')

        const loginVariables = {
            "username": usernameInput, 
            "password": passwordInput,
            //"token_name": usernameInput, 
        }
        
        console.log("loginVariables", loginVariables)
        requestCSRF().then(csrfResp => {
            postWithData("adminLogin", loginVariables)
                .then(({ data }) => {
                    setStatus('resolved')
                    console.log("LOGIN RESULT:")
                    console.log(data)
                    processLoginResult(data)
                })
        })
	};

    const logout = () => {
        console.log("Admin logging out")
        setStatus('resolving')
        getRequest("adminLogout").then(({ data }) => {
            if (data.success == true && data.data == true) {
                localStorage.removeItem("adminLoggedIn")
                setStatus('resolved')
                navigate("/login")
                return true
            }
        })
		//return logoutMutation().then(onLogoutSuccess).catch(onError);
	};

    return {
		login,
		logout,
        adminLoggedInTest,
		isLoggedIn,
		error,
		status,
		/*refetchViewer,
		loadingViewer,
		viewer,*/
	}
}