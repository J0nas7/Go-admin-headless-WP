// External
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Internal
import { laravelAPI } from '../hooks';
import './template.min.css';

export const PrivateLayout = ({ children } : any) => {
    const navigate = useNavigate();
    const { getRequest } = laravelAPI()

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
        getRequest("generalPageInfo").then(({ data }) => {
            setWPBlogSettings(data)
        })

        getRequest("getMenuLocation/174").then(({ data }) => {
            setMyMenuItems(data)
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
                                <span className="side-nav-item-link" onClick={() => sideNavBrowse(item.meta_value)}>{item.post_title}</span>
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