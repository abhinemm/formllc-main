import { Spin } from "antd";
import React from "react";

const TransparentLoader = () => {
  return (
    <div className="loaderWrapperTransparent">
      <Spin />
    </div>
  );
};

export default TransparentLoader;
