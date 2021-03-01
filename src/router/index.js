import React from "react";
import { Switch, Route, Router, HashRouter, Redirect } from "react-router-dom";
import Recommend from "../pages/recommend";
import Singer from "../pages/singer";

export default class RouterConfig extends React.Component {
  render() {
    return (
        <HashRouter forceRefresh={true}>
          <Switch>
            
            <Route path="/recommend" component={Recommend}></Route>
            <Route path="/singer" component={Singer}></Route>
            <Redirect from="/" to="/recommend" /> 
            {/* Redirect必须放Switch里的最后一行，如果上面的路由都匹配不到，跳转到“/”页面，即渲染的Recommend组件 */}
          </Switch>
        </HashRouter>
    );
  }
}
