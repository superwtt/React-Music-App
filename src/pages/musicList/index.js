import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Scroll from "@/common/component/scroll";
import SongList from "@/common/component/songList";
import "./index.less";


const MusicList = (props) => {
  const { songs } = props;

  const musicList = useRef(null);

  useEffect(() => {
      const imageHeight = document.getElementsByClassName("bgImage")[0].clientHeight;
      const list = document.getElementsByClassName("list")[0];

      console.log(list)
      console.log(imageHeight)

      list.style.top = `${imageHeight}px`;
  }, []);

  return (
    <div className="musicList">
      <div className="back">
        <i className="icon-back iconBack"></i>
      </div>
      <h1 className="title">{props.title}</h1>
      <div 
        className="bgImage"
        style={{ backgroundImage: "url(" + props.bgImage + ")" }}
      >
        <div className="filter"></div>
      </div>
      
      <Scroll data={songs} classVal={"list"} ref={musicList}>
        <div className="songListWrapper">
          <SongList songs={songs} />
        </div>
      </Scroll>
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
