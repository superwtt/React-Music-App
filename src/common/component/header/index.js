import React from "react";
import { Link, HashRouter } from "react-router-dom";

import "./index.less";

const Header = () => {
  return (
    <div className="mHeader">
      <div className="icon" />
      <span className="text">Chicken Music</span>
      <HashRouter>
        <Link to="/user" className="mine">
          <i className="icon-mine"></i>
        </Link>
      </HashRouter>
    </div>
  );
};

export default Header;
