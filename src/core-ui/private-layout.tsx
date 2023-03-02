// External
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Internal
import { useAPI } from '../hooks';
import './template.min.css';

export const PrivateLayout = ({ children } : any) => {
    const [myMenuActive, setMyMenuActive] = useState(false)
    const toggleMyMenu = () => {
        setMyMenuActive(!myMenuActive)
    }
    const { apiData, simpleAPIRequest, rawAPIRequest } = useAPI()

    const [wpBlogSettings, setWPBlogSettings] = useState<any>(null)
    const [myMenuItems, setMyMenuItems] = useState<any>(null)

    useEffect(() => {
        let query1 = `query {
            generalSettings {
            title
            description
            }
        }`;
        let variables1 : any = null
        rawAPIRequest(query1, variables1)
            .then((res: any) => {
                setWPBlogSettings(res.data)
            });

        let query2 = `query ($menuId: ID!) {
            menu(id: $menuId, idType: DATABASE_ID) {
            count
            databaseId
            slug
            menuItems {
                nodes {
                url
                label
                }
            }
            }
        }`;
        let variables2 = { menuId: 174 };
        rawAPIRequest(query2, variables2)
            .then((res: any) => {
                setMyMenuItems(res.data)
            });
    }, [])

    return (
        <div id="main-wrapper">
            <div id="top-header">
                <Link to="/">
                    <span id="page-logo">
                        <img alt="Go@Netto" src={require('../Assets/Images/headerLogo.png')} />
                    </span>
                    <span id="logo-title">{ wpBlogSettings && wpBlogSettings.data.generalSettings.title }</span>
                    <span id="logo-teaser">{ wpBlogSettings && wpBlogSettings.data.generalSettings.description }</span>
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
                    myMenuItems && myMenuItems.data.menu.menuItems.nodes.map((item: any, key: string) => {
                        return (
                            <div className="side-nav-item" key={key}>
                                <span className="side-nav-item-link">{item.label}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div id="contents-wrapper">
                <div id="main-contents">
                    { children }
                </div>
                <div className="clrBth"></div>
            </div>
        </div>
    )
}