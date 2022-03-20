import { Card, Col, Row } from "antd";

import SignupForm from "../../components/SignupForm";
import React from "react";

const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Signup = (props: Record<string, unknown>) => {
  const theme = "light";
  if (props.isInternal) {
    return (<SignupForm {...props} />);
  }
  else {
    return (
      <div className="h-100" style={backgroundStyle}>
        <div className="container d-flex flex-column justify-content-center h-100">
          <Row justify="center">
            <Col xs={20} sm={20} md={20} lg={7}>
              <Card>
                <div className="my-4">
                  <div className="text-center">
                    <img
                      className="img-fluid"
                      src={`/img/${theme === "light" ? "logo.png" : "logo-white.png"
                        }`}
                      alt=""
                    />
                    <p>
                      Already have an account?{" "}
                      <a href="/auth/login">Login</a>
                    </p>
                  </div>
                  <Row justify="center">
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <SignupForm {...props} />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

export default Signup;
