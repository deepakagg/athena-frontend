import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, Button, Popconfirm, notification, Spin } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './user-view';
import AvatarStatus from './avatar-status';
import authService from 'services/authService';
import userService from 'services/userService';
import styled from 'styled-components';
import {
	updateUserList, setUpdateUserModalViewState, setUserIdState, updateCreateUserModalViewState,
} from '../../dashboardSlice';
import Flex from 'views/dashboard-views/components/Flex';

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

const StyledUserCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

interface IProps {
	userList: any[],
	dispatch: any,
}

export const UserList = (props: IProps) => {
	const { userList, dispatch } = props;
	const [userProfileVisible, setUserProfileVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [api, contextHolder] = notification.useNotification();
	const [datatableLoaderState, setDatatableLoaderState] = useState(false);

	useEffect(() => {
		setDatatableLoaderState(true);
		userService.getUserList()
			.then((userlist) => { dispatch(updateUserList(userlist)); setDatatableLoaderState(false); })
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

	const deleteUser = async (userId: any, email: string) => {
		const response = await authService.deleteUser(userId);
		if (response) {
			const users = userList.filter((item: { id: any; }) => item.id !== userId)
			dispatch(updateUserList(users));
			openNotification(true, 'Successful', `Deleted user ${email}`);
		}
		else {
			openNotification(false, 'Failed', `Failed to delete user ${email}`);
		}
	}

	const updateUser = async () => {
		dispatch(setUpdateUserModalViewState(true));
	}

	const showUserProfile = (userInfo: any) => {
		setUserProfileVisible(true);
		setSelectedUser(userInfo);
	};

	const closeUserProfile = () => {
		setUserProfileVisible(false);
		setSelectedUser(null);
	}

	const handleClick = (data: any) => {
		console.log(data)
	}

	const userEmail = authService.getUserEmail();

	const tableColumns: any = [
		{
			title: 'User',
			dataIndex: 'name',
			render: (_: any, record: { img: any; name: any; email: any; }) => (
				<div className="d-flex">
					<AvatarStatus src={record.img} name={record.name} subtitle={record.email} size={undefined} suffix={undefined} id={undefined} icon={undefined} shape={undefined} gap={undefined} text={undefined} onNameClick={e => handleClick(e)} />
				</div>
			),
			sorter: {
				compare: (a: any, b: any) => {
					a = a.name.toLowerCase();
					b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Role',
			dataIndex: 'role',
			sorter: {
				compare: (a: any, b: any) => a.role.length - b.role.length,
			},
		},
		{
			title: 'Last online',
			dataIndex: 'lastOnline',
			render: (date: number) => (
				<span>{moment.unix(date).format("MM/DD/YYYY")} </span>
			),
			sorter: (a: any, b: any) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (status: {} | null | undefined) => (
				<Tag className="text-capitalize" color={status === 'active' ? 'cyan' : 'red'}>{status}</Tag>
			),
			sorter: {
				compare: (a: any, b: any) => a.status.length - b.status.length,
			},
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_: any, elm: { id: any; email: string }) => (
				<div className="text-right d-flex justify-content-end">
					<SpacedActionItem>
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showUserProfile(elm) }} size="small" />
						</Tooltip>
					</SpacedActionItem>
					<SpacedActionItem>
						<Tooltip title="Edit">
							<Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setUserIdState(elm.id as string)); updateUser(); }} size="small" />
						</Tooltip>
					</SpacedActionItem>
					<SpacedActionItem>
						<Tooltip title="Delete">
							<Popconfirm disabled={elm.email === userEmail ? true : false} placement="left" title={`Confirm delete user ${elm.email}?`} onConfirm={() => { deleteUser(elm.id, elm.email) }} okText="Yes" cancelText="No">
								<Button disabled={elm.email === userEmail ? true : false} danger icon={<DeleteOutlined />} size="small" />
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
						<Button onClick={(e) => dispatch(updateCreateUserModalViewState(true))} type="primary" icon={<UserAddOutlined />} block>Create user</Button>
					</StyledUserCreateButton>
				</Flex>
				<div className="table-responsive">
					{datatableLoaderState ? <Spin tip="Loading...">
						<Table columns={tableColumns} dataSource={userList} rowKey='id' />
					</Spin> : <Table columns={tableColumns} dataSource={userList} rowKey='id' />}
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={() => { closeUserProfile() }} />
			</Card>
		</div>
	);
};

export default UserList;
