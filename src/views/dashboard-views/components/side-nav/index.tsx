import React from "react";
import { Layout } from 'antd';
// import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from '../../constants';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from "../menu-content";
// import MenuContent from './MenuContent'

const { Sider } = Layout;

export const SideNav = (props: { navCollapsed: any; sideNavTheme: any; routeInfo: any; hideGroupTitle: any; localization: boolean; }) => {
    // const props = { sideNavTheme, routeInfo , hideGroupTitle, localization}
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

// const mapStateToProps = ({ theme }) => {
//   const { navCollapsed, sideNavTheme } =  theme;
//   return { navCollapsed, sideNavTheme }
// };

// export default connect(mapStateToProps)(SideNav);

export default SideNav;
