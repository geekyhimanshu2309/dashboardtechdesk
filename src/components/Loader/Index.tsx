import React from "react";

type LoaderProps = {
  size: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <span className={`loading loading-spinner loading-${size} ${color ?? ''}`}></span>
  );
};

export default Loader;
