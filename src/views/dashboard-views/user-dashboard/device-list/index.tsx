import React, { useState } from 'react'
import { Button, Card, Popconfirm, Spin, Table, Tooltip } from 'antd';
import {
    selectDeviceDetails, setEditFlag, setSelectedDevice,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const StyledDeviceCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

export const DeviceList = () => {
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);
    const deviceDetails = useAppSelector(selectDeviceDetails);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const tableColumns: any = [
        {
            title: 'Device id',
            dataIndex: 'id',
        },
        {
            title: 'Device name',
            dataIndex: 'name',
        },
        {
            title: 'Device type',
            dataIndex: 'devicetype',
        },
        {
            title: 'Device description',
            dataIndex: 'description',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_: any, elm: { name: string }) => (
                <div className="text-right d-flex justify-content-end">
                    {/* <SpacedActionItem>
                        <Tooltip title="View">
                            <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { }} size="small" />
                        </Tooltip>
                    </SpacedActionItem> */}
                    <SpacedActionItem>
                        <Tooltip title="Edit">
                            <Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setSelectedDevice(elm.name)); dispatch(setEditFlag(true)); history.push("/app/user-dashboard/device-template"); }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    {/* <SpacedActionItem>
                        <Tooltip title="Delete">
                            <Popconfirm placement="left" title={`Confirm delete device?`} onConfirm={() => { }} okText="Yes" cancelText="No">
                                <Button danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        </Tooltip>
                    </SpacedActionItem> */}
                </div>
            )
        },
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <StyledDeviceCreateButton>
                    <Button onClick={(e) => { dispatch(setEditFlag(false)); history.push("/app/user-dashboard/device-template"); }} type="primary" icon={<PlusCircleOutlined />} block>Create device</Button>
                </StyledDeviceCreateButton>
            </Flex>
            <div className="table-responsive">
                {datatableLoaderState ? <Spin tip="Loading...">
                    <Table columns={tableColumns} dataSource={deviceDetails} rowKey='id' />
                </Spin> : <Table columns={tableColumns} dataSource={deviceDetails} rowKey='id' />}
            </div>
        </Card>
    );
};

export default DeviceList;
