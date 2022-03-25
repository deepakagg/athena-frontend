import { Button, notification, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import Flex from 'views/dashboard-views/components/Flex';
import PageHeaderAlt from '../../components/PageHeaderAlt';
import styled from 'styled-components';
import DeviceConfiguration from './device-configuration';
import DeviceDataFormat from './device-data-format';
import DeviceType from './device-type';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    selectDeviceTypeDetails,
    selectDeviceName,
    selectDeviceProtocol,
    selectDeviceConfiguration,
    selectDeviceDataFormat,
    setDeviceTypeDetails,
    setDeviceName,
    setDeviceProtocol,
    setDeviceConfiguration,
    setDeviceDataFormat,
    selectDeviceDescription,
    selectEditFlag,
    selectDeviceType,
} from '../../dashboardSlice';
import { DeviceTypeTemplate } from 'views/dashboard-views/interface/Device';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";

const StyledHeader = styled.div`
    margin-top: 50px;
`
const StyledButton = styled(Button)`
    margin-left: 10px;
`

const { TabPane } = Tabs;

export const DeviceTypeTemplateView = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deviceTypeDetail, setDeviceTypeDetail] = useState<DeviceTypeTemplate | undefined>(undefined);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const deviceName = useAppSelector(selectDeviceName);
    const deviceDescription = useAppSelector(selectDeviceDescription);
    const deviceProtocol = useAppSelector(selectDeviceProtocol);
    const deviceConfiguration = useAppSelector(selectDeviceConfiguration);
    const deviceDataFormat = useAppSelector(selectDeviceDataFormat);
    const editFlag = useAppSelector(selectEditFlag);
    const selectedDeviceType = useAppSelector(selectDeviceType);
    const dispatch = useAppDispatch();

    const [api, contextHolder] = notification.useNotification();
    const history = useHistory();

    useEffect(() => {
        // console.log('inside useEffect of device type template');
        if (editFlag) {
            for (let i = 0; i < deviceTypeDetails.length; i++) {
                if (deviceTypeDetails[i].name === selectedDeviceType) {
                    let deviceTypeDetail;
                    deviceTypeDetail = deviceTypeDetails[i];
                    setDeviceTypeDetail(deviceTypeDetail);
                    // console.log(deviceTypeDetail);
                    break;
                }
            }
        }
        else {
            dispatch(setDeviceName(undefined));
            dispatch(setDeviceProtocol(undefined));
            dispatch(setDeviceConfiguration([]));
            dispatch(setDeviceDataFormat([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editFlag]);

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

    const onFinish = () => {
        setSubmitLoading(true);
        try {
            if (deviceName && deviceProtocol) {
                const deviceTypeId = editFlag ? deviceTypeDetail?.deviceTypeId as string : uuidv4();
                const data: DeviceTypeTemplate = {
                    deviceTypeId,
                    name: deviceName as string,
                    description: deviceDescription as string,
                    protocol: deviceProtocol as string,
                    configuration: deviceConfiguration.filter((item) => { return item !== undefined; }),
                    dataformat: deviceDataFormat.filter((item) => { return item !== undefined; })
                }
                // console.log(data);
                let tempDeviceTypeDetails: DeviceTypeTemplate[] = [];
                Object.assign(tempDeviceTypeDetails, deviceTypeDetails);
                if (!editFlag) {
                    tempDeviceTypeDetails.push(data);
                    // console.log(tempDeviceTypeDetails);
                } else {
                    for(let index in tempDeviceTypeDetails){
                        if(tempDeviceTypeDetails[index].deviceTypeId === deviceTypeDetail?.deviceTypeId){
                            tempDeviceTypeDetails[index] = data;
                            break;
                        }
                    }
                    // console.log(tempDeviceTypeDetails);
                }
                dispatch(setDeviceTypeDetails(tempDeviceTypeDetails));

                history.push("/app/user-dashboard/device-type-list");
            } else {
                openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} device type, please re check your data`);
            }
        } catch (e) {
            console.log(e);
            openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} device type. An unexpected error occurred`);
        }
        setSubmitLoading(false);
    };

    return (
        <StyledHeader>
            {contextHolder}
            <PageHeaderAlt className="border-bottom" overlap>
                <div className="container">
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">{!editFlag ? 'Add New Device Type' : 'Edit Device Type'} </h2>
                        <div className="mb-3">
                            {editFlag ? <StyledButton className="mr-2" onClick={() => history.push("/app/user-dashboard/device-type-list")}>Discard</StyledButton> : null}
                            <StyledButton type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                {editFlag ? 'SAVE' : 'ADD'}
                            </StyledButton>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <div className="container">
                <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
                    <TabPane tab="Device type" key="1">
                        <DeviceType deviceTypeDetail={deviceTypeDetail} />
                    </TabPane>
                    <TabPane tab="Device configuration" key="2">
                        <DeviceConfiguration deviceTypeDetail={deviceTypeDetail} />
                    </TabPane>
                    <TabPane tab="Device data format" key="3">
                        <DeviceDataFormat deviceTypeDetail={deviceTypeDetail} />
                    </TabPane>
                </Tabs>
            </div>
        </StyledHeader>
    );
}

export default DeviceTypeTemplateView