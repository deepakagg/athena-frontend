import React, { useState } from 'react';
import HeaderNav from '../components/header-nav';
import {
    Layout,
} from "antd";
import authService from '../../../services/authService';
import { useHistory } from "react-router-dom";
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    DIR_RTL,
    DIR_LTR
} from '../constants';
import utils from '../utils';
import SideNav from '../components/side-nav';
import PageHeader from '../components/page-header';
import navigationConfig from "../../../configs/NavigationConfig";
import AppContainer from './app-container';

const { Content } = Layout;

export const UserDashboard = () => {
    const isMobile = false;
    const isNavSide = true;
    const isNavTop = false;
    const [navCollapsed, setNavCollapsed] = useState(false);
    const getLayoutGutter = () => {
        if (isNavTop || isMobile) {
            return 0
        }
        return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
    }

    const getLayoutDirectionGutter = () => {
        const direction = DIR_LTR;
        if (direction === DIR_LTR) {
            return { paddingLeft: getLayoutGutter() }
        }
        if (direction === DIR_RTL) {
            return { paddingRight: getLayoutGutter() }
        }
        return { paddingLeft: getLayoutGutter() }
    }
    // eslint-disable-next-line no-restricted-globals
    const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
    const history = useHistory();

    const onLogout = () => {
        authService.logoutUser();
        history.push("/auth/login");
    }

    return (
        <Layout>
            <HeaderNav isMobile={isMobile} navCollapsed={navCollapsed} mobileNav={undefined} navType={undefined} headerNavColor={undefined} toggleCollapsedNav={setNavCollapsed} onMobileNavToggle={undefined} currentTheme={undefined} direction={undefined} onLogout={onLogout} />
            <Layout className="app-container">
                {(isNavSide && !isMobile) ? <SideNav routeInfo={''} navCollapsed={navCollapsed} sideNavTheme={undefined} hideGroupTitle={undefined} localization={false} /> : null}
            </Layout>
            {/* {(isNavTop && !isMobile) ? <TopNav routeInfo={currentRouteInfo}/> : null}
      <Layout className="app-container">
        {(isNavSide && !isMobile) ? <SideNav routeInfo={currentRouteInfo}/> : null } */}
            <Layout className="app-layout" style={getLayoutDirectionGutter()}>
                <div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}>
                    <PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title} />
                    <Content>
                        <AppContainer itemSelected={history.location.pathname.split('/')[3]}/>
                    </Content>
                </div>
            </Layout>
        </Layout>
    )
}

// const mapStateToProps = ({ theme }) => {
//   const { navCollapsed, navType, locale } =  theme;
//   return { navCollapsed, navType, locale }
// };

// export default connect(mapStateToProps)(React.memo(AppLayout));
export default UserDashboard