import React from "react";
import { Switch, Route, Router, HashRouter, Link } from "react-router-dom";
import Recommend from "../pages/recommend";
import Singer from "../pages/singer";

export default class RouterConfig extends React.Component {
  render() {
    return (
      <div>
        <HashRouter forceRefresh={true}>
          <Switch>
            <Route path="/recommend" component={Recommend}></Route>
            <Route path="/Singer" component={Singer}></Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
