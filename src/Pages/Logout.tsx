// External
import { useEffect } from 'react'

// Internal
import { useAuth } from '../hooks';
import { Block, Heading } from '../components'

const Logout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
      <Block className="current-orders w-full">
        <Heading title="Logging out..." />
      </Block>
    )
}

export default Logout