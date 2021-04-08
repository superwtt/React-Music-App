import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";

import Recommend from "../pages/recommend";
import Singer from "../pages/singer";
import Rank from "../pages/rank";
import Search from "../pages/search";
import UserCenter from "../pages/userCenter";

const RouterConfig = () => {
  return (
    <HashRouter forceRefresh={true}>
      <Switch>
        <Route path="/recommend" key="recommend" component={Recommend} />
        {/* <Route path="/recommend/:id" component={Disc} /> */}
        <Route exact path='/singer' key="singer" component={Singer}/>
        {/* <Route path="/singer/:id" component={SingerDetail} /> */}
        <Route path="/rank" key="rank" component={Rank} />
        <Route path="/search" key="search" component={Search} />
        <Route path="/user" key="user" component={UserCenter} />
        <Redirect from="/" to="/recommend" />
        {/* Redirect必须放Switch里的最后一行，如果上面的路由都匹配不到，跳转到“/”页面，即渲染的Recommend组件 */}
      </Switch>
    </HashRouter>
  );
};
export default RouterConfig;
