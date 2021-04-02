import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import Lyric from "lyric-parser";

import PlayList from "@/pages/playList";
import Scroll from "@/common/component/scroll";
import { shuffle } from "@/common/js/util";
import { playMode } from "@/common/js/config";
import ProgressCircle from "@/common/component/progressCircle";
import ProgressBar from "@/common/component/progressBar";
import { prefixStyle } from "@/common/js/dom";
import * as actionCreators from "../player/store/actionCreators";

import "./index.styl";

const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");

const touchFinger = {}; // 记录滑动事件的相关参数

let songReady = false;

const Player = (props) => {
  const [playNumber, setPlayNumber] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percent, setPercent] = useState(0);
  const [currentLyric, setCurrentLyric] = useState(null);
  const [currentLineNum, setCurrentLineNum] = useState(0);
  const [currentShow, setCurrentShow] = useState("cd");
  const [playingLyric, setPlayingLyric] = useState("");
  const [showPlayListFlag, setShowPlayListFlag] = useState(false);

  const lyricList = useRef(null);

  const {
    fullScreen,
    playList,
    currentSong,
    playing,
    currentIndex,
    mode,
    sequenceList,
  } = props;

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

  const _playMode = () => {
    return mode === playMode.sequence
      ? "icon-sequence"
      : mode === playMode.loop
      ? "icon-loop"
      : "icon-random";
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
    if (currentLyric) {
      currentLyric.togglePlay();
    }
  };

  const miniTogglePlaying = (e) => {
    e.stopPropagation();
    togglePlaying();
  };

  const canPlay = () => {
    songReady = true;
  };

  const error = () => {
    songReady = true;
  };

  const loop = () => {
    audio.current.currentTime = 0;
    audio.current.play();

    if (currentLyric) {
      currentLyric.seek(0); //循环播放的时候 歌词能够回到最顶部
    }
  };

  const next = () => {
    if (!songReady) return;
    if (playList.length === 1) {
      loop();
    } else {
      let index = currentIndex + 1;
      if (index === playList.length) {
        index = 0;
      }
      props.setCurrentIndex(index);

      if (!playing) {
        togglePlaying();
      }
    }
    songReady = false;
  };

  const prev = () => {
    if (!songReady) return;
    if (playList.length === 1) {
      loop();
    } else {
      let index = currentIndex - 1;
      if (index === -1) {
        index = playList.length - 1;
      }
      props.setCurrentIndex(index);

      if (!playing) {
        togglePlaying();
      }
    }
    songReady = false;
  };

  // audio播放到最后的时候 要能根据当前模式切换歌曲播放
  const end = () => {
    if (mode === playMode.loop) {
      loop();
    } else {
      next();
    }
  };

  const _pad = (num, n = 2) => {
    let len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  };

  const formatTime = (interval) => {
    interval = interval | 0;
    const minute = (interval / 60) | 0;
    const second = interval % 60 | 0;
    return `${minute}:${_pad(second)}`;
  };

  const timeUpdate = (e) => {
    const time = e.target.currentTime;
    setCurrentTime(formatTime(time));
    setPercent(time / currentSong.duration);
  };

  const onPercentChange = (per) => {
    const time = parseFloat(per * currentSong.duration);
    audio.current.currentTime = time;
    if (!playing) {
      togglePlaying();
    }

    //
    if (currentLyric) {
      currentLyric.seek(time * 1000);
    }
    // if (per === 1) {
    //   props.setCurrentIndex(currentIndex + 1);
    // }
  };

  const resetCurrentIndex = (list) => {
    let index = list.findIndex((item) => {
      return item.id === currentSong.id;
    });
    props.setCurrentIndex(index);
  };

  const changeMode = () => {
    const currentMode = (mode + 1) % 3;
    props.setSequence(currentMode);

    let list = null;

    if (currentMode === playMode.random) {
      list = shuffle(sequenceList);
    } else {
      list = sequenceList;
    }
    resetCurrentIndex(list);
    props.setPlayList(list);
  };

  const handleLyric = ({ lineNum, txt }) => {
    setCurrentLineNum(lineNum);

    let lyricLines = document.getElementsByClassName("lyricLine");

    if (lineNum > 5) {
      let lineEl = lyricLines[lineNum - 5];
      lyricList.current.scrollToElement(lineEl, 1000);
    } else {
      lyricList.current.scrollTo(0, 0, 1000);
    }

    setPlayingLyric(txt);
  };

  const getLyric = () => {
    currentSong
      .getLyric()
      .then((res) => {
        const lyric = new Lyric(res, handleLyric);
        setCurrentLyric(lyric); // useState是异步的
        if (playing) {
          // currentLyric.lines&&currentLyric.play()  useState是异步的，set了之后不会立马拿到最新值
          lyric.lines && lyric.play(); // 能把播放到当前歌曲的歌词反应出来
        }
      })
      .catch(() => {
        setCurrentLyric(null);
        setPlayingLyric("");
        setCurrentLineNum(0);
      });
  };

  const middleTouchStart = (e) => {
    e.stopPropagation();
    touchFinger.initiated = true;
    const touch = e.touches[0];
    touchFinger.startX = touch.pageX;
    touchFinger.startY = touch.pageY;
  };
  const middleTouchMove = (e) => {
    e.stopPropagation();
    if (!touchFinger.initiated) return;
    const touch = e.touches[0];
    const delatX = touch.pageX - touchFinger.startX;
    const delatY = touch.pageY - touchFinger.startY;

    if (Math.abs(delatY) > Math.abs(delatX)) {
      return;
    }

    const left = currentShow === "cd" ? 0 : -window.innerWidth;

    // console.log(left)
    // console.log(delatX)

    // 分为两种情况，1.向左滑，距离就是delatX，此时delatX是负值。2.向右滑，距离就是innerWidth+delatX，此时delatX是正值
    const offsetWidth = Math.min(
      0,
      Math.max(-window.innerWidth, left + delatX)
    );

    touchFinger.percent = Math.abs(offsetWidth / window.innerWidth);

    // 设置歌词位移
    lyricList.current.getElement().style[
      transform
    ] = `translate3d(${offsetWidth}px,0,0)`;

    // 设置缓动效果
    lyricList.current.getElement().style[transitionDuration] = `0`;

    // 设置cd背景透明度
    document.getElementsByClassName("middleL")[0].style.opacity =
      1 - touchFinger.percent;
    document.getElementsByClassName("middleL")[0].style[
      transitionDuration
    ] = `0`;
  };
  const middleTouchEnd = (e) => {
    e.stopPropagation();

    let offsetWidth;
    let opacity;

    // 从左向右和从右向左 参照距离都是滑动距离超过10%就作出改变
    // 从右向左滑
    if (currentShow === "cd") {
      if (touchFinger.percent > 0.1) {
        offsetWidth = -window.innerWidth;
        opacity = 0;
        setCurrentShow("lyric");
      } else {
        offsetWidth = 0;
        opacity = 1;
      }
      lyricList.current.refresh();
    }
    // 从左向右滑
    else {
      if (touchFinger.percent > 0.1) {
        offsetWidth = -window.innerWidth;
        opacity = 0;
      } else {
        opacity = 1;
        offsetWidth = 0;
        setCurrentShow("cd");
      }
    }
    lyricList.current.getElement().style[
      transform
    ] = `translate3d(${offsetWidth}px,0,0)`;

    lyricList.current.getElement().style[transitionDuration] = `300ms`;

    // 设置cd背景透明度
    document.getElementsByClassName("middleL")[0].style.opacity = opacity;
    document.getElementsByClassName("middleL")[0].style[
      transitionDuration
    ] = `300ms`;
  };

  const showPlayList = (e) => {
    e.stopPropagation();
    setShowPlayListFlag(true);
  };

  const close = ()=>{
    setTimeout(()=>{
      setShowPlayListFlag(false);
    },300)
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
    songReady = true;
    fullScreen ? setPlayNumber(1) : setPlayNumber(0);
  }, [fullScreen]);

  useEffect(() => {
    if (currentLyric) {
      currentLyric.stop();
    }
    setTimeout(() => {
      audio.current && audio.current.play().catch((error) => {});
      currentSong.id && getLyric();
    }, 1000);
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
          timeout={300}
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
            <div
              className="middle"
              onTouchStart={middleTouchStart}
              onTouchMove={middleTouchMove}
              onTouchEnd={middleTouchEnd}
            >
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
                <div className="playingLyricWrapper">
                  <div className="playingLyric">{playingLyric}</div>
                </div>
              </div>
              {currentLyric && (
                <Scroll
                  classVal={"middle-r"}
                  customMade={"lyric"}
                  data={currentLyric ? currentLyric.lines : []}
                  ref={lyricList}
                >
                  <div className="lyric-wrapper">
                    {currentLyric && currentLyric.lines && (
                      <div>
                        {currentLyric.lines.map((item, index) => {
                          return (
                            <p
                              key={index}
                              className={`lyricLine text ${
                                currentLineNum === index ? "current" : ""
                              }`}
                            >
                              {item.txt}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Scroll>
              )}
            </div>
            <div className="bottom">
              <div className="dot-wrapper">
                <div
                  className={`dot ${currentShow === "cd" ? "active" : ""}`}
                ></div>
                <div
                  className={`dot ${currentShow === "lyric" ? "active" : ""}`}
                ></div>
              </div>
              <div className="progress-wrapper">
                <span className="time time-l">{currentTime}</span>
                <div className="progress-bar-wrapper">
                  <ProgressBar
                    percent={percent}
                    percentChange={onPercentChange}
                  />
                </div>
                <div className="time time-r">
                  {formatTime(currentSong.duration)}
                </div>
              </div>
              <div className="operators">
                <div className="icon iLeft" onClick={changeMode}>
                  <i className={_playMode()}></i>
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
              <div className="control" onClick={showPlayList}>
                <i className="iconPlaylist icon-playlist"></i>
              </div>
            </div>
          </CSSTransition>
          {showPlayListFlag && <PlayList close={close} showPlayListFlag={showPlayListFlag} />}
        </div>
      </div>
      
      <audio
        ref={audio}
        src={currentSong.url}
        onCanPlay={canPlay}
        onError={error}
        onTimeUpdate={timeUpdate}
        onEnded={end}
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
  mode: state.playerReducer.mode,
  sequenceList: state.playerReducer.sequenceList,
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
    setSequence(mode) {
      dispatch(actionCreators.setSequence(mode));
    },
    setPlayList(list) {
      dispatch(actionCreators.setPlayList(list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
