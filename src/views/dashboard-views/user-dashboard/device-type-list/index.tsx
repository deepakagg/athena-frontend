import React, { useState } from 'react'
import { Button, Card, Spin, Table } from 'antd';
import {
    selectDeviceTypeDetails,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

const StyledDeviceTypeCreateButton = styled.div`
    margin-left: auto; 
    margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const DeviceTypeList = () => {
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const history = useHistory();

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
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<StyledDeviceTypeCreateButton>
						<Button onClick={(e) => history.push("/app/user-dashboard/device-type-template")} type="primary" icon={<PlusCircleOutlined />} block>Create device type</Button>
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
