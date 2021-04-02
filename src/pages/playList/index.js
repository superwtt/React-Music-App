import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import Confirm from "@/common/component/confirm";
import Scroll from "@/common/component/scroll";
import { playMode } from "@/common/js/config";
import * as actionCreators from "../player/store/actionCreators";
import "./index.less";

const PlayList = (props) => {
  const [playNumber, setPlayNumber] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const listContent = useRef(null);

  const {
    showPlayListFlag,
    currentSong,
    sequenceList,
    mode,
    playList,
    currentIndex,
  } = props;

  const closeList = () => {
    setPlayNumber(0);
    props.close();
  };

  const getCurrentIcon = (item) => {
    if (currentSong.id === item.id) {
      return "icon-play";
    }
    return "";
  };

  const selectItem = (item, index) => {
    if (mode === playMode.random) {
      index = playList.findIndex((song) => {
        return song.id === item.id;
      });
    }
    props.setCurrentIndex(index);
    props.setPlayingState(true);
  };

  const scrollToCurrent = (current) => {
    const listItem = document.getElementsByClassName("item")[0];
    const index = sequenceList.findIndex((song) => {
      return current.id === song.id;
    });
    listContent.current &&
      listContent.current.scrollToElement(listItem[index], 300);
  };

  const deleteOne = (e, item) => {
    e.stopPropagation();
    props.deleteSong(item, playList, sequenceList, currentIndex);
  };

  const clear = (e)=>{
     e.stopPropagation(); 
     setShowConfirm(true);
  };

  const confirm = () => {
    props.deleteSongList();
  };

  const cancel = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    showPlayListFlag ? setPlayNumber(1) : setPlayNumber(0);
  }, [showPlayListFlag]);

  //   useEffect(()=>{
  //     scrollToCurrent(currentSong)
  //   },[currentSong])

  return (
    <CSSTransition
      in={playNumber ? true : false}
      timeout={10000}
      classNames="list-fade"
    >
      <div className="playlist" onClick={closeList}>
        <div className="list-wrapper">
          <div className="list-header">
            <h1 className="title">
              <i className="icon"></i>
              <span className="text"></span>
              <span className="clear" onClick={clear}>
                <i className="icon-clear"></i>
              </span>
            </h1>
          </div>
          <Scroll
            ref={listContent}
            classVal={"list-content"}
            data={sequenceList}
          >
            <ul>
              {sequenceList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="item"
                    onClick={() => selectItem(item, index)}
                  >
                    <i className={`current ${getCurrentIcon(item)}`}></i>
                    <span className="text">{item.name}</span>
                    <span className="like">
                      <i className="icon-not-favorite"></i>
                    </span>
                    <span className="delete" onClick={(e) => deleteOne(e,item)}>
                      <i className="icon-delete"></i>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Scroll>
          <div className="list-operate">
            <div className="add">
              <i className="icon-add"></i>
              <span className="text">添加歌曲到队列</span>
            </div>
          </div>
          <div onClick={closeList} className="list-close">
            <span>关闭</span>
          </div>
        </div>
        {showConfirm && (
        <Confirm showConfirm={showConfirm} confirm={confirm} cancel={cancel} />
      )}
        
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  mode: state.playerReducer.mode,
  sequenceList: state.playerReducer.sequenceList,
  currentSong: state.playerReducer.currentSong,
  playList: state.playerReducer.playList,
  currentIndex: state.playerReducer.currentIndex,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentIndex(index) {
      dispatch(actionCreators.setCurrentIndex(index));
    },
    setPlayingState(flag) {
      dispatch(actionCreators.setPlayingState(flag));
    },
    deleteSong(item, playList, sequenceList, currentIndex) {
      dispatch(
        actionCreators.deleteSong(item, playList, sequenceList, currentIndex)
      );
    },
    deleteSongList(){
      dispatch(actionCreators.deleteSongList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
