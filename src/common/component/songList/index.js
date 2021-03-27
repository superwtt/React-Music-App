import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const SongList = (props) => {
  const { songs, rank } = props;

  const getDesc = (song) => {
    return `${song.singer}·${song.album}`;
  };

  const selectItem = (song, index) => {
    props.selectItem(song, index);
  };

  const getRankCls = (index) => {
    if (index <= 2) {
      return `icon icon${index}`;
    } else {
      return "text";
    }
  };

  const getRankText = (index) => {
    if (index > 2) return index + 1;
  };

  return (
    <div className="songList">
      <ul>
        {songs.map((item, index) => {
          return (
            <li
              className="item"
              key={index}
              onClick={() => selectItem(item, index)}
            >
              {rank && (
                <div className="rank">
                  <span className={`${getRankCls(index)}`}>{getRankText(index)}</span>
                </div>
                
              )}
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
  rank: false,
};

SongList.propTypes = {
  songs: PropTypes.array,
  rank: PropTypes.bool,
};

export default SongList;
