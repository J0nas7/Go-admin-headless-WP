// External
import { useState } from 'react';

// Internal
//import { useLocalStorage } from '../hooks';

export const useAuthContext = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false)

    return {
        isLoggedIn,
        setIsLoggedIn
    }
}