import { Button, Card, Col, Form, Input, InputNumber, notification, Row, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "views/dashboard-views/components/Flex";
import PageHeaderAlt from "views/dashboard-views/components/PageHeaderAlt";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectDeviceTypeDetails, selectDeviceDetails, selectEditFlag, selectDevice, setDeviceTypeDetails } from "views/dashboard-views/dashboardSlice";
// import { setDeviceDetails } from "views/dashboard-views/dashboardSlice";
import { Configuration, ConfigurationDevice, DataFormat, DataFormatDevice, DeviceTemplate, DeviceTypeTemplate } from "views/dashboard-views/interface/Device";
import deviceService from "services/deviceService";
import deviceTypeService from "services/deviceTypeService";

const StyledHeader = styled.div`
    margin-top: 50px;
`
const StyledButton = styled(Button)`
    margin-left: 10px;
`

const StyledBody = styled.div`
    margin-top: 100px;
`

const StyledWidth = styled.div`
    width: fit-content;
`

const StyledThematicBreak = styled.hr`
    margin-bottom: 30px;
`

const { Option } = Select;

const rules = {
    name: [
        {
            required: true,
            message: 'Please enter device name',
        }
    ],
    description: [
        {
            required: false,
            message: 'Please enter device description',
        }
    ]
}

interface IFormValue {
    [key: string]: number | string | boolean;
}

