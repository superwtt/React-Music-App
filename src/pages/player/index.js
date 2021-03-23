import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";

import ProgressCircle from '@/common/component/progressCircle'
import ProgressBar from '@/common/component/progressBar'
import { prefixStyle } from "@/common/js/dom";
import * as actionCreators from "../player/store/actionCreators";

import "./index.styl";

const transform = prefixStyle("transform");

const Player = (props) => {
  const [songReady, setSongReady] = useState(false);
  const [playNumber, setPlayNumber] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percent, setPercent] = useState(0);
  const { fullScreen, playList, currentSong, playing, currentIndex } = props;

  const audio = useRef(null);

  const back = () => {
    props.setFullScreen(false);
  };

  const open = () => {
    props.setFullScreen(true);
  };

  // CSS3的方式写js动画
  const enter = (el, done) => {
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(
      document.getElementsByClassName("cdWrapper")[0],
      "move",
      done
    );

    document.getElementsByClassName("normalPlayer")[0].style.display = "block";
  };

  const afterEnter = () => {
    animations.unregisterAnimation("move");
    document.getElementsByClassName("cdWrapper")[0].style.animation = "";
  };

  const exit = (el, done) => {
    const { x, y, scale } = _getPosAndScale();
    const cdWrapper = document.getElementsByClassName("cdWrapper")[0];

    cdWrapper.style.transition = "all 0.4s";

    cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    cdWrapper.addEventListener("transitionend", done);
  };

  const afterExit = () => {
    const cdWrapper = document.getElementsByClassName("cdWrapper")[0];
    cdWrapper.style.transition = "";
    cdWrapper.style[transform] = "";
    // setTimeout(()=>{
    document.getElementsByClassName("normalPlayer")[0].style.display = "none";
    // },30000)
  };

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8; // 大唱片的宽度
    const scale = targetWidth / width;
    const x = -(window.innerWidth / 2 - paddingLeft); // 唱片一开始 x方向上的位置
    const y = window.innerHeight - paddingTop - paddingBottom - width / 2; // 唱片一开始 y方向上的位置

    return {
      x,
      y,
      scale,
    };
  };

  const _cdPlayer = () => {
    return playing ? "play" : "play pause";
  };

  const _calculatePlayIcon = () => {
    return playing ? "icon-pause" : "icon-play";
  };

  const _miniIcon = () => {
    return playing ? "icon-pause-mini" : "icon-play-mini";
  };

  const _disable = () => {
    return songReady ? "" : "disable";
  };

  const togglePlaying = () => {
    props.setPlayingState(!playing);
  };

  const miniTogglePlaying = (e) => {
    e.stopPropagation();
    if (!songReady) return;
    togglePlaying();
    setSongReady(false)
  };

  const canPlay = () => {
    setSongReady(true)
  };

  const error = () => {
    setSongReady(true)
  };

  const next = () => {
    if (!songReady) return;
    let index = currentIndex + 1;
    if (index === playList.length) {
      index = 0;
    }
    props.setCurrentIndex(index);

    if (!playing) {
      togglePlaying();
    }

    setSongReady(false)
  };

  const prev = () => {
    if (!songReady) return;
    let index = currentIndex - 1;
    if (index === -1) {
      index = playList.length - 1;
    }
    props.setCurrentIndex(index);

    if (!playing) {
      togglePlaying();
    }

    setSongReady(false)
  };

  const _pad = (num,n=2)=>{
    let len = num.toString().length;
    while(len<n){
      num = '0'+num
      len++
    }
    return num
  }

  const formatTime = (interval)=>{
    interval = interval | 0;
    const minute = interval / 60 |0;
    const second = interval%60|0;
    return `${minute}:${_pad(second)}` 
  }

  const timeUpdate = (e)=>{
    const time = e.target.currentTime;
    setCurrentTime(formatTime(time))
    setPercent(time/currentSong.duration)
  }

  const onPercentChange = (per)=>{
    audio.current.currentTime = parseFloat(per * currentSong.duration)
    if(!playing){
      togglePlaying()
    }
    if(per===1){
      props.setCurrentIndex(currentIndex+1);
    }
  }

  /**
   * 计算内层Image的transform，并同步到外层容器   没有pause样式的情况下
   * @param wrapper
   * @param inner
   */
  // const syncWrapperTransform = (wrapper, inner) => {
  //   let imageWrapper = document.getElementsByClassName(wrapper)[0];
  //   let image = document.getElementsByClassName(inner)[0];
  //   let wTransform = getComputedStyle(imageWrapper)[transform];
  //   let iTransform = getComputedStyle(image)[transform];
  //   imageWrapper.style[transform] =
  //     wTransform === "none" ? iTransform : iTransform.concat(" ", wTransform);
  // };

  useEffect(() => {
    setSongReady(true)
    fullScreen ? setPlayNumber(1) : setPlayNumber(0);
  }, [fullScreen]);

  useEffect(() => {
    audio.current && audio.current.play().catch((error) => {});
  }, [currentSong]);

  useEffect(() => {
    playing ? audio.current.play().catch((error) => {}) : audio.current.pause();
  }, [playing]);

  return (
    <>
      <div
        className="player"
        style={{ display: playList.length > 0 ? "" : "none" }}
      >
        <CSSTransition
          in={playNumber ? true : false}
          timeout={400}
          classNames="normal"
          onEnter={enter}
          onEntered={afterEnter}
          onExit={exit}
          onExited={afterExit}
        >
          <div className="normalPlayer">
            <div className="background">
              <img width="100%" height="100%" src={currentSong.image} alt="" />
            </div>
            <div className="top">
              <div className="back" onClick={back}>
                <i className="icon-back iconBack"></i>
              </div>
              <h1
                className="title"
                dangerouslySetInnerHTML={{ __html: currentSong.name }}
              ></h1>
              <h2
                className="subtitle"
                dangerouslySetInnerHTML={{ __html: currentSong.singer }}
              ></h2>
            </div>
            <div className="middle">
              <div className="middleL">
                <div className="cdWrapper">
                  <div className="cd imageWrapper">
                    <img
                      className={`image ${_cdPlayer()}`}
                      src={currentSong.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="progress-wrapper">
                <span className="time time-l">{currentTime}</span>
                <div className="progress-bar-wrapper">
                   <ProgressBar percent={percent} percentChange={onPercentChange} />
                </div>
                <div className="time time-r">{formatTime(currentSong.duration)}</div>
              </div>
              <div className="operators">
                <div className="icon iLeft">
                  <i className="icon-sequence"></i>
                </div>
                <div className={`icon iLeft ${_disable()}`}>
                  <i className="icon-prev" onClick={prev}></i>
                </div>
                <div className={`icon iCenter ${_disable()}`}>
                  <i
                    className={_calculatePlayIcon()}
                    onClick={() => togglePlaying()}
                  ></i>
                </div>
                <div className={`icon iRight ${_disable()}`}>
                  <i className="icon-next" onClick={next}></i>
                </div>
                <div className="icon iRight">
                  <i className="icon icon-not-favorite"></i>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
        <div style={{ display: fullScreen ? "none" : "" }}>
          <CSSTransition
            in={playNumber ? false : true}
            timeout={300}
            classNames="mini"
          >
            <div className="miniPlayer" onClick={open}>
              <div className="icon">
                <div className="imgWrapper miniWrapper">
                  <img
                    width="40"
                    height="40"
                    className={`miniImage ${_cdPlayer()}`}
                    src={currentSong.image}
                    alt=""
                  />
                </div>
              </div>
              <div className="text">
                <h2
                  className="name"
                  dangerouslySetInnerHTML={{ __html: currentSong.name }}
                ></h2>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: currentSong.singer }}
                ></p>
              </div>
              <div className="control">
                <ProgressCircle percent={percent}>
                <i
                  onClick={miniTogglePlaying}
                  className={`icon-mini ${_miniIcon()}`}
                ></i>
                </ProgressCircle>
              </div>
              <div className="control">
                
                <i className="iconPlaylist icon-playlist"></i>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <audio
        ref={audio}
        src={currentSong.url}
        onCanPlay={canPlay}
        onError={error}
        onTimeUpdate={timeUpdate}
      ></audio>
    </>
  );
};

const mapStateToProps = (state) => ({
  fullScreen: state.playerReducer.fullScreen,
  playList: state.playerReducer.playList,
  currentSong: state.playerReducer.currentSong,
  playing: state.playerReducer.playing,
  currentIndex: state.playerReducer.currentIndex,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFullScreen(flag) {
      dispatch(actionCreators.setFullScreen(flag));
    },
    setPlayingState(flag) {
      dispatch(actionCreators.setPlayingState(flag));
    },
    setCurrentIndex(index) {
      dispatch(actionCreators.setCurrentIndex(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
