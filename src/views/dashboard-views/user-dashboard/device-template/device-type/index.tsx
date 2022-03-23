import React from 'react'
import { Input, Row, Col, Card, Form, Select } from 'antd';
import styled from 'styled-components';

const StyledWidth = styled.div`
    width: fit-content;
`

const { Option } = Select;
const channels = ['MQTT', 'HTTP', 'LoRaWAN']

const DeviceType = () => {
    return (
        <Card>
            <StyledWidth><h2>Device type</h2></StyledWidth>
            <StyledWidth><p>Add device type details</p></StyledWidth>
            <Form name="devicetype">
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
                            label="Channel"
                            name={'channel'}
                            fieldKey={'channel'}
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
}

export default DeviceType