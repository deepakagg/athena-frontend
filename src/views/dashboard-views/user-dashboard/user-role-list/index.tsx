import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, Button, Popconfirm, notification, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import authService from 'services/authService';
import styled from 'styled-components';
import {
	updateUserList, setUpdateUserModalViewState, setUserIdState, selectUserRoleList, updateCreateUserRoleModalViewState, updateUserRoleList,
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
			.catch((e) => { console.log(e); dispatch(updateUserList([])); setDatatableLoaderState(false); })
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

	// const deleteUser = async (userId: any, email: string) => {
	// 	const response = await authService.deleteUser(userId);
	// 	if (response) {
	// 		const users = userRoleList.filter((item: { id: any; }) => item.id !== userId)
	// 		dispatch(updateUserList(users));
	// 		openNotification(true, 'Successful', `Deleted user ${email}`);
	// 	}
	// 	else {
	// 		openNotification(false, 'Failed', `Failed to delete user ${email}`);
	// 	}
	// }

	// const updateUser = async () => {
	// 	dispatch(setUpdateUserModalViewState(true));
	// }

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
		// {
		// 	title: '',
		// 	dataIndex: 'actions',
		// 	render: (_: any, elm: { id: any; email: string }) => (
		// 		<div className="text-right d-flex justify-content-end">
		// 			<SpacedActionItem>
		// 				<Tooltip title="Edit">
		// 					<Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setUserIdState(elm.id as string)); updateUser(); }} size="small" />
		// 				</Tooltip>
		// 			</SpacedActionItem>
		// 			<SpacedActionItem>
		// 				<Tooltip title="Delete">
		// 					<Popconfirm disabled={elm.email === userEmail ? true : false} placement="left" title={`Confirm delete user ${elm.email}?`} onConfirm={() => { deleteUser(elm.id, elm.email) }} okText="Yes" cancelText="No">
		// 						<Button disabled={elm.email === userEmail ? true : false} danger icon={<DeleteOutlined />} size="small" />
		// 					</Popconfirm>
		// 				</Tooltip>
		// 			</SpacedActionItem>
		// 		</div>
		// 	)
		// }
	];
	return (
		<div>
			{contextHolder}
			<Card bodyStyle={{ 'padding': '0px' }}>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<StyledUserCreateButton>
						<Button onClick={(e) => dispatch(updateCreateUserRoleModalViewState(true))} type="primary" icon={<UserAddOutlined />} block>Create user role</Button>
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