import React, { useState } from "react";
import { connect } from "react-redux";

import Scroll from "@/common/component/scroll";
import SongList from "@/common/component/songList";
import Song from "@/common/js/song";
import NoResult from "@/common/component/noResult";
import * as actionCreators from "@/pages/player/store/actionCreators";
import Switches from "@/common/component/switches";
import "./index.less";

const switches = [
  {
    name: "我喜欢的",
  },
  {
    name: "最近听的",
  },
];

const UserCenter = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    playHistory,
    currentIndex: currentSongIndex,
    playList,
    sequenceList,
    favoriteList,
  } = props;

  const selectIndex = (index) => {
    setCurrentIndex(index);
  };

  const selectItem = (song, index) => {
    props.insertSong(new Song(song), playList, sequenceList, currentSongIndex);
  };

  const back = () => {
    props.history.goBack();
  };

  const randomPlay = () => {
    let list = currentIndex === 0 ? favoriteList : playHistory;
    if(!list.length) return
    list = list.map((song) => {
      return new Song(song);
    });
    props.randomPlay(list);
  };

  const noResult = () => {
    if (currentIndex === 0) {
      return !favoriteList.length;
    }
    return !playHistory.length;
  };

  const noResultDesc = () => {
    if (currentIndex === 0) {
      return "暂无收藏歌曲";
    }
    return "你还没有听过歌曲";
  };

  return (
    <>
      <div className="user-center">
        <div className="back" onClick={back}>
          <i className="icon-back"></i>
        </div>
        <div className="switches-wrapper">
          <Switches
            switches={switches}
            currentIndex={currentIndex}
            selectIndex={selectIndex}
          />
        </div>
        <div className="play-btn" onClick={randomPlay}>
          <i className="icon-play"></i>
          <span className="text">随机播放全部</span>
        </div>
        <div className="lists-wrappers">
          {currentIndex === 0 && (
            <Scroll classVal={"list-scroll"} data={favoriteList}>
              <div className="list-inner">
                <SongList selectItem={selectItem} songs={favoriteList} />
              </div>
            </Scroll>
          )}
          {currentIndex === 1 && (
            <Scroll classVal={"list-scroll"} data={playHistory}>
              <div className="list-inner">
                <SongList selectItem={selectItem} songs={playHistory} />
              </div>
            </Scroll>
          )}
        </div>
        {noResult() && (
          <div className="no-result-wrapper">
            <NoResult title={noResultDesc()} />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  playHistory: state.playerReducer.playHistory,
  playList: state.playerReducer.playList,
  sequenceList: state.playerReducer.sequenceList,
  currentIndex: state.playerReducer.currentIndex,
  favoriteList: state.playerReducer.favoriteList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch(item) {
      dispatch(actionCreators.saveSearchHistory(item));
    },
    insertSong(song, playList, sequenceList, currentSongIndex) {
      dispatch(
        actionCreators.insertSong(
          song,
          playList,
          sequenceList,
          currentSongIndex
        )
      );
    },
    deleteSearchHistory(item) {
      dispatch(actionCreators.deleteSearchHistory(item));
    },
    randomPlay(list) {
      dispatch(actionCreators.randomPlay(list));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
