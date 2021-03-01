import React from "react";

import "./index.less";
import defaultPic from "../../assets/default.png";

const Header = () => {
  return (
    <div>
      <img src={defaultPic} alt="" />
      <span className="text">Chicken Music</span>
    </div>
  );
};

export default Header;
