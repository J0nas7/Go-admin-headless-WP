// External
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Internal
import './template.min.css';
import {
    selectBasicPageInfo, 
    setBasicPageInfo, 
    selectSideNavMenuItems, 
    setSideNavMenuItems, 
    useAppDispatch, 
    usePageActions, 
    useTypedSelector
} from '../redux';

//export const PrivateLayout = ({ children } : any) => {
export const PrivateLayout = ({
        secure = true,
        children
    } : {
        secure : Boolean, 
        children: any
    }) => {
    // Hooks
    const navigate = useNavigate()

    // Local variables
    const [wpBlogSettings, setWPBlogSettings] = useState<any>(null)
    const [menuItemsToRender, setMenuItemsToRender] = useState<any>(null)
    const [myMenuActive, setMyMenuActive] = useState(false)

    // Redux stuff
    const dispatch = useAppDispatch()
    const { fetchOptions } = usePageActions()
    const basicPageInfo = useTypedSelector(selectBasicPageInfo)
    const sideNavMenuItems = useTypedSelector(selectSideNavMenuItems)

    // Local functions
    const toggleMyMenu = () => { setMyMenuActive(!myMenuActive) }
    const sideNavBrowse = (url : string) => {
        setMyMenuActive(false)
        navigate(url)
    }

    // Redux dispatch page info and menu items
    const fetchLayoutContent = async () => {
        dispatch(fetchOptions("basicPageInfo", setBasicPageInfo))
        if (secure) dispatch(fetchOptions("getMenuLocation/Support-Min-menu", setSideNavMenuItems))
    }

    // Grab data on render
    useEffect(() => {
        fetchLayoutContent()   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Listen for redux variables
    useEffect(() => {
        if (basicPageInfo) setWPBlogSettings(basicPageInfo)
        if (sideNavMenuItems) setMenuItemsToRender(sideNavMenuItems)
    }, [basicPageInfo, sideNavMenuItems])

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
                    (menuItemsToRender && secure) && menuItemsToRender.map((item: any, key: string) => {
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