import { Alert, Button, Form, Input, notification, Select, Switch } from "antd";
import authService from '../../../../services/authService';
import { useState } from 'react';
import {
    selectEditFlag,
    setCreateUpdateUserRoleModalViewState, updateUserRoleList,
} from '../../../dashboard-views/dashboardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const { Option } = Select;

export const UserRoleCreateUpdateForm = () => {
    const [form] = Form.useForm();
    const [createUpdateState, setCreateUpdateState] = useState(true);
    const [createUpdateLoaderState, setCreateUpdateLoaderState] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const editFlag = useAppSelector(selectEditFlag);
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

    const onCreateUpdateClick = async (name: string, read_only: boolean, methods: Array<string>, content_type: string) => {
        setCreateUpdateState(true);
        setCreateUpdateLoaderState(true);
        const response = await authService.createUserRole(name, read_only, methods, content_type);
        setCreateUpdateState(response);
        setCreateUpdateLoaderState(false);
        if (dispatch) {
            if (response) {
                dispatch(setCreateUpdateUserRoleModalViewState(false));
                openNotification(true, 'Successful', `User role has been ${editFlag ? 'updated' : 'created'} successfully`);
            }
            else {
                openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} user role`);
            }
            try {
                const userrolelist = await authService.getUserRoles();
                dispatch(updateUserRoleList(userrolelist));
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const onFinish = (values: any) => {
        onCreateUpdateClick(values.name, values.read_only, values.methods, values.content_type);
    };

    return (
        <div>
            {contextHolder}
            <Form form={form} layout="vertical" name="user-role-create-update-form" onFinish={onFinish}>
                {!createUpdateState ? <Form.Item>
                    <Alert message="Unexpected error has occurred. Please contact admin if the issue persists" type="error" showIcon />
                </Form.Item> : <div></div>}
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a name",
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="read_only"
                    label="Read only"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Methods"
                    name={'methods'}
                    fieldKey={'methods'}
                    rules={[{ required: true, message: 'Please select a method' }]}
                    className="w-100"
                >
                    <Select mode="multiple" allowClear className="w-100" placeholder="Methods" >
                        {
                            [{ id: 1, data: 'GET' }, { id: 2, data: 'POST' }, { id: 3, data: 'PUT' }, { id: 4, data: 'DELETE' }].map(elm => (
                                <Option key={elm.id} value={elm.data}>{elm.data}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="content_type"
                    label="Content type"
                    rules={[
                        {
                            required: true,
                            message: "Please enter content type",
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    initialValue={'roles'}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={createUpdateLoaderState}>
                        {`${editFlag ? 'Update' : 'Create'} user role`}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserRoleCreateUpdateForm;
