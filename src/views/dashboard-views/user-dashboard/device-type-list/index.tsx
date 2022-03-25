import React, { useState } from 'react'
import { Button, Card, Popconfirm, Spin, Table, Tooltip } from 'antd';
import {
    setSelectedDeviceType,
    selectDeviceTypeDetails,
    setEditFlag,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const StyledDeviceTypeCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const SpacedActionItem = styled.div`
    margin-left: 20px;
`

export const DeviceTypeList = () => {
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const tableColumns: any = [
        {
            title: 'Device name',
            dataIndex: 'name',
        },
        {
            title: 'Device description',
            dataIndex: 'description',
        },
        {
            title: 'Device protocol',
            dataIndex: 'protocol',
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
                            <Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setSelectedDeviceType(elm.name)); dispatch(setEditFlag(true)); history.push("/app/user-dashboard/device-type-template"); }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    {/* <SpacedActionItem>
                        <Tooltip title="Delete">
                            <Popconfirm placement="left" title={`Confirm delete device type?`} onConfirm={() => { }} okText="Yes" cancelText="No">
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
                <StyledDeviceTypeCreateButton>
                    <Button onClick={(e) => { dispatch(setEditFlag(false)); history.push("/app/user-dashboard/device-type-template"); }} type="primary" icon={<PlusCircleOutlined />} block>Create device type</Button>
                </StyledDeviceTypeCreateButton>
            </Flex>
            <div className="table-responsive">
                {datatableLoaderState ? <Spin tip="Loading...">
                    <Table columns={tableColumns} dataSource={deviceTypeDetails} rowKey='id' />
                </Spin> : <Table columns={tableColumns} dataSource={deviceTypeDetails} rowKey='id' />}
            </div>
        </Card>
    );
};

export default DeviceTypeList;
