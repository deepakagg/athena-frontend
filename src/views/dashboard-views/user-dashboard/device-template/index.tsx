import { Button, Card, Col, Form, Input, InputNumber, notification, Row, Select, Switch } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Flex from "views/dashboard-views/components/Flex";
import PageHeaderAlt from "views/dashboard-views/components/PageHeaderAlt";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectDeviceTypeDetails, setDeviceDetails } from "views/dashboard-views/dashboardSlice";
import { Configuration, DataFormat, DeviceTemplate, DeviceTypeTemplate } from "views/dashboard-views/interface/Device";

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
            required: true,
            message: 'Please enter device description',
        }
    ]
}

export const DeviceTemplateView = () => {
    const [api, contextHolder] = notification.useNotification();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deviceTypeConfiguration, setDeviceTypeConfiguration] = useState<Configuration[]>([]);
    const [deviceTypeDataFormat, setDeviceTypeDataFormat] = useState<DataFormat[]>([]);
    const deviceTypeDetails = useAppSelector(selectDeviceTypeDetails);
    const history = useHistory();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

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
            // if (deviceName && deviceProtocol) {
            //     const deviceTypeId = uuidv4();
            //     const data: DeviceTemplate = {
            //         deviceTypeId,
            //         name: deviceName as string,
            //         description: deviceDescription as string,
            //         protocol: deviceProtocol as string,
            //         configuration: deviceConfiguration.filter((item) => { return item !== undefined; }),
            //         dataformat: deviceDataFormat.filter((item) => { return item !== undefined; })
            //     }
            //     let tempDeviceTypeDetails: DeviceTypeTemplate[] = [];
            //     Object.assign(tempDeviceTypeDetails, deviceDetails);
            //     tempDeviceTypeDetails.push(data);
            //     dispatch(setDeviceTypeDetails(tempDeviceTypeDetails));
            //     openNotification(true, 'Successful', `Device ${deviceName} added successfully`);
            //     history.push("/app/user-dashboard/device-type-list");
            // } else {
            //     openNotification(false, 'Failed', 'Failed to add device, please re check your data');
            // }
            const values = await form.validateFields();
            console.log(values);
            history.push("/app/user-dashboard/device-list");
        } catch (e) {
            console.log(e);
            openNotification(false, 'Failed', 'Failed to add device. An unexpected error occurred');
        }
        setSubmitLoading(false);
    };

    const dynamicInputField = (typevalue: string) => {
        console.log(typevalue);
        if (typevalue === 'number') return <InputNumber className="w-100" />;
        else if (typevalue === 'string') return <Input />;
        else if (typevalue === 'boolean') return <StyledWidth><Switch /></StyledWidth>;
        else return <Input />;
    }

    const onDeviceDetailsChange = (_: undefined, data: DeviceTemplate[]) => {
        console.log(data);
    }

    return (
        <StyledHeader>
            {contextHolder}
            <PageHeaderAlt className="border-bottom" overlap>
                <div className="container">
                    <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                        <h2 className="mb-3">{'Add New Device'} </h2>
                        <div className="mb-3">
                            <StyledButton type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                ADD
                            </StyledButton>
                        </div>
                    </Flex>
                </div>
            </PageHeaderAlt>
            <StyledBody>
                <Form form={form} onValuesChange={(props, values) => { onDeviceDetailsChange(props, values) }}>
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
                                            name={'devicetype'}
                                            fieldKey={'devicetype'}
                                            rules={[{ required: true, message: 'Please select a device type' }]}
                                            className="w-100"
                                        >
                                            <Select className="w-100" placeholder="Device type" onChange={(value: string) => {
                                                const selectedDeviceType: DeviceTypeTemplate = deviceTypeDetails.filter((item) => { return item.name === value; })[0];
                                                setDeviceTypeConfiguration(selectedDeviceType.configuration);
                                                setDeviceTypeDataFormat(selectedDeviceType.dataformat);
                                            }}>
                                                {
                                                    deviceTypeDetails.map(elm => (
                                                        <Option key={elm.name} value={elm.name}>{elm.name}</Option>
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
                                            <React.Fragment>
                                                <Col key={elm.label} xs={24} sm={24} md={24}>
                                                    <Form.Item name={elm.label} fieldKey={elm.label} label={`${elm.label} (${elm.type})`} rules={[
                                                        {
                                                            required: elm.required,
                                                            message: 'Please enter a value',
                                                        }
                                                    ]}>
                                                        {dynamicInputField(elm.type as string)}
                                                    </Form.Item>
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
                        {deviceTypeDataFormat.length > 0 ? <Col xs={24} sm={24} md={24}>
                            <Card title="Data format">
                                <Row gutter={16}>
                                    {
                                        deviceTypeDataFormat.map(elm => (
                                            <React.Fragment>
                                                <Col key={elm.label} xs={24} sm={24} md={24}>
                                                    <Form.Item name={elm.label} fieldKey={elm.label} label={`${elm.label} (${elm.type})`} rules={[
                                                        {
                                                            required: elm.required,
                                                            message: 'Please enter a value',
                                                        }
                                                    ]}>
                                                        {dynamicInputField(elm.type as string)}
                                                    </Form.Item>
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
                    </Row>
                </Form>
            </StyledBody>
        </StyledHeader>
    );
}

export default DeviceTemplateView;