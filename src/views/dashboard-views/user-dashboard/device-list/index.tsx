import React, { useState } from 'react'
import { Button, Card, Spin, Table } from 'antd';
import {
    selectDeviceDetails,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const StyledDeviceCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const DeviceList = () => {
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);
    const deviceDetails = useAppSelector(selectDeviceDetails);
    const history = useHistory();

    const tableColumns: any = [
        {
            title: 'Device id',
            dataIndex: 'deviceId',
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
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <StyledDeviceCreateButton>
                    <Button onClick={(e) => history.push("/app/user-dashboard/device-template")} type="primary" icon={<PlusCircleOutlined />} block>Create device</Button>
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
