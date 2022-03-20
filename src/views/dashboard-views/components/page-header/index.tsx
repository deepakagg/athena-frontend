import React from 'react'
import AppBreadcrumb from '../page-breadcrumb';
import styled from 'styled-components';
// import { Button } from 'antd';
// import { UserAddOutlined } from '@ant-design/icons';
// import {
//     updateCreateUserModalViewState,
// } from '../../dashboardSlice';

const StyledBreadcrumb = styled.div`
    margin-left: 20px;
`
// const StyledUserCreateButton = styled(Button)`
//     margin-left: auto; 
//     margin-right: 0;
// `;

export const PageHeader = (props: { title: string, display: any, dispatch: any }) => {
    return (
        props.display ? (
            <div className="app-page-header">
                <h3 className="mb-0 mr-3 font-weight-semibold">
                    <div id={props.title ? props.title : 'home'}>{props.title ? props.title : 'home'}</div>
                </h3>
                <StyledBreadcrumb>
                    <AppBreadcrumb />
                </StyledBreadcrumb>
                {/* {props.title === 'User list' ? <StyledUserCreateButton type="primary" shape="round" icon={<UserAddOutlined />} size={'large'} onClick={(e) => props.dispatch(updateCreateUserModalViewState(true))}>
                    Create user
                </StyledUserCreateButton> : null} */}
            </div>
        )
            : null
    )
}

export default PageHeader;