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
    selectDeviceDetails,
    selectDeviceName,
    selectDeviceProtocol,
    selectDeviceConfiguration,
    selectDeviceDataFormat,
    setDeviceDetails,
    setDeviceName,
    setDeviceProtocol,
    setDeviceConfiguration,
    setDeviceDataFormat,
    selectDeviceDescription,
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

export const DeviceTemplate = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const deviceDetails = useAppSelector(selectDeviceDetails);
    const deviceName = useAppSelector(selectDeviceName);
    const deviceDescription = useAppSelector(selectDeviceDescription);
    const deviceProtocol = useAppSelector(selectDeviceProtocol);
    const deviceConfiguration = useAppSelector(selectDeviceConfiguration);
    const deviceDataFormat = useAppSelector(selectDeviceDataFormat);
    const dispatch = useAppDispatch();

    const [api, contextHolder] = notification.useNotification();
    const history = useHistory();

    useEffect(() => {
        dispatch(setDeviceName(undefined));
        dispatch(setDeviceProtocol(undefined));
        dispatch(setDeviceConfiguration([]));
        dispatch(setDeviceDataFormat([]));
    }, [dispatch]);

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
                const deviceTypeId = uuidv4();
                const data: DeviceTypeTemplate = {
                    deviceTypeId,
                    name: deviceName as string,
                    description: deviceDescription as string,
                    protocol: deviceProtocol as string,
                    configuration: deviceConfiguration.filter((item) => { return item !== undefined; }),
                    dataformat: deviceDataFormat.filter((item) => { return item !== undefined; })
                }
                let tempDeviceDetails: DeviceTypeTemplate[] = [];
                Object.assign(tempDeviceDetails, deviceDetails);
                tempDeviceDetails.push(data);
                dispatch(setDeviceDetails(tempDeviceDetails));
                openNotification(true, 'Successful', `Device ${deviceName} added successfully`);
                history.push("/app/user-dashboard/device-list");
            } else {
                openNotification(false, 'Failed', 'Failed to add device, please re check your data');
            }
        } catch (e) {
            console.log(e);
            openNotification(false, 'Failed', 'Failed to add device. An unexpected error occurred');
        }
        setSubmitLoading(false);
    };

    return (
        <StyledHeader>
            {contextHolder}
            <PageHeaderAlt className="border-bottom" overlap>
                <div className="container">
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">{'Add New Device Type'} </h2>
                        <div className="mb-3">
                            <StyledButton type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                ADD
                            </StyledButton>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <div className="container">
                <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
                    <TabPane tab="Device type" key="1">
                        <DeviceType />
                    </TabPane>
                    <TabPane tab="Device configuration" key="2">
                        <DeviceConfiguration />
                    </TabPane>
                    <TabPane tab="Device data format" key="3">
                        <DeviceDataFormat />
                    </TabPane>
                </Tabs>
            </div>
        </StyledHeader>
    );
}

export default DeviceTemplate