import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const MusicList = (props) => {
  return (
    <div className="musicList">
      <div className="back">
        <i className="icon-back iconBack"></i>
      </div>
      <h1 className="title">{props.title}</h1>
      <div className="bgImage" style={{backgroundImage:'url('+props.bgImage+')'}}>
        <div className="filter"></div>
      </div>
    </div>
  );
};

MusicList.defaultProps = {
  bgImage: "",
  songs: [],
  title: "",
  rank: false,
};

MusicList.propTypes = {
  bgImage: PropTypes.string,
  songs: PropTypes.array,
  title: PropTypes.string,
  rank: PropTypes.bool,
};

export default MusicList;
