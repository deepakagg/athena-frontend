import React from 'react'
import { Input, Row, Col, Card, Form, Button, Switch } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppDispatch } from 'app/hooks';
import { setDeviceDataFormat } from 'views/dashboard-views/dashboardSlice';
import { DataFormat } from 'views/dashboard-views/interface/Device';

const StyledWidth = styled.div`
    width: fit-content;
`

const DeviceDataFormat = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const onChange = (_: undefined, values: DataFormat[]) => {
        dispatch(setDeviceDataFormat(values));
    }

    return (
        <Card>
            <StyledWidth><h2>Device data format</h2></StyledWidth>
            <StyledWidth><p>Add device data format</p></StyledWidth>
            <Form name="devicedataformat" layout="vertical" form={form} onValuesChange={(props, values) => { onChange(props, values.devicedataformat); }}>
                <Form.List name="devicedataformat">
                    {(fields, { add, remove }) => {
                        return (
                            <div className="mt-3">
                                {fields.map((field, index) => (
                                    <Row key={field.key} gutter={16}>
                                        <Col sm={24} md={7}>
                                            <Form.Item
                                                {...field}
                                                label="Label"
                                                name={[field.name, 'label']}
                                                fieldKey={[field.key, 'label']}
                                                rules={[{ required: true, message: 'Please enter a label' }]}
                                                className="w-100"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={24} md={7}>
                                            <Form.Item
                                                {...field}
                                                label="Type"
                                                name={[field.name, 'type']}
                                                fieldKey={[field.key, 'type']}
                                                rules={[{ required: true, message: 'Please enter type' }]}
                                                className="w-100"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={24} md={7}>
                                            <StyledWidth>
                                                <Form.Item
                                                    {...field}
                                                    label="Required"
                                                    name={[field.name, 'required']}
                                                    fieldKey={[field.key, 'required']}
                                                    className="w-100"
                                                >
                                                    <Switch />
                                                </Form.Item>
                                            </StyledWidth>
                                        </Col>
                                        <Col sm={24} md={2}>
                                            <MinusCircleOutlined className="mt-md-4 pt-md-3" onClick={() => { remove(field.name) }} />
                                        </Col>
                                        <Col span={24}>
                                            <hr className="mt-2" />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => { add() }} className="w-100">
                                        <PlusOutlined /> Add data format
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            </Form>
        </Card>
    );
}

export default DeviceDataFormat
