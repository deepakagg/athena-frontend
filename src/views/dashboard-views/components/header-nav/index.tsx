import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { SearchOutlined } from '@ant-design/icons';
import Logo from '../../components/logo';
import NavProfile from '../nav-profile';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from '../../constants';
// import SearchInput from "../search-input";
import utils from '../../utils'

const { Header } = Layout;

export const HeaderNav = (props: { navCollapsed: any; mobileNav: any; navType: any; headerNavColor: any; toggleCollapsedNav: any; onMobileNavToggle: any; isMobile: any; currentTheme: any; direction: any; onLogout: any; dispatch: any; }) => {
    const { navCollapsed, mobileNav, navType, headerNavColor, toggleCollapsedNav, onMobileNavToggle, isMobile, currentTheme } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchActive, setSearchActive] = useState(false)

    // const onSearchActive = () => {
    //     setSearchActive(true)
    // }

    const onSearchClose = () => {
        setSearchActive(false)
    }

    const onToggle = () => {
        if (!isMobile) {
            toggleCollapsedNav(!navCollapsed)
        } else {
            onMobileNavToggle(!mobileNav)
        }
    }

    const isNavTop = navType === NAV_TYPE_TOP ? true : false


    const mode = () => {
        if (!headerNavColor) {
            return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff')
        }
        return utils.getColorContrast(headerNavColor)
    }
    const navMode = mode()
    const getNavWidth = () => {
        if (isNavTop || isMobile) {
            return '0px'
        }
        if (navCollapsed) {
            return `${SIDE_NAV_COLLAPSED_WIDTH}px`
        } else {
            return `${SIDE_NAV_WIDTH}px`
        }
    }

    useEffect(() => {
        if (!isMobile) {
            onSearchClose()
        }
    })

    return (
        <Header className={`app-header ${navMode}`} style={{ backgroundColor: headerNavColor }}>
            <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
                <Logo logoType={navMode} navCollapsed={navCollapsed} />
                <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
                    <div className="nav-left">
                        <ul className="ant-menu ant-menu-root ant-menu-horizontal">
                            {
                                isNavTop && !isMobile ?
                                    null
                                    :
                                    <li className="ant-menu-item ant-menu-item-only-child" onClick={() => { onToggle() }}>
                                        {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
                                    </li>
                            }
                            {/* {
                                isMobile ?
                                    <li className="ant-menu-item ant-menu-item-only-child" onClick={() => { onSearchActive() }}>
                                        <SearchOutlined />
                                    </li>
                                    :
                                    <li className="ant-menu-item ant-menu-item-only-child" style={{ cursor: 'auto' }}>
                                        <SearchInput mode={mode} isMobile={isMobile} active={undefined} close={undefined} />
                                    </li>
                            } */}
                        </ul>
                    </div>
                    <div className="nav-right">
                        <NavProfile signOut={props.onLogout} dispatch={props.dispatch}/>
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderNav;