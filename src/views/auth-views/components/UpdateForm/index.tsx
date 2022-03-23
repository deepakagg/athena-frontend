import { Alert, Button, Form, Input, notification, Switch  } from "antd";
import { MailOutlined } from "@ant-design/icons";
import authService from '../../../../services/authService';
import { useEffect, useState } from 'react';
import {
    setUpdateUserModalViewState, updateUserList,
} from '../../../dashboard-views/dashboardSlice';
import userService from "services/userService";

export const UpdateForm = (props: Record<string, any>) => {
    const { dispatch, isInternal, selectedUserId } = props;
    const [form] = Form.useForm();
    const [updateState, setUpdateState] = useState(true);
    const [updateLoaderState, setUpdateLoaderState] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        authService.getUserById(selectedUserId)
            .then((response: any) => {
                form.setFieldsValue({
                    firstName: response['first_name'],
                    lastName: response['last_name'],
                    email: response['email'],
                    phone: response['phone_number'],
                    is_active: response['is_active'] || true
                });
            })
            .catch((e: any) => { console.log(e); })
    }, [selectedUserId, form]);

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

    const onUpdateClick = async (id: string, email: string, first_name: string, last_name: string, phone_number: string, is_active: boolean) => {
        setUpdateState(true);
        setUpdateLoaderState(true);
        const response = await authService.updateUser(id, email, first_name, last_name, phone_number, is_active);
        setUpdateState(response);
        setUpdateLoaderState(false);
        if (dispatch) {
            if (response) {
                dispatch(setUpdateUserModalViewState(false));
                openNotification(true, 'Successful', 'User has been updated successfully');
            }
            else {
                openNotification(false, 'Failed', 'Failed to update user');
            }
            if (isInternal) {
                try {
                    const userlist = await userService.getUserList();
                    dispatch(updateUserList(userlist));
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }

    const onFinish = (values: any) => {
        onUpdateClick(selectedUserId, values.email, values.firstName, values.lastName, values.phone, values.is_active);
    };

    return (
        <div>
            {contextHolder}
            <Form form={form} layout="vertical" name="update-form" onFinish={(values) => onFinish(values)}>
                {!updateState ? <Form.Item>
                    <Alert message="Update has failed. Please contact admin if the issue persists" type="error" showIcon />
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
                    <Input />
                </Form.Item>

                <Form.Item
                    name="is_active"
                    label="Active"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={updateLoaderState}>
                        Update user
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateForm;
