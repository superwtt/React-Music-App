import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Scroll from "@/common/component/scroll";
import SongList from "@/common/component/songList";
import "./index.less";

const RESERVED_HEIGHT = 40;
let imageHeightGlobal = 0;

const MusicList = (props) => {

  const [scrollY,setScrollY] = useState(0);

  const { songs } = props;

  const musicList = useRef(null);

  const scroll = (pos)=>{
    setScrollY(pos.y)
  }

  useEffect(() => {
    const imageHeight = document.getElementsByClassName("bgImage")[0].clientHeight;
    const list = document.getElementsByClassName("list")[0];

    imageHeightGlobal=imageHeight;

    console.log(list);
    console.log(imageHeight);

    list.style.top = `${imageHeight}px`;
  }, []);

  useEffect(()=>{
    const translateY = Math.max(-imageHeightGlobal+RESERVED_HEIGHT,scrollY);
    const bgLayer = document.getElementsByClassName("bgLayer")[0];
    bgLayer.style['transform'] = `translate3d(0,${translateY}px,0)`
  },[scrollY])

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
      <div className="bgLayer"></div>
      <Scroll 
       listenScroll={true}
       probeType={3}
       scroll={scroll}
       data={songs} 
       classVal={"list"} 
       ref={musicList}>
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
