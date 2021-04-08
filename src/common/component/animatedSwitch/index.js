import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropsTypes from "prop-types";

import "./index.less"; // 动画样式

let oldLocation = null;

class AnimatedSwitch extends React.Component {

  static propsTypes = {
    routerConfig: PropsTypes.array.isRequired,
  };

  render() {

    const { location, history, children } = this.props;

    let classNames = "";
    
    if (history.action === "PUSH") {
      // 打开页面的转场动画
      classNames = "forward-from-right";
    } else if (history.action === "POP" && oldLocation) {
      // 关闭页面的转场动画
      classNames = "back-to-right";
    }
    oldLocation = location;
    // 使用 TransitionGroup 和 CSSTransition 包裹 Switch，实现转场动画
    return (
      <TransitionGroup
        className={"router-wrapper"}
        childFactory={(child) => React.cloneElement(child, { classNames })}
      >
        <CSSTransition timeout={300} key={location.pathname}>
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
// 通过 withRouter 包裹，可以从props中获取location，history等对象。
export default withRouter(AnimatedSwitch);
