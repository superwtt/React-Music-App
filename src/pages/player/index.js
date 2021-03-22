import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";

import {prefixStyle} from "@/common/js/dom"
import * as actionCreators from "../player/store/actionCreators";

import "./index.styl";

const transform = prefixStyle('transform');

const Player = (props) => {


  const [playNumber, setPlayNumber] = useState(0);
  const { fullScreen, playList, currentSong } = props;

  const back = () => {
    props.setFullScreen(false);
  };

  const open = () => {
    props.setFullScreen(true);
  };


  // CSS3的方式写js动画
  const enter = (el,done)=>{

    console.log(el)
    console.log(done)
    const {x,y,scale} = _getPosAndScale();
    let animation = {
      0:{
        transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60:{
        transform:`translate3d(0,0,0) scale(1.1)`
      },
      100:{
        transform:`translate3d(0,0,0) scale(1)`
      },
    }
    animations.registerAnimation({
      name:'move',
      animation,
      presets:{
        duration:400,
        easing:'linear'
      }
    })
    animations.runAnimation(document.getElementsByClassName('cdWrapper')[0],'move',done)

    document.getElementsByClassName("normalPlayer")[0].style.display="block";
  }

  const afterEnter = ()=>{
    animations.unregisterAnimation('move');
    document.getElementsByClassName('cdWrapper')[0].style.animation = ''
  }

  const exit = (el,done)=>{

    console.log("ddd")
    console.log(el)
    console.log(done)

    const {x,y,scale} = _getPosAndScale();
    const cdWrapper = document.getElementsByClassName('cdWrapper')[0];

    cdWrapper.style.transition ='all 0.4s';
    
    cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    cdWrapper.addEventListener('transitionend',done)
  }

  const afterExit = ()=>{
    const cdWrapper = document.getElementsByClassName('cdWrapper')[0];
    cdWrapper.style.transition = ''
    cdWrapper.style[transform] = ''
    // setTimeout(()=>{
      document.getElementsByClassName("normalPlayer")[0].style.display="none";
    // },30000)
  }

  const _getPosAndScale = ()=>{
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth*0.8; // 大唱片的宽度
    const scale = targetWidth / width;
    const x = -(window.innerWidth/2-paddingLeft);  // 唱片一开始 x方向上的位置
    const y = (window.innerHeight-paddingTop-paddingBottom-width/2); // 唱片一开始 y方向上的位置

    return {
      x,
      y,
      scale
    }
  }

  useEffect(()=>{
    fullScreen ? setPlayNumber(1) : setPlayNumber(0);
  },[fullScreen])

  return (
    <>
      {playList.length > 0 && (
        <div className="player">
            <CSSTransition
              in={playNumber ? true : false}
              timeout={400}
              classNames="normal"
              onEnter={enter}
              onEntered={afterEnter}
              onExit={exit}
              onExited={afterExit}
            >
              <div className="normalPlayer" >
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
            <div style={{display:(fullScreen?"none":"block")}} >
            <CSSTransition
              in={playNumber ? false : true}
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
            </div>
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