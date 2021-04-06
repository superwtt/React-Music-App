import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./index.less";

const AddSong = (props) => {
  const [number, setNumber] = useState(0);

  const { showAddSong } = props;

  useEffect(() => {
    showAddSong ? setNumber(1) : setNumber(0);
  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <div className="addSong">
        <div className="header">
          <h1 className="title">添加歌曲到列表</h1>
          <div className="close">
            <i className="icon-close"></i>
          </div>
        </div>
        <div className="search-box-wrapper"></div>
        <div className="shortcut"></div>
        <div className="search-result"></div>
      </div>
    </CSSTransition>
  );
};

export default AddSong;
