import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import {
	MobileOutlined,
	MailOutlined,
	UserOutlined,
	CompassOutlined,
	CalendarOutlined,
	DatabaseOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import ReactJson from 'react-json-view';

const StyledSpan = styled.span`
    margin-left: 10px;
`

interface IProps {
	data: any;
	visible: any;
	close: any;
}

export class DeviceView extends Component<IProps, {}> {
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
					<h3 className="mt-2 mb-0">{data?.name}</h3>
					<span className="text-muted">{data?.description}</span>
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Device details</h6>
					<p>
						<DatabaseOutlined />
						<StyledSpan className="text-dark">Id : {data?.id}</StyledSpan>
					</p>
					<p>
						<CalendarOutlined />
						<StyledSpan className="text-dark">Device type : {data?.device_type}</StyledSpan>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Device configuration details</h6>
					<StyledSpan className="text-dark">
						<ReactJson collapsed={true} src={data?.configuration} enableClipboard={false} />
					</StyledSpan>
				</div>
				{/* <div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Device data format details</h6>
					<StyledSpan className="text-dark">
						<ReactJson collapsed={true} src={data?.dataformat} enableClipboard={false} />
					</StyledSpan>
				</div> */}
			</Drawer>
		)
	}
}

export default DeviceView
