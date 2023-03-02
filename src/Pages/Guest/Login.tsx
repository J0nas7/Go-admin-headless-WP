// External
import { useState } from 'react';
import { Link } from 'react-router-dom'

// Internal
import { Field } from '../../components';
import { useAuth } from '../../hooks'

const Login = () => {
    const [username,setUsername] = useState<string>('')
	const [password,setPassword] = useState<string>('')
    const { login, error, status } = useAuth()

    const onLogin = (e : any) => {
        e.preventDefault()
        login(username, password)
    }
    
    return (
        <div id="login-page">
            <span className="the-logo"></span>
            <h1>Organisation</h1>
            <span className="teaser-msg">Log på med din organisationskonto</span>

            { error && (
				<div className="error-notice">
					<p>{ error }</p>
				</div>
			) }

            <div className="guest-form">
                <form onSubmit={onLogin} autoComplete="on">
                    <Field
                        type="text"
                        lbl="PersonID"
                        value={username}
                        onChange={(e: string) => setUsername(e)}
                        disabled={status === 'resolving'}
                        autoComplete="username"
                    />
                    <Field
                        type="password"
                        lbl="Kodeord"
                        value={password}
                        onChange={(e: string) => setPassword(e)}
                        disabled={status === 'resolving'}
                        autoComplete="password"
                    />
                    <p>
                        <button
                            className={'button ' + status}
                            onClick={onLogin}
                            disabled={status === 'resolving'}
                        >
                            <span className="btnTxt">
                                Log på
                            </span>
                        </button>
                    </p>
                </form>
            </div>

            <span className="guest-link">
                <Link to="#" className="underline">
                    Glemt adgangskode, eller problemer med at logge på?
                </Link>
            </span>
            <div className="clrBth"></div>
        </div>
    );
}

export default Login;