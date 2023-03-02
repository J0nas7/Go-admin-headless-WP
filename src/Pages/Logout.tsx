// External
import { useEffect } from 'react'

// Internal
import { useAuth } from '../hooks';

const Logout = () => {
    const { logout, error, status } = useAuth()

  useEffect(() => {
    logout()
  }, []);

    return (
        <div>
            <h1 className="page-title">Logging out...</h1>
        </div>
    )
}

export default Logout