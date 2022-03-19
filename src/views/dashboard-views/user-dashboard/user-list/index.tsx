import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, message, Button, Popconfirm, notification } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './user-view';
import AvatarStatus from './avatar-status';
import authService from 'services/authService';
import userService from 'services/userService';
import styled from 'styled-components';
import {
	updateUserList,
} from '../../dashboardSlice';

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

interface IProps {
	userList: any[],
	dispatch: any,
}

export const UserList = (props: IProps) => {
	const [userProfileVisible, setUserProfileVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [api, contextHolder] = notification.useNotification();

	useEffect(() => {
		userService.getUserList()
			.then((userlist) => { props.dispatch(updateUserList(userlist)); })
			.catch((e) => { console.log(e); props.dispatch(updateUserList([])); })
	});

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
			const users = props.userList.filter((item: { id: any; }) => item.id !== userId)
			props.dispatch(updateUserList(users));
			// message.success({ content: `Deleted user ${email}`, duration: 2 });
			openNotification(true, 'Successful', `Deleted user ${email}`);
		}
		else {
			// message.error({ content: `Failed to delete user ${email}`, duration: 2 });
			openNotification(false, 'Failed', `Failed to delete user ${email}`);
		}
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
						<Tooltip title="Delete">
							<Popconfirm placement="left" title={`Confirm delete user ${elm.email}?`} onConfirm={() => { deleteUser(elm.id, elm.email) }} okText="Yes" cancelText="No">
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
			<div className="table-responsive">
				<Table columns={tableColumns} dataSource={props.userList} rowKey='id' />
			</div>
			<UserView data={selectedUser} visible={userProfileVisible} close={() => { closeUserProfile() }} />
		</Card>
		</div>
	);
};

export default UserList;
