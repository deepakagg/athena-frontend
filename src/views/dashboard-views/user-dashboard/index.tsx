import React from "react";
import { Button, Card, Col, Row } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import authService from '../../../services/authService';
import { useHistory } from "react-router-dom";

const backgroundStyle = {
    backgroundImage: "url(/img/others/img-17.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

const UserDashboard = (props: Record<string, unknown>) => {
    const theme = "light";
    const history = useHistory();

    const onLogout = () => {
        authService.logoutUser();
        history.push("/auth/login");
    }

    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={7}>
                        <Card>
                            <div className="my-4">
                                Logged in successfully
                            </div>
                            <Button type="primary" icon={<LogoutOutlined />} size={'large'} onClick={onLogout} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default UserDashboard;
