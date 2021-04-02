import React from "react";
import "./index.less";

const PlayList = () => {
  return (
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
        <div className="list-close">
          <span>关闭</span>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
