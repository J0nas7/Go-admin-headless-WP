// External
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@mui/material"

// Internal
import { Field, Block, Text, Heading } from '../../components'
import { useAuth } from '../../hooks'
import { useTypedSelector, selectIsLoggedIn } from '../../redux'

const Login = () => {
    const [username,setUsername] = useState<string>('')
	const [password,setPassword] = useState<string>('')
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const { login, adminLoggedInTest, onLoginSuccess, error, status } = useAuth()
    const isLoggedIn = useTypedSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn === true) {
            onLoginSuccess()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    useEffect(() => {
        adminLoggedInTest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ifEnter = (e: any) => {
        if (e.key === 'Enter') onLogin()
    }
    
    const onLogin = (e : any = '') => {
        if (typeof e.preventDefault === 'function') e.preventDefault()
        login(username, password)
    }
    
    return (
        <Block theId="login-page">
            <Block variant="span" className="the-logo"></Block>
            <Heading title="Organisation" />
            <Text variant="span" className="teaser-msg">Log på med din organisationskonto</Text>

            { error && status === 'resolved' && (
				<Block className="error-notice" variant="p">{ error }</Block>
			) }

            <Block className="guest-form">
                <form onSubmit={onLogin} autoComplete="on">
                    <Field
                        type="text"
                        lbl="Konto"
                        value={username}
                        onChange={(e: string) => setUsername(e)}
                        onKeyDown={(e: any) => {ifEnter(e)}}
                        disabled={status === 'resolving'}
                        autoComplete="username"
                        className="login-field"
                    />
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        lbl="Kodeord"
                        value={password}
                        onChange={(e: string) => setPassword(e)}
                        onKeyDown={(e: any) => {ifEnter(e)}}
                        endButton={() => {setShowPassword(!showPassword)}}
                        endContent={!showPassword ? 'Vis' : 'Skjul'}
                        disabled={status === 'resolving'}
                        autoComplete="password"
                        className="login-field"
                    />
                    <Text variant="p">
                        <Button
                            className={'login-btn button ' + status}
                            onClick={onLogin}
                            disabled={status === 'resolving'}
                        >
                            <Text variant="span" className="btnTxt">
                                Log på
                            </Text>
                        </Button>
                    </Text>
                </form>
            </Block>

            <Text variant="span" className="guest-link">
                <Link to="#" className="underline">
                    Glemt adgangskode, eller problemer med at logge på?
                </Link>
            </Text>
            <Block className="clear-both"/>
        </Block>
    )
}

export default Login