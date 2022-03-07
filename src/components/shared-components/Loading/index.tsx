import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import { Spin } from "antd";

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

const Loading = ({ align, cover }: { align: string; cover: string }) => {
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  cover: PropTypes.string,
};

Loading.defaultProps = {
  align: "center",
  cover: "inline",
};

export default Loading;
