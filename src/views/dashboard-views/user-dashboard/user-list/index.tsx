import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './user-view';
import AvatarStatus from './avatar-status';
import authService from 'services/authService';
import styled from 'styled-components';

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

export class UserList extends Component {

	state = {
		users: [],
		userProfileVisible: false,
		selectedUser: null
	}

	componentDidMount = async () => {
		try {
			const response = await authService.listUsers();
			const userlist = response.map((item: any) => {
				return ({
					"id": item['id'],
					"name": `${item['first_name']} ${item['last_name']}`,
					"email": item['email'],
					"img": "/img/avatars/avatar-common.png",
					"role": item['is_admin'] ? 'Admin' : 'User',
					"lastOnline": item['last_login'] ? Math.round(Date.parse(item['last_login']) / 1000) : 0,
					"status": item['is_active'] ? 'active' : 'inactive',
					"personalInfo": {
						"location": "New York, US",
						"title": "Product Manager",
						"birthday": "10/10/1992",
						"phoneNumber": "+12-123-1234",
						"facebook": "facebook.com/sample",
						"twitter": "twitter.com/sample",
						"instagram": "instagram.com/sample",
						"site": "samplesite.com"
					}
				});
			});
			this.setState({ users: userlist });
		}
		catch (e) {
			this.setState({ users: [] });
		}
	}

	deleteUser = async (userId: any, email: string) => {
		const response = await authService.deleteUser(userId);
		if (response) {
			this.setState({
				users: this.state.users.filter((item: { id: any; }) => item.id !== userId),
			})
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
		const { users, userProfileVisible, selectedUser } = this.state;

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
					<Table columns={tableColumns} dataSource={users} rowKey='id' />
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={() => { this.closeUserProfile() }} />
			</Card>
		)
	}
}

export default UserList
