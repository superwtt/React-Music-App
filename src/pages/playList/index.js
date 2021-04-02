import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./index.less";

const PlayList = (props) => {
  const [playNumber, setPlayNumber] = useState(0);

  const { showPlayListFlag } = props;

  const closeList = ()=>{
      setPlayNumber(0);
      props.close()
  }

  useEffect(() => {
    showPlayListFlag ? setPlayNumber(1) : setPlayNumber(0);
  }, [showPlayListFlag]);

  return (
    <CSSTransition
      in={playNumber ? true : false}
      timeout={10000}
      classNames="list-fade"
    >
      <div className="playlist">
        <div className="list-wrapper">
          <div className="list-header">
            <h1 className="title">
              <i className="icon"></i>
              <span className="text"></span>
              <span className="clear">
                <i className="icon-clear"></i>
              </span>
            </h1>
          </div>
          <div className="list-content">
            <ul>
              <li className="item">
                <i className="current"></i>
                <span className="text"></span>
                <span className="like">
                  <i className="icon-not-favorite"></i>
                </span>
                <span className="delete">
                  <i className="icon-delete"></i>
                </span>
              </li>
            </ul>
          </div>
          <div className="list-operate">
            <div className="add">
              <i className="icon-add"></i>
              <span className="text">添加歌曲到队列</span>
            </div>
          </div>
          <div onClick={closeList} className="list-close">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PlayList;
