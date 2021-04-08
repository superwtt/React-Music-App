import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";

import AnimatedSwitch from "../common/component/animatedSwitch";
import Recommend from "../pages/recommend";
import Singer from "../pages/singer";
import Rank from "../pages/rank";
import Search from "../pages/search";
import UserCenter from "../pages/userCenter";

const routes = [
  {
    path: "/recommend",
    component: Recommend,
    key: "Recommend",
  },
  {
    path: "/singer",
    component: Singer,
    key: "Singer",
  },
  {
    path: "/rank",
    component: Rank,
    key: "Rank",
  },
  {
    path: "/search",
    component: Search,
    key: "Search",
  },
  {
    path: "/user",
    component: UserCenter,
    key: "UserCenter",
  },
];

const RouterConfig = () => {
  return (
    <HashRouter forceRefresh={true}>
      <AnimatedSwitch>
        {routes.map((config, index) => {
          return <Route exact key={index} {...config} />;
        })}
        {/* Redirect必须放Switch里的最后一行，如果上面的路由都匹配不到，跳转到“/”页面，即渲染的Recommend组件 */}
      </AnimatedSwitch>
    </HashRouter>
  );
};
export default RouterConfig;
