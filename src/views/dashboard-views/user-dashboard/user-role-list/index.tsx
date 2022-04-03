import React, { useEffect, useState } from 'react'
import { Card, Table, Tooltip, Button, Popconfirm, notification, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import authService from 'services/authService';
import styled from 'styled-components';
import {
	setCreateUpdateUserRoleModalViewState, selectUserRoleList, updateUserRoleList, setUserRoleIdState, setEditFlag, selectEditFlag, selectUserRoleId, selectCreateUpdateUserRoleModalViewState,
} from '../../dashboardSlice';
import Flex from 'views/dashboard-views/components/Flex';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ReactJson from 'react-json-view';

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

const StyledUserCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const UserRoleList = () => {
	const [api, contextHolder] = notification.useNotification();
	const [datatableLoaderState, setDatatableLoaderState] = useState(false);
	const userRoleList = useAppSelector(selectUserRoleList);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setDatatableLoaderState(true);
		authService.getUserRoles()
			.then((userRoleList) => { dispatch(updateUserRoleList(userRoleList)); setDatatableLoaderState(false); })
			.catch((e) => { console.log(e); dispatch(updateUserRoleList([])); setDatatableLoaderState(false); })
	}, [dispatch]);

	const openNotification = (isSuccess: boolean, message: string, description: string) => {
		const placement = 'topRight';
		if (isSuccess) {
			api.success({
				message: message,
				description: description,
				placement,
			});
		}
		else {
			api.error({
				message: message,
				description: description,
				placement,
			});
		}
	};

	const deleteUserRole = async (roleId: any, name: string) => {
		const response = await authService.deleteUserRole(roleId);
		if (response) {
			const userRole = userRoleList.filter((item: { id: any; }) => item.id !== roleId)
			dispatch(updateUserRoleList(userRole));
			openNotification(true, 'Successful', `Deleted role ${name}`);
		}
		else {
			openNotification(false, 'Failed', `Failed to delete role  ${name}`);
		}
	}

	const tableColumns: any = [
		{
			title: 'Id',
			dataIndex: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'Read only',
			dataIndex: 'read_only',
			render: (read_only: boolean) => (
				<span>{read_only.toString()} </span>
			),
		},
		{
			title: 'Methods',
			dataIndex: 'methods',
			render: (methods: any) => (
				<ReactJson collapsed={true} src={methods} enableClipboard={false} />
			),
		},
		{
			title: 'Query',
			dataIndex: 'query',
		},
		{
			title: 'Content type',
			dataIndex: 'content_type',
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_: any, elm: { id: any, name: any }) => (
				<div className="text-right d-flex justify-content-end">
					<SpacedActionItem>
						<Tooltip title="Edit">
							<Button className="mr-2" icon={<EditOutlined />} onClick={() => {
								dispatch(setEditFlag(true));
								dispatch(setUserRoleIdState(elm.id as string));
								dispatch(setCreateUpdateUserRoleModalViewState(true));
							}} size="small" />
						</Tooltip>
					</SpacedActionItem>
					<SpacedActionItem>
						<Tooltip title="Delete">
							<Popconfirm placement="left" title={`Confirm delete role ${elm.name}?`} onConfirm={() => { deleteUserRole(elm.id, elm.name) }} okText="Yes" cancelText="No">
								<Button danger icon={<DeleteOutlined />} size="small" />
							</Popconfirm>
						</Tooltip>
					</SpacedActionItem>
				</div>
			)
		}
	];
	return (
		<div>
			{contextHolder}
			<Card bodyStyle={{ 'padding': '0px' }}>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<StyledUserCreateButton>
						<Button onClick={(e) => {
							dispatch(setEditFlag(false));
							dispatch(setCreateUpdateUserRoleModalViewState(true));
						}} type="primary" icon={<UserAddOutlined />} block>Create user role</Button>
					</StyledUserCreateButton>
				</Flex>
				<div className="table-responsive">
					{datatableLoaderState ? <Spin tip="Loading...">
						<Table columns={tableColumns} dataSource={userRoleList} rowKey='id' />
					</Spin> : <Table columns={tableColumns} dataSource={userRoleList} rowKey='id' />}
				</div>
			</Card>
		</div>
	);
};

export default UserRoleList;
