import React from "react";

type IconProps = {
  icon: string;
  width?: string;
  height?: string;
  color?: string;
};

const Icon: React.FC<IconProps> = ({ icon, width, height, color }) => {
  return (
    <span
      className={icon}
      style={{ height: height, width: width, color: color }}
    ></span>
  );
};

export default Icon;
