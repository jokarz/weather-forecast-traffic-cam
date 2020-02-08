import React from "react";
import cssMod from "./index.module.scss";

const ImagePlaceholder = ({
  width,
  height,
  style,
  className,
  backgroundColor
}) => {
  return (
    <div
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        borderStyle: "none",
        width,
        height,
        ...style
      }}
      className={`${cssMod.placeholder} ${className}`}
    />
  );
};

export default ImagePlaceholder;

ImagePlaceholder.defaultProps = {
  width: "100%",
  height: "100%",
  style: {},
  className: "rounded-lg"
};
