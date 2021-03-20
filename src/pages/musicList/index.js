import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Loading from "@/common/component/loading";
import Scroll from "@/common/component/scroll";
import SongList from "@/common/component/songList";
import { prefixStyle } from "@/common/js/dom";
import "./index.less";

const RESERVED_HEIGHT = 40;
let imageHeightGlobal = 0;

const transform = prefixStyle("transform");
const drop = prefixStyle("drop-filter");

const MusicList = (props) => {
  const [scrollY, setScrollY] = useState(0);
  const [num, setNum] = useState(-1);

  const { songs } = props;

  const musicList = useRef(null);

  const scroll = (pos) => {
    setScrollY(pos.y);
  };

  const back = () => {
    setNum(0);
    props.hide();
  };

  useEffect(() => {
    setNum(1);
    const imageHeight = document.getElementsByClassName("bgImage")[0]
      .clientHeight;
    const list = document.getElementsByClassName("list")[0];

    imageHeightGlobal = imageHeight;

    // console.log(list);
    // console.log(imageHeight);

    list.style.top = `${imageHeight}px`;
  }, []);

  useEffect(() => {
    if (num === 1) {
      const musicList = document.getElementsByClassName("musicList")[0];
      musicList.style[transform] = `translateX(0)`;
    }
  }, [num]);

  useEffect(() => {
    const translateY = Math.max(-imageHeightGlobal + RESERVED_HEIGHT, scrollY);
    const bgLayer = document.getElementsByClassName("bgLayer")[0];
    const bgImage = document.getElementsByClassName("bgImage")[0];
    const filter = document.getElementsByClassName("filter")[0];
    const playBtn = document.getElementsByClassName("playBtn")[0];
    

    bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`;

    let zIndex = 0;
    let scale = 1;
    let blur = 0;

    const percent = Math.abs(scrollY / imageHeightGlobal);

    // bg-layer的滚动交互
    if (scrollY < -imageHeightGlobal) {
      zIndex = 10;
      bgImage.style.paddingTop = 0;
      bgImage.style.height = `${RESERVED_HEIGHT}px`;
      if(playBtn){
        playBtn.style.display = 'none'
      }
    } else {
      zIndex = 0;
      bgImage.style.paddingTop = "70%";
      bgImage.style.height = `0px`;
      if(playBtn){
        playBtn.style.display = ''
      }
    }
    // 下拉图片放大
    if (scrollY > 0) {
      scale = 1 + percent;
      zIndex = 10;
    } else {
      // 上拉图片模糊
      blur = Math.min(100 * percent, 100);
      // console.log(blur)
    }
    bgImage.style.zIndex = zIndex;
    bgImage.style[transform] = `scale(${scale})`;

    // filter.style.filter=`blur(${blur}px)`;
  }, [scrollY]);

  return (
    <div className="musicList">
      <div className="back" onClick={back}>
        <i className="icon-back iconBack"></i>
      </div>
      <h1 className="title">{props.title}</h1>
      <div
        className="bgImage"
        style={{ backgroundImage: "url(" + props.bgImage + ")" }}
      >
        {songs.length > 0 && (
          <div className="playWrapper playBtn">
            <div className="play">
              <i className="icon-play iconPlay"></i>
              <span className="text">随机播放全部</span>
            </div>
          </div>
        )}
        <div className="filter"></div>
      </div>
      <div className="bgLayer"></div>
      <Scroll
        listenScroll={true}
        probeType={3}
        scroll={scroll}
        data={songs}
        classVal={"list"}
        ref={musicList}
      >
        <div className="songListWrapper">
          <SongList songs={songs} />
        </div>
        {songs.length <= 0 && (
          <div className="loadingContainer">
            <Loading />
          </div>
        )}
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
