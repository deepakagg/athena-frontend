import { Button, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import Flex from 'views/dashboard-views/components/Flex';
import PageHeaderAlt from '../../components/PageHeaderAlt';
import styled from 'styled-components';
import DeviceConfiguration from './device-configuration';
import DeviceDataFormat from './device-data-format';
import DeviceType from './device-type';

const StyledHeader = styled.div`
    margin-top: 50px;
`
const StyledButton = styled(Button)`
    margin-left: 10px;
`

const { TabPane } = Tabs;

export const DeviceTemplate = () => {
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false)

    const onFinish = () => {
        setSubmitLoading(true)
        form.validateFields().then(values => {
            setTimeout(() => {
                setSubmitLoading(false)
                message.success(`Created ${values.name} to product list`);
            }, 1500);
        }).catch(info => {
            setSubmitLoading(false)
            console.log('info', info)
            message.error('Please enter all required field ');
        });
    };

    return (
        <StyledHeader>
            <Form
                layout="vertical"
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                initialValues={{
                    heightUnit: 'cm',
                    widthUnit: 'cm',
                    weightUnit: 'kg'
                }}
            >
                <PageHeaderAlt className="border-bottom" overlap>
                    <div className="container">
                        <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                            <h2 className="mb-3">{'Add New Device'} </h2>
                            <div className="mb-3">
                                <StyledButton className="mr-2">Discard</StyledButton>
                                <StyledButton type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
                                    {'ADD'}
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
            </Form>
        </StyledHeader>
    );
}

export default DeviceTemplate