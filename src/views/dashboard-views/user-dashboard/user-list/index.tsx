import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './user-view';
import AvatarStatus from './avatar-status';
import userData from "assets/data/user-list.data.json";

export class UserList extends Component {

	state = {
		users: userData,
		userProfileVisible: false,
		selectedUser: null
	}

	deleteUser = (userId: any) => {
		this.setState({
			users: this.state.users.filter((item: { id: any; }) => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
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

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_: any, record: { img: any; name: any; email: any; }) => (
					<div className="d-flex">
						<AvatarStatus src={record.img} name={record.name} subTitle={record.email} size={undefined} suffix={undefined} id={undefined} icon={undefined} shape={undefined} gap={undefined} text={undefined}/>
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
					<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
				),
				sorter: {
					compare: (a: any, b: any) => a.status.length - b.status.length,
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_: any, elm: { id: any; }) => (
					<div className="text-right d-flex justify-content-end">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={users} rowKey='id' />
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
			</Card>
		)
	}
}

export default UserList
