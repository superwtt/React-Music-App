import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const SongList = (props) => {
  const { songs } = props;

  const getDesc = (song)=>{
    return `${song.singer}·${song.album}`
  }

  return (
    <div className="songList">
      <ul>
        {songs.map((item) => {
          return (
            <li className="item">
              {/* <div className="rank">
                <span></span>
                </div> */}
              <div className="content">
                <div className="name">{item.name}</div>
                <div className="desc">{getDesc(item)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SongList.defaultProps = {
  songs: [],
};

SongList.propTypes = {
  songs: PropTypes.array,
};

export default SongList;
