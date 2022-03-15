import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
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
	dispatchUserList: any,
}

export class UserList extends Component<IProps> {
	state = {
		userProfileVisible: false,
		selectedUser: null
	}

	componentDidMount = async () => {
		try {
			const userlist = await userService.getUserList();
			this.props.dispatchUserList(updateUserList(userlist));
		}
		catch (e) {
			this.props.dispatchUserList(updateUserList([]));
		}
	}

	deleteUser = async (userId: any, email: string) => {
		const response = await authService.deleteUser(userId);
		if (response) {
			const users = this.props.userList.filter((item: { id: any; }) => item.id !== userId)
			this.props.dispatchUserList(updateUserList(users));
			message.success({ content: `Deleted user ${email}`, duration: 2 });
		}
		else {
			message.error({ content: `Failed to delete user ${email}`, duration: 2 });
		}
	}

	showUserProfile = (userInfo: any) => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};

	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
		});
	}

	render() {
		const { userProfileVisible, selectedUser } = this.state;

		const handleClick = (data: any) => {
			console.log(data)
		}

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
								<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { this.showUserProfile(elm) }} size="small" />
							</Tooltip>
						</SpacedActionItem>
						<SpacedActionItem>
							<Tooltip title="Delete">
								<Button danger icon={<DeleteOutlined />} onClick={() => { this.deleteUser(elm.id, elm.email) }} size="small" />
							</Tooltip>
						</SpacedActionItem>
					</div>
				)
			}
		];
		return (
			<Card bodyStyle={{ 'padding': '0px' }}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={this.props.userList} rowKey='id' />
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={() => { this.closeUserProfile() }} />
			</Card>
		)
	}
}

export default UserList
