import React, { useState } from 'react'
import { Card, Spin, Table } from 'antd';
import {
    selectDeviceDetails,
} from '../../dashboardSlice';
import ReactJson from 'react-json-view';
import { useAppSelector } from 'app/hooks';
import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';

export const DeviceList = () => {
    const [datatableLoaderState, setDatatableLoaderState] = useState(false);
    const deviceDetails = useAppSelector(selectDeviceDetails);

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
            title: 'Device protocol',
            dataIndex: 'protocol',
        },
        {
            title: 'Configuration',
            dataIndex: 'configuration',
            render: (configuration: Configuration[]) => (
                <ReactJson collapsed={true} src={configuration} enableClipboard={false} />
            ),
        },
        {
            title: 'Data format',
            dataIndex: 'dataformat',
            render: (dataformat: DataFormat[]) => (
                <ReactJson collapsed={true} src={dataformat} enableClipboard={false} />
            ),
        },
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            <div className="table-responsive">
                {datatableLoaderState ? <Spin tip="Loading...">
                    <Table columns={tableColumns} dataSource={deviceDetails} rowKey='id' />
                </Spin> : <Table columns={tableColumns} dataSource={deviceDetails} rowKey='id' />}
            </div>
        </Card>
    );
};

export default DeviceList;
