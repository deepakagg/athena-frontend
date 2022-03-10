import { Alert, Button, Divider, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import authService from '../../../../services/authService';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

export const LoginForm = (props: Record<string, unknown>) => {
  const showForgetPassword = true;
  const onForgetPasswordClick = () => {};
  const history = useHistory();
  const [form] = Form.useForm();
  const [loginState, setLoginState] = useState(false);
  const [loginLoaderState, setLoginLoaderState] = useState(false);

  const onSignInClick = async (email: string, password: string) => {
    setLoginLoaderState(true);
    const response = await authService.loginUser(email, password);
    setLoginState(response);
    setLoginLoaderState(false);
    if(response){
      history.push("/app/user-dashboard");
    }
  }

  const onFinish = (values: any) => {
    onSignInClick(values.email, values.password);
  };

  return (
    <Form form={form} layout="vertical" name="login-form" onFinish={onFinish}>
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
            message: "Please enter a validate email!",
          },
        ]}
      >
        <Input prefix={<MailOutlined className="text-primary" />} />
      </Form.Item>
      <Form.Item
        name="password"
        label={
          <div
            className={`${
              showForgetPassword
                ? "d-flex justify-content-between w-100 align-items-center"
                : ""
            }`}
          >
            <span>Password</span>
            {showForgetPassword && (
              <span
                onClick={() => onForgetPasswordClick}
                className="cursor-pointer font-size-sm font-weight-normal text-muted"
              >
                Forget Password?
              </span>
            )}
          </div>
        }
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="text-primary" />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loginLoaderState}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
