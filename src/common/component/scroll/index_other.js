import React from "react";
import Scroll from "react-bscroll";
import "react-bscroll/lib/react-scroll.css";

const ScrollCompo = (props) => {
  return <Scroll>{props.children}</Scroll>;
};

export default ScrollCompo;
