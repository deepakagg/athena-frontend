import React, { useEffect } from 'react'
import { Input, Row, Col, Card, Form, Button, Switch, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppDispatch } from 'app/hooks';
import { setDeviceConfiguration } from 'views/dashboard-views/dashboardSlice';
import { Configuration, DeviceTypeTemplate } from 'views/dashboard-views/interface/Device';

const StyledWidth = styled.div`
    width: fit-content;
`;

const { Option } = Select;
const configurationtypes = ['number', 'string', 'boolean']

const DeviceConfiguration = (props: { deviceTypeDetail: DeviceTypeTemplate | undefined }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log('inside useEffect of device configuration');
        if (props.deviceTypeDetail) {
            dispatch(setDeviceConfiguration(props.deviceTypeDetail.configuration));
            form.setFieldsValue({ deviceconfiguration: props.deviceTypeDetail.configuration });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.deviceTypeDetail]);

    const onChange = (_: undefined, values: Configuration[]) => {
        dispatch(setDeviceConfiguration(values));
    }

    return (
        <Card>
            <StyledWidth><h2>Device configuration</h2></StyledWidth>
            <StyledWidth><p>Add device configuration</p></StyledWidth>
            <Form name="deviceconfigurationcontainer" layout="vertical" form={form} onValuesChange={(props, values) => { onChange(props, values.deviceconfiguration); }}>
                <Form.List name="deviceconfiguration">
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
                                                rules={[{ required: true, message: 'Please select type' }]}
                                                className="w-100"
                                            >
                                                <Select className="w-100" placeholder="Type">
                                                    {
                                                        configurationtypes.map(elm => (
                                                            <Option key={elm} value={elm}>{elm}</Option>
                                                        ))
                                                    }
                                                </Select>
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
                                                    valuePropName="checked"
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
                                        <PlusOutlined /> Add configuration
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

export default DeviceConfiguration
