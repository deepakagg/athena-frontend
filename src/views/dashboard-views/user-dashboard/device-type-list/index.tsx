import React, { useEffect, useState } from 'react'
import { Button, Card, Popconfirm, Spin, Table, Tooltip } from 'antd';
import {
    setSelectedDeviceType,
    selectDeviceTypeDetails,
    setEditFlag,
    setDeviceTypeDetails,
} from '../../dashboardSlice';
// import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { Configuration, DataFormat } from 'views/dashboard-views/interface/Device';
import Flex from 'views/dashboard-views/components/Flex';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { DeviceTypeTemplate } from 'views/dashboard-views/interface/Device';
import DeviceTypeView from './device-type-view';
import deviceTypeService from 'services/deviceTypeService';

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
    const [deviceTypeProfileVisible, setDeviceTypeProfileVisible] = useState(false);
    const [selectDeviceType, setSelectDeviceType] = useState(null);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const history = useHistory();
    const dispatch = useAppDispatch();

    useEffect(() => {
		setDatatableLoaderState(true);
		deviceTypeService.getDeviceTypeList()
			.then((deviceTypeList) => { 
                dispatch(setDeviceTypeDetails(deviceTypeList));
                setDatatableLoaderState(false); 
            })
			.catch((e: any) => { console.log(e); setDatatableLoaderState(false); })
	}, [dispatch]);

    const showDeviceTypeProfile = (deviceTypeInfo: any) => {
		setDeviceTypeProfileVisible(true);
		setSelectDeviceType(deviceTypeInfo);
	};

    const closeDeviceTypeProfile = () => {
		setDeviceTypeProfileVisible(false);
		setSelectDeviceType(null);
	}

    const removeById = (arr: any[], id: string) => {
        const requiredIndex = arr.findIndex(el => {
            return el.id === id;
        });
        if (requiredIndex === -1) {
            return false;
        };
        return !!arr.splice(requiredIndex, 1);
    };

    const onDelete = (id: string) => {
        let tempDeviceTypeDetails: DeviceTypeTemplate[] = [];
        Object.assign(tempDeviceTypeDetails, deviceTypeDetails);
        removeById(tempDeviceTypeDetails, id);
        dispatch(setDeviceTypeDetails(tempDeviceTypeDetails));
    }

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
            render: (_: any, elm: { name: string, id: string }) => (
                <div className="text-right d-flex justify-content-end">
                    <SpacedActionItem>
                        <Tooltip title="View">
                            <Button type="primary" className="mr-2" icon={<EyeOutlined />}  onClick={() => { showDeviceTypeProfile(elm) }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    <SpacedActionItem>
                        <Tooltip title="Edit">
                            <Button className="mr-2" icon={<EditOutlined />} onClick={() => { dispatch(setSelectedDeviceType(elm.name)); dispatch(setEditFlag(true)); history.push("/app/user-dashboard/device-type-template"); }} size="small" />
                        </Tooltip>
                    </SpacedActionItem>
                    <SpacedActionItem>
                        <Tooltip title="Delete">
                            <Popconfirm placement="left" title={`Confirm delete device type?`} onConfirm={() => { onDelete(elm.id); }} okText="Yes" cancelText="No">
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
            <DeviceTypeView data={selectDeviceType} visible={deviceTypeProfileVisible} close={() => { closeDeviceTypeProfile() }} />
        </Card>
    );
};

export default DeviceTypeList;
