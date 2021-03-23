import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const SongList = (props) => {
  const { songs } = props;

  const getDesc = (song)=>{
    return `${song.singer}·${song.album}`
  }

  const selectItem = (song,index)=>{
    props.selectItem(song,index)
  }

  return (
    <div className="songList">
      <ul>
        {songs.map((item,index) => {
          return (
            <li className="item" key={index} onClick={()=>selectItem(item,index)}>
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
