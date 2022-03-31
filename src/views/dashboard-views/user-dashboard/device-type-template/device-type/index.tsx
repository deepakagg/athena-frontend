import React, { useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { Input, Row, Col, Card, Form, Select } from 'antd';
import styled from 'styled-components';
import { useAppDispatch } from 'app/hooks';
import { setDeviceName, setDeviceProtocol, setDeviceDescription } from '../../../dashboardSlice';
import { DeviceTypeTemplate } from 'views/dashboard-views/interface/Device';

const StyledWidth = styled.div`
    width: fit-content;
`

const { Option } = Select;
const channels = ['MQTT', 'HTTP']

const DeviceType = forwardRef((props: {}, ref) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useImperativeHandle(
        ref,
        () => ({
            loadData(deviceTypeDetail: DeviceTypeTemplate) {
                if (deviceTypeDetail) {
                    // console.log(props.deviceTypeDetail);
                    dispatch(setDeviceName(deviceTypeDetail.name));
                    dispatch(setDeviceDescription(deviceTypeDetail.description));
                    dispatch(setDeviceProtocol(deviceTypeDetail.protocol));
                    form.setFieldsValue({ name: deviceTypeDetail.name, description: deviceTypeDetail.description, protocol: deviceTypeDetail.protocol });
                }
            }
        }),
    )

    const onChange = (_: undefined, values: { name: string, description: string, protocol: string }) => {
        dispatch(setDeviceName(values.name));
        dispatch(setDeviceDescription(values.description));
        dispatch(setDeviceProtocol(values.protocol));
    }

    return (
        <Card>
            <StyledWidth><h2>Device type</h2></StyledWidth>
            <StyledWidth><p>Add device type details</p></StyledWidth>
            <Form name="device_type" layout="vertical" form={form} onValuesChange={(props, values) => onChange(props, values)}>
                <Row key={'devicetyperow'} gutter={16}>
                    <Col sm={24} md={7}>
                        <Form.Item
                            label="Name"
                            name={'name'}
                            fieldKey={'name'}
                            rules={[{ required: true, message: 'Please enter a name' }]}
                            className="w-100"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={7}>
                        <Form.Item
                            label="Description"
                            name={'description'}
                            fieldKey={'description'}
                            rules={[{ required: true, message: 'Please enter a description' }]}
                            className="w-100"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={7}>
                        <Form.Item
                            label="Channel"
                            name={'protocol'}
                            fieldKey={'protocol'}
                            rules={[{ required: true, message: 'Please select a channel' }]}
                            className="w-100"
                        >
                            <Select className="w-100" placeholder="Channel">
                                {
                                    channels.map(elm => (
                                        <Option key={elm} value={elm}>{elm}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
})

export default DeviceType
