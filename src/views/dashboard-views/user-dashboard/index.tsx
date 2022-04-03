import React, { useState } from 'react';
import HeaderNav from '../components/header-nav';
import {
    Layout, Modal,
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
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
    selectUserList,
    selectAuditList,
    selectCreateUserModalViewState,
    updateCreateUserModalViewState,
    selectUpdateUserModalViewState,
    setUpdateUserModalViewState,
    selectUserId,
    selectCreateUpdateUserRoleModalViewState,
    setCreateUpdateUserRoleModalViewState,
    selectEditFlag,
    selectCreateUpdateUserGroupModalViewState,
    setCreateUpdateUserGroupModalViewState,
} from '../dashboardSlice';
import Signup from 'views/auth-views/authentication/signup';
import UpdateForm from 'views/auth-views/components/UpdateForm';
import UserRoleCreateUpdateForm from './user-role-create-update';
import UserGroupCreateUpdateForm from './user-group-create-update';

const { Content } = Layout;

export const UserDashboard = () => {
    const isMobile = false;
    const isNavSide = true;
    const isNavTop = false;
    const [navCollapsed, setNavCollapsed] = useState(false);
    const userList = useAppSelector(selectUserList);
    const auditList = useAppSelector(selectAuditList);
    const isOpenCreateUserModal = useAppSelector(selectCreateUserModalViewState);
    const isOpenUpdateUserModal = useAppSelector(selectUpdateUserModalViewState);
    const isOpenCreateUpdateUserRoleModal = useAppSelector(selectCreateUpdateUserRoleModalViewState);
    const isOpenCreateUpdateGroupModal = useAppSelector(selectCreateUpdateUserGroupModalViewState);
    const selectedUserId = useAppSelector(selectUserId);
    const editFlag = useAppSelector(selectEditFlag);
    const dispatch = useAppDispatch();
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

    const handleCancelCreateUser = () => {
        dispatch(updateCreateUserModalViewState(false));
    };

    const handleCancelUpdateUser = () => {
        dispatch(setUpdateUserModalViewState(false));
    };

    const handleCancelCreateUpdateUserRole = () => {
        dispatch(setCreateUpdateUserRoleModalViewState(false));
    };

    const handleCancelCreateUpdateUserGroup = () => {
        dispatch(setCreateUpdateUserGroupModalViewState(false));
    };

    return (
        <Layout>
            <HeaderNav isMobile={isMobile} navCollapsed={navCollapsed} mobileNav={undefined} navType={undefined} headerNavColor={undefined} toggleCollapsedNav={setNavCollapsed} onMobileNavToggle={undefined} currentTheme={undefined} direction={undefined} onLogout={onLogout} dispatch={dispatch} />
            <Layout className="app-container">
                {(isNavSide && !isMobile) ? <SideNav routeInfo={''} navCollapsed={navCollapsed} sideNavTheme={undefined} hideGroupTitle={undefined} localization={false} /> : null}
            </Layout>
            {/* {(isNavTop && !isMobile) ? <TopNav routeInfo={currentRouteInfo}/> : null}
      <Layout className="app-container">
        {(isNavSide && !isMobile) ? <SideNav routeInfo={currentRouteInfo}/> : null } */}
            <Layout className="app-layout" style={getLayoutDirectionGutter()}>
                <div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}>
                    <PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title} dispatch={dispatch}/>
                    <Content>
                        <AppContainer itemSelected={history.location.pathname.split('/')[3]} userList={userList} auditList={auditList} dispatch={dispatch} />
                        <Modal title="Create User" visible={isOpenCreateUserModal} footer={null} onCancel={handleCancelCreateUser}>
                            <Signup isInternal={true} dispatch={dispatch}/>
                        </Modal>
                        <Modal title="Update User" visible={isOpenUpdateUserModal} footer={null} onCancel={handleCancelUpdateUser}>
                            <UpdateForm isInternal={true} selectedUserId={selectedUserId} dispatch={dispatch}/>
                        </Modal>
                        <Modal title={`${editFlag ? 'Update' : 'Create'} User role`} visible={isOpenCreateUpdateUserRoleModal} footer={null} onCancel={handleCancelCreateUpdateUserRole}>
                            <UserRoleCreateUpdateForm />
                        </Modal>
                        <Modal title={`${editFlag ? 'Update' : 'Create'} User group`} visible={isOpenCreateUpdateGroupModal} footer={null} onCancel={handleCancelCreateUpdateUserGroup}>
                            <UserGroupCreateUpdateForm />
                        </Modal>
                    </Content>
                </div>
            </Layout>
        </Layout>
    )
}

export default UserDashboard