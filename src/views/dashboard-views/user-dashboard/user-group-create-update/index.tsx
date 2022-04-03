import { Alert, Button, Form, Input, notification, Select } from "antd";
import authService from '../../../../services/authService';
import { useEffect, useState } from 'react';
import {
    selectEditFlag,
    selectUserRoleList,
    setCreateUpdateUserGroupModalViewState, updateUserGroupList, updateUserRoleList,
} from '../../../dashboard-views/dashboardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const { Option } = Select;

export const UserGroupCreateUpdateForm = () => {
    const [form] = Form.useForm();
    const [createUpdateState, setCreateUpdateState] = useState(true);
    const [createUpdateLoaderState, setCreateUpdateLoaderState] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const editFlag = useAppSelector(selectEditFlag);
    const userRoleList = useAppSelector(selectUserRoleList);
    const dispatch = useAppDispatch();

    useEffect(() => {
		authService.getUserRoles()
			.then((userRoleList) => { dispatch(updateUserRoleList(userRoleList)); })
			.catch((e) => { console.log(e); dispatch(updateUserRoleList([])); })
	}, [dispatch]);

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

    const onCreateUpdateClick = async (name: string, roles: Array<number>) => {
        setCreateUpdateState(true);
        setCreateUpdateLoaderState(true);
        const response = await authService.createUserGroup(name, roles);
        setCreateUpdateState(response);
        setCreateUpdateLoaderState(false);
        if (dispatch) {
            if (response) {
                dispatch(setCreateUpdateUserGroupModalViewState(false));
                openNotification(true, 'Successful', `User group has been ${editFlag ? 'updated' : 'created'} successfully`);
            }
            else {
                openNotification(false, 'Failed', `Failed to ${editFlag ? 'edit' : 'add'} user group`);
            }
            try {
                const usergrouplist = await authService.getUserGroups();
                dispatch(updateUserGroupList(usergrouplist));
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const onFinish = (values: any) => {
        // console.log(values);
        onCreateUpdateClick(values.name, values.roles);
    };

    return (
        <div>
            {contextHolder}
            <Form form={form} layout="vertical" name="user-group-create-update-form" onFinish={onFinish}>
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
                    label="Roles"
                    name={'roles'}
                    fieldKey={'roles'}
                    rules={[{ required: true, message: 'Please select a role' }]}
                    className="w-100"
                >
                    <Select mode="multiple" allowClear className="w-100" placeholder="Roles" >
                        {
                            userRoleList.map(elm => (
                                <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={createUpdateLoaderState}>
                        {`${editFlag ? 'Update' : 'Create'} user group`}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserGroupCreateUpdateForm;
