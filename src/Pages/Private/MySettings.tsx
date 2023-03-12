// External
import { useEffect, useState } from 'react'

// Internal
//import { useAPI } from '../../hooks';

const MySettings = () => {
  //const { apiData, simpleAPIRequest, rawAPIRequest } = useAPI()
  const [mySettingsData, setMySettingsData] = useState<any>(null)

  useEffect(() => {
    
  }, []);

    return (
        <div>
            <h1 className="page-title">Settings</h1>
        </div>
    )
}

export default MySettings