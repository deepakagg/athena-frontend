import React from 'react'
import AppBreadcrumb from '../page-breadcrumb';
import styled from 'styled-components';

const StyledBreadcrumb = styled.div`
    margin-left: 20px;
`

export const PageHeader = (props: { title: string, display: any }) => {
    return (
        props.display ? (
            <div className="app-page-header">
                <h3 className="mb-0 mr-3 font-weight-semibold">
                    <div id={props.title ? props.title : 'home'}>{props.title ? props.title : 'home'}</div>
                </h3>
                <StyledBreadcrumb>
                    <AppBreadcrumb />
                </StyledBreadcrumb>
            </div>
        )
            : null
    )
}

export default PageHeader;