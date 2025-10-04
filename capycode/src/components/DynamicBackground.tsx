import React from "react";
import Silk from "./Silk";
import type { SilkProps } from "./Silk";
import "./DynamicBackground.css";

const DynamicBackground: React.FC<SilkProps> = (props) => {
  return (
    <div className="dynamic-background-root">
      <Silk {...props} />
    </div>
  );
};

export default DynamicBackground;
