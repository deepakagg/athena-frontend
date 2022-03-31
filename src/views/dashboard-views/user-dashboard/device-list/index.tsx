import React, { useEffect, useState } from 'react'
import { Button, Card, notification, Popconfirm, Spin, Table, Tooltip } from 'antd';
import {
    selectDeviceDetails, setDeviceDetails, setEditFlag, setSelectedDevice,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { DeviceTemplate } from 'views/dashboard-views/interface/Device';
import DeviceView from './device-view';
import deviceService from 'services/deviceService';

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
    const [deviceProfileVisible, setDeviceProfileVisible] = useState(false);
    const [selectDevice, setSelectDevice] = useState(null);
    const deviceDetails = useAppSelector(selectDeviceDetails);
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [api, contextHolder] = notification.useNotification();

    // console.log(deviceDetails);

    useEffect(() => {
        setDatatableLoaderState(true);
        reloadDeviceList();
    }, [dispatch]);

    const showDeviceProfile = (deviceInfo: any) => {
        setDeviceProfileVisible(true);
        setSelectDevice(deviceInfo);
    };

    const closeDeviceProfile = () => {
        setDeviceProfileVisible(false);
        setSelectDevice(null);
    }

    // const removeById = (arr: any[], id: string) => {
    //     const requiredIndex = arr.findIndex(el => {
    //         return el.id === id;
    //     });
    //     if (requiredIndex === -1) {
    //         return false;
    //     };
    //     return !!arr.splice(requiredIndex, 1);
    // };

    const reloadDeviceList = () => {
        deviceService.getDeviceList()
            .then((deviceList) => {
                dispatch(setDeviceDetails(deviceList)); setDatatableLoaderState(false);
            })
            .catch((e: any) => { console.log(e); setDatatableLoaderState(false); })
    }

    const openNotification = (isSuccess: boolean, message: string, description: string) => {
        const placement = 'topRight';
        if (isSuccess) {
            api.success({
                message: message,
                description: description,
                placement,
            });
        }
        else {
            api.error({
                message: message,
                description: description,
                placement,
            });
        }
    };

    const onDelete = async (id: string, dataid: string) => {
        // let tempDeviceDetails: DeviceTemplate[] = [];
        // Object.assign(tempDeviceDetails, deviceDetails);
        // removeById(tempDeviceDetails, id);
        // dispatch(setDeviceDetails(tempDeviceDetails));
        try {
            const response = await deviceService.deleteDevice(id, dataid);
            if (!response) {
                openNotification(false, 'Failed', 'Failed to delete device. An unexpected error occurred');
            } else {
                reloadDeviceList();
            }
        } catch (e) {
            console.log(e);
            openNotification(false, 'Failed', 'Failed to delete device. An unexpected error occurred');
        }
    }

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
            dataIndex: 'device_type',
        },
        {
            title: 'Device description',
            dataIndex: 'description',
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_: any, elm: { name: string, id: string, dataid: string }) => (
                <div className="text-right d-flex justify-content-end">
                    <SpacedActionItem>
                        <Tooltip title="View">
                            <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showDeviceProfile(elm) }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    <SpacedActionItem>
                        <Tooltip title="Edit">
                            <Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setSelectedDevice(elm.name)); dispatch(setEditFlag(true)); history.push("/app/user-dashboard/device-template"); }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    <SpacedActionItem>
                        <Tooltip title="Delete">
                            <Popconfirm placement="left" title={`Confirm delete device?`} onConfirm={() => { onDelete(elm.id, elm.dataid); }} okText="Yes" cancelText="No">
                                <Button danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        </Tooltip>
                    </SpacedActionItem>
                </div>
            )
        },
    ];
    return (
        <Card bodyStyle={{ 'padding': '0px' }}>
            {contextHolder}
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
            <DeviceView data={selectDevice} visible={deviceProfileVisible} close={() => { closeDeviceProfile() }} />
        </Card>
    );
};

export default DeviceList;
