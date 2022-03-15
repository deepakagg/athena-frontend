import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import {
	MobileOutlined,
	MailOutlined,
	UserOutlined,
	CompassOutlined,
	CalendarOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const StyledSpan = styled.span`
    margin-left: 10px;
`

interface IProps {
	data: any;
	visible: any;
	close: any;
}

export class UserView extends Component<IProps, {}> {
	render() {
		const { data, visible, close } = this.props;
		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				closable={false}
				visible={visible}
			>
				<div className="text-center mt-3">
					<Avatar size={80} src={data?.img} />
					<h3 className="mt-2 mb-0">{data?.name}</h3>
					<span className="text-muted">{data?.personalInfo.title}</span>
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Account details</h6>
					<p>
						<UserOutlined />
						<StyledSpan className="text-dark">id: {data?.id}</StyledSpan>
					</p>
					<p>
						<CalendarOutlined />
						<StyledSpan className="text-dark">Born in {data?.personalInfo.birthday}</StyledSpan>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<StyledSpan className="text-dark">{data?.personalInfo.phoneNumber}</StyledSpan>
					</p>
					<p>
						<MailOutlined />
						<StyledSpan className="text-dark">{data?.email ? data?.email : '-'}</StyledSpan>
					</p>
					<p>
						<CompassOutlined />
						<StyledSpan className="text-dark">{data?.personalInfo.location}</StyledSpan>
					</p>
				</div>
			</Drawer>
		)
	}
}

export default UserView
