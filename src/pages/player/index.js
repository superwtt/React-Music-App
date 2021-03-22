import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import * as actionCreators from "../player/store/actionCreators";

import "./index.styl";

const Player = (props) => {


  const [playNumber, setPlayNumber] = useState(0);
  const { fullScreen, playList, currentSong } = props;

  const back = () => {
    props.setFullScreen(false);
  };

  const open = () => {
    props.setFullScreen(true);
  };

  useEffect(()=>{
    fullScreen ? setPlayNumber(1) : setPlayNumber(0);
  },[fullScreen])

  return (
    <>
      {playList.length > 0 && (
        <div className="player">
          {/* {fullScreen && ( */}
            <CSSTransition
              in={playNumber ? true : false}
              timeout={400}
              classNames="normal"
            >
              <div className="normalPlayer">
                <div className="background">
                  <img
                    width="100%"
                    height="100%"
                    src={currentSong.image}
                    alt=""
                  />
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
                      <div className="cd">
                        <img className="image" src={currentSong.image} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="operators">
                    <div className="icon iLeft">
                      <i className="icon-sequence"></i>
                    </div>
                    <div className="icon iLeft">
                      <i className="icon-prev"></i>
                    </div>
                    <div className="icon iCenter">
                      <i className="icon-play"></i>
                    </div>
                    <div className="icon iRight">
                      <i className="icon-next"></i>
                    </div>
                    <div className="icon iRight">
                      <i className="icon icon-not-favorite"></i>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          {/* )} */}
          {!fullScreen && (
            <CSSTransition
              in={fullScreen ? true : false}
              timeout={300}
              classNames="mini"
            >
              <div className="miniPlayer" onClick={open}>
                <div className="icon">
                  <img width="40" height="40" src={currentSong.image} alt="" />
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
                  <i className="iconPlaylist icon-playlist"></i>
                </div>
              </div>
            </CSSTransition>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  fullScreen: state.playerReducer.fullScreen,
  playList: state.playerReducer.playList,
  currentSong: state.playerReducer.currentSong,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFullScreen(flag) {
      dispatch(actionCreators.setFullScreen(flag));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
