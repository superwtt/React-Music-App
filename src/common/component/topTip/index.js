import React from "react";
import { CSSTransition } from "react-transition-group";

import './index.less'

const TopTip = (props) => {
  return (
    <CSSTransition name='drop'>
      <div class="top-tip" v-show="showFlag">
        {props.children}
      </div>
    </CSSTransition>
  );
};

export default TopTip;
