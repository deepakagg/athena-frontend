import { Alert, Button, Form, Input, notification, Select, Switch } from "antd";
import authService from '../../../../services/authService';
import { useEffect, useState } from 'react';
import {
    selectCreateUpdateUserRoleModalViewState,
    selectEditFlag,
    selectUserRoleId,
    selectUserRoleList,
    setCreateUpdateUserRoleModalViewState, updateUserRoleList,
} from '../../../dashboard-views/dashboardSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const { Option } = Select;

interface IFormValue {
    [key: string]: number | string | boolean;
}

export const UserRoleCreateUpdateForm = () => {
    const [form] = Form.useForm();
    const [createUpdateState, setCreateUpdateState] = useState(true);
    const [createUpdateLoaderState, setCreateUpdateLoaderState] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const editFlag = useAppSelector(selectEditFlag);
    const userRoleList = useAppSelector(selectUserRoleList);
    const userRoleId = useAppSelector(selectUserRoleId);
    const userRoleModalState = useAppSelector(selectCreateUpdateUserRoleModalViewState);
    const dispatch = useAppDispatch();

    useEffect(() => {
		if (editFlag) {
			if (userRoleId) {
				const userRole = userRoleList.find(item => {
					return item.id === userRoleId
				 })
				const formData: IFormValue = {
                    name: userRole.name,
                    read_only: userRole.read_only,
                    methods: userRole.methods,
                    content_type: userRole.content_type,
                };
                form.setFieldsValue(formData);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userRoleModalState]);

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
        let response = undefined;
        if(editFlag){
            response = await authService.updateUserRole(userRoleId as string, name, read_only, methods, content_type);
        }
        else {
            response = await authService.createUserRole(name, read_only, methods, content_type);
        }
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
        // console.log(values);
        const content_type = 'roles';
        onCreateUpdateClick(values.name, values.read_only, values.methods, content_type);
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
                {/* <Form.Item
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
                </Form.Item> */}
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
