import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./index.less";

const SingerDetail = (props) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(Math.random());
  },[]);

  return (
    <TransitionGroup>
      <CSSTransition key={number} timeout={10000} classNames="app2">
        <div className="singerDetail">1</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SingerDetail;