export const DeviceTemplateView = () => {
    const [api, contextHolder] = notification.useNotification();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deviceTypeConfiguration, setDeviceTypeConfiguration] = useState<Configuration[]>([]);
    const [deviceTypeDataFormat, setDeviceTypeDataFormat] = useState<DataFormat[]>([]);
    const [deviceDetail, setDeviceDetail] = useState<DeviceTemplate | undefined>(undefined);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const deviceDetails = useAppSelector(selectDeviceDetails);
    const editFlag = useAppSelector(selectEditFlag);
    const selectedDevice = useAppSelector(selectDevice);
    const history = useHistory();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editFlag) {
            for (let i = 0; i < deviceDetails.length; i++) {
                if (deviceDetails[i].name === selectedDevice) {
                    setDeviceDetail(deviceDetails[i]);
                    const config: Configuration[] = deviceDetails[i].configuration.map((item: ConfigurationDevice) => {
                        return {
                            label: item.label as string,
                            type: item.type as string,
                            required: item.required as boolean,
                        };
                    })
                    setDeviceTypeConfiguration(config);
                    // const dataformat: DataFormat[] = deviceDetails[i].dataformat.map((item: DataFormatDevice) => {
                    //     return {
                    //         label: item.label as string,
                    //         type: item.type as string,
                    //         required: item.required as boolean,
                    //     };
                    // })
                    // setDeviceTypeDataFormat(dataformat);
                    const formData = reverseTransformSavedData(deviceDetails[i]);
                    form.setFieldsValue(formData);
                    break;
                }
            }
        }
        if (deviceTypeDetails.length === 0) {
            deviceTypeService.getDeviceTypeList().then((deviceTypeList) => {
                dispatch(setDeviceTypeDetails(deviceTypeList));
            }).catch((e: any) => { console.log(e); });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editFlag]);

    const reverseTransformSavedData = (data: DeviceTemplate): IFormValue => {
        // console.log(data);
        let configuration: any = {};
        for (let index in data.configuration) {
            configuration[`${data.configuration[index].label}_configuration_${data.configuration[index].type}_${data.configuration[index].required}`] = data.configuration[index].value;
        }
        // let dataformat: any = {};
        // for (let index in data.dataformat) {
        //     dataformat[`${data.dataformat[index].label}_dataformat_${data.dataformat[index].type}_${data.dataformat[index].required}`] = data.dataformat[index].value;
        // }
        const formData: IFormValue = {
            deviceId: data.device_uuid,
            name: data.name,
            device_type: `${data.device_type}`,
            device_type_id: data.device_type_id,
            description: data.description,
            // dataid: data.dataid,
            ...configuration,
            // ...dataformat,
        };
        // console.log(formData);
        return formData;
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

    const onFinish = async () => {
        setSubmitLoading(true);
        try {
            const values = await form.validateFields();
            const data = transformFinalData(values);
            // console.log(data);
            let tempDeviceDetails: DeviceTemplate[] = [];
            Object.assign(tempDeviceDetails, deviceDetails);
            if (!editFlag) {
                // tempDeviceDetails.push(data);
                // console.log(tempDeviceTypeDetails);
                const response = await deviceService.createDevice(data);
                if (!response) {
                    openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} device. An unexpected error occurred`);
                } else {
                    history.push("/app/user-dashboard/device-list");
                }
            } else {
                // console.log(deviceDetails);
                // for (let index in tempDeviceDetails) {
                //     if (tempDeviceDetails[index].id === deviceDetail?.id) {
                //         tempDeviceDetails[index] = data;
                //         break;
                //     }
                // }
                // // console.log(tempDeviceTypeDetails);
                // dispatch(setDeviceDetails(tempDeviceDetails));
                // // openNotification(true, 'Successful', `Device ${data.name} added successfully`);
                // setTimeout(() => {
                //     history.push("/app/user-dashboard/device-list");
                // }, 100);
                // console.log(data);
                const response = await deviceService.updateDevice(data);
                if (!response) {
                    openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} device. An unexpected error occurred`);
                } else {
                    history.push("/app/user-dashboard/device-list");
                }
            }
        } catch (e) {
            openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} device. An unexpected error occurred`);
        }
        setSubmitLoading(false);
    };

    const dynamicInputField = (elm: Configuration | DataFormat, type: string) => {
        if (elm.type === 'number') {
            return (
                <Form.Item name={`${elm.label}_${type}_${elm.type}_${elm.required}`} fieldKey={elm.label} label={`${elm.label} (${elm.type})`} rules={[
                    {
                        required: elm.required,
                        message: 'Please enter a number',
                    }
                ]}>
                    <InputNumber className="w-100" />
                </Form.Item>
            );
        }
        else if (elm.type === 'string') {
            return (
                <Form.Item name={`${elm.label}_${type}_${elm.type}_${elm.required}`} fieldKey={elm.label} label={`${elm.label} (${elm.type})`} rules={[
                    {
                        required: elm.required,
                        message: 'Please enter a value',
                    }
                ]}>
                    <Input />
                </Form.Item>
            );
        }
        else if (elm.type === 'boolean') {
            return (
                <Form.Item name={`${elm.label}_${type}_${elm.type}_${elm.required}`} fieldKey={elm.label} label={`${elm.label} (${elm.type})`} rules={[
                    {
                        required: elm.required,
                        message: 'Please select a state',
                    }
                ]} valuePropName="checked" initialValue={true}>
                    <Switch />
                </Form.Item>
            );
        }
        else return null;
    }

    const transformFinalData = (data: IFormValue): DeviceTemplate => {
        // console.log(data);
        const configuration: ConfigurationDevice[] = [];
        const dataformat: DataFormatDevice[] = [];
        if (data) {
            for (let item in data) {
                const tempArray = item.split('_');
                if (data[item] !== undefined && tempArray[1] === 'configuration') configuration.push({ label: tempArray[0], value: data[item], type: tempArray[2], required: tempArray[3] === 'true' });
                // if (data[item] !== undefined && tempArray[1] === 'dataformat') dataformat.push({ label: tempArray[0], value: data[item], type: tempArray[2], required: tempArray[3] === 'true' });
            }
        }
        return { id: `${deviceDetail?.id}`, device_type_id: deviceDetail?.device_type_id, device_uuid: data['deviceId'] as string, name: data['name'] as string, device_type: data['device_type'] as string, description: data['description'] as string, configuration, dataformat };
    }

    return (
        <StyledHeader>
            {contextHolder}
            <PageHeaderAlt className="border-bottom" overlap>
                <div className="container">
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">{!editFlag ? 'Add New Device' : 'Edit Device'} </h2>
                        <div className="mb-3">
                            {editFlag ? <StyledButton className="mr-2" onClick={() => history.push("/app/user-dashboard/device-list")}>Discard</StyledButton> : null}
                            <StyledButton type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                {editFlag ? 'SAVE' : 'ADD'}
                            </StyledButton>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <StyledBody>
                <Form form={form}>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24}>
                            <Card title="Basic Info">
                                <Row gutter={16}>
                                    <Col xs={24} sm={24} md={8}>
                                        <Form.Item name="deviceId" label="Device Id" rules={rules.name}>
                                            <Input placeholder="Device Id" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8}>
                                        <Form.Item name="name" label="Device name" rules={rules.name}>
                                            <Input placeholder="Device Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8}>
                                        <Form.Item
                                            label="Device type"
                                            name={'device_type'}
                                            fieldKey={'device_type'}
                                            rules={[{ required: true, message: 'Please select a device type' }]}
                                            className="w-100"
                                        >
                                            <Select className="w-100" placeholder="Device type" onChange={(value: string) => {
                                                const selectedDeviceType: DeviceTypeTemplate = deviceTypeDetails.filter((item) => { return item.id === value; })[0];
                                                setDeviceTypeConfiguration(selectedDeviceType.configuration);
                                                setDeviceTypeDataFormat(selectedDeviceType.dataformat);
                                            }}>
                                                {
                                                    deviceTypeDetails.map(elm => (
                                                        <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name="description" label="Description" rules={rules.description}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Card></Col>
                        {deviceTypeConfiguration.length > 0 ? <Col xs={24} sm={24} md={24}>
                            <Card title="Configuration">
                                <Row gutter={16}>
                                    {
                                        deviceTypeConfiguration.map(elm => (
                                            <React.Fragment key={`${elm.label}`}>
                                                <Col xs={24} sm={24} md={24}>
                                                    <StyledWidth>
                                                        {dynamicInputField(elm, 'configuration')}
                                                    </StyledWidth>
                                                </Col>
                                                <Col span={24}>
                                                    <StyledThematicBreak />
                                                </Col>
                                            </React.Fragment>
                                        ))
                                    }
                                </Row>
                            </Card>
                        </Col> : null}
                        {/* {deviceTypeDataFormat.length > 0 ? <Col xs={24} sm={24} md={24}>
                            <Card title="Data format">
                                <Row gutter={16}>
                                    {
                                        deviceTypeDataFormat.map(elm => (
                                            <React.Fragment key={`${elm.label}`}>
                                                <Col xs={24} sm={24} md={24}>
                                                    <StyledWidth>
                                                        {dynamicInputField(elm, 'dataformat')}
                                                    </StyledWidth>
                                                </Col>
                                                <Col span={24}>
                                                    <StyledThematicBreak />
                                                </Col>
                                            </React.Fragment>
                                        ))
                                    }
                                </Row>
                            </Card>
                        </Col> : null} */}
                    </Row>
                </Form>
            </StyledBody>
        </StyledHeader>
    );
}

export default DeviceTemplateView;