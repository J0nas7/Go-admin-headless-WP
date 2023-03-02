// External
/*import { createContext, useContext } from 'react';

// Internal
import { useLocalStorage } from '../hooks';

const AuthContext = createContext( {
	isLoggedIn: false,
	setIsLoggedIn: () => null,
} );

export const useAuthContext = () => {
	return useContext( AuthContext )
};

export const AuthContextProvider = ( { children } : any ) => {
	const [ isLoggedIn, setIsLoggedIn ] = useLocalStorage( false );

	const contextValue = {
		isLoggedIn,
		setIsLoggedIn,
	};

	return (
		<AuthContext.Provider value={ contextValue }>
			{ children }
		</AuthContext.Provider>
	);
};*/
export {}
