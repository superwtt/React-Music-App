import React from "react";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";

import Recommend from "../pages/recommend";
import Singer from "../pages/singer";
import Rank from "../pages/rank";
import Search from "../pages/search";
import SingerDetail from "../pages/singerDetail";

// const routes = [
//   {
//     path:'/recommend',
//     component:Recommend,
//   },
//   {
//     path:'/singer',
//     component:Singer,
//   },
//   {
//     path:'/rank',
//     component:Rank,
//   },
//   {
//     path:'/search',
//     component:Search,
//   }
// ]

const RouterConfig = () => {
  return (
    <HashRouter forceRefresh={true}>
      <Switch>
        <Route path="/recommend" component={Recommend} />
        <Route exact path='/singer' component={Singer}/>
        <Route path="/singer/:id" component={SingerDetail} />
        <Route path="/rank" component={Rank} />
        <Route path="/search" component={Search} />
        <Redirect from="/" to="/recommend" />
        {/* Redirect必须放Switch里的最后一行，如果上面的路由都匹配不到，跳转到“/”页面，即渲染的Recommend组件 */}
      </Switch>
    </HashRouter>
  );
};
export default RouterConfig;
