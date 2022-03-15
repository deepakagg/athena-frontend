import React from "react";
import { Layout } from 'antd';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK } from '../../constants';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from "../menu-content";

const { Sider } = Layout;

export const SideNav = (props: { navCollapsed: any; sideNavTheme: any; routeInfo: any; hideGroupTitle: any; localization: boolean; }) => {
    return (
        <Sider
            className={`side-nav ${props.sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
            width={SIDE_NAV_WIDTH}
            collapsed={props.navCollapsed}
        >
            <Scrollbars autoHide>
                <MenuContent
                    onMobileNavToggle={undefined} {...props} />
            </Scrollbars>
        </Sider>
    )
}

export default SideNav;
