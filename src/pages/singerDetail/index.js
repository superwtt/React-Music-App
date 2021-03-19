import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./index.less";

const SingerDetail = (props) => {

    console.log(props.location.pathname)
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={props.location.pathname}
        timeout={10000}
        classNames="app2"
      >
        <div className="singerDetail">1</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SingerDetail;
