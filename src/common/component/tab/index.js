import React from "react";
import { NavLink, HashRouter } from "react-router-dom";

import "./index.less";

const Tab = () => {
  return (
    <HashRouter>
      <div className="tab">
        <NavLink to="/recommend" className="tabItem">
          <span className="tabLink ">推荐</span>
        </NavLink>
        <NavLink to="/singer" className="tabItem">
          <span className="tabLink ">歌手</span>
        </NavLink>
        <NavLink to="/rank" className="tabItem">
          <span className="tabLink ">排行</span>
        </NavLink>
        <NavLink to="/search" className="tabItem">
          <span className="tabLink ">搜索</span>
        </NavLink>
      </div>
    </HashRouter>
  );
};

export default Tab;
