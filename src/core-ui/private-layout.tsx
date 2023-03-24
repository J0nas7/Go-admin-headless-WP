// External
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Internal
import { useLaravelAPI } from '../hooks';
import './template.min.css';

export const PrivateLayout = ({ children } : any) => {
    const navigate = useNavigate();
    const { getRequest } = useLaravelAPI()

    const [myMenuActive, setMyMenuActive] = useState(false)
    const toggleMyMenu = () => {
        setMyMenuActive(!myMenuActive)
    }

    const [wpBlogSettings, setWPBlogSettings] = useState<any>(null)
    const [myMenuItems, setMyMenuItems] = useState<any>(null)

    const sideNavBrowse = (url : string) => {
        setMyMenuActive(false)
        navigate(url)
    }

    useEffect(() => {
        getRequest("basicPageInfo").then(({ data }) => {
            console.log(data);
            setWPBlogSettings(data.data)
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                console.log("Error unauthorized")
                navigate("/logout")
            }
        })

        getRequest("getMenuLocation/Support-Min-menu").then(({ data }) => {
            console.log(data)
            setMyMenuItems(data.data)
        })
    }, [])

    return (
        <div id="main-wrapper">
            <div id="top-header">
                <Link to="/">
                    <span id="page-logo">
                        <img alt={ wpBlogSettings && wpBlogSettings.blogname } src={require('../Assets/Images/headerLogo.png')} />
                    </span>
                    <span id="logo-title">{ wpBlogSettings && wpBlogSettings.blogname }</span>
                    <span id="logo-teaser">{ wpBlogSettings && wpBlogSettings.blogdescription }</span>
                </Link>

                <div id="right-nav">
                    <span className="button-wrapper" onClick={toggleMyMenu}>
                        <span className="button-txt">Min menu</span>
                    </span>
                </div>
                <div className="clrBth"></div>
            </div>
            <div id="side-nav" className={(myMenuActive ? 'open-nav' : '')}>
                {
                    myMenuItems && myMenuItems.map((item: any, key: string) => {
                        return (
                            <div className="side-nav-item" key={key}>
                                <span className="side-nav-item-link" onClick={() => sideNavBrowse(item.link)}>{item.label}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div id="contents-wrapper">
                <div id="main-contents">
                    { children }
                </div>
                <div className="clear-both"></div>
            </div>
        </div>
    )
}