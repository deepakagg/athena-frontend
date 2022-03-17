import { Alert, Button, Form, Input, Select } from "antd";
import { MailOutlined } from "@ant-design/icons";
import authService from '../../../../services/authService';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    updateCreateUserModalViewState,
} from '../../../dashboard-views/dashboardSlice';

const { Option } = Select;

export const SignupForm = (props: Record<string, any>) => {
    const { dispatch } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    const [signupState, setSignupState] = useState(true);
    const [signupLoaderState, setSignupLoaderState] = useState(false);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select defaultValue="91" style={{ width: 70 }}>
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    const onSignUpClick = async (email: string, password: string, first_name: string, last_name: string, phone_number: string) => {
        setSignupState(true);
        setSignupLoaderState(true);
        const response = await authService.createUser(email, password, first_name, last_name, phone_number);
        setSignupState(response);
        setSignupLoaderState(false);
        if (response) {
            dispatch(updateCreateUserModalViewState(false));
            history.push("/app/user-dashboard/manage-users-list");
        }
    }

    const onFinish = (values: any) => {
        onSignUpClick(values.email, values.password, values.firstName, values.lastName, values.phone);
    };

    return (
        <Form form={form} layout="vertical" name="login-form" onFinish={onFinish}>
            {!signupState ? <Form.Item>
                <Alert message="Signup has failed. Please contact admin if the issue persists" type="error" showIcon />
            </Form.Item> : <div></div>}
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name",
                    },
                ]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your last name",
                    },
                ]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email",
                    },
                    {
                        type: "email",
                        message: "Please enter a valid email!",
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="text-primary" />} />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block loading={signupLoaderState}>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;
