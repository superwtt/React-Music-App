import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import TopList from "../topList";
import Loading from "@/common/component/loading";
import Scroll from "@/common/component/scroll";
import * as actionCreators from "../recommend/store/actionCreators";
import { getTopList } from "@/services/rank";
import { ERR_OK } from "@/services/config";
import "./index.less";

const Rank = (props) => {
  const [topListArray, setTopListArray] = useState([]);
  const [showTopList, setShowTopList] = useState(false);

  const listViewRef = useRef(null);

  const { playList } = props;

  const _getTopList = () => {
    getTopList().then((res) => {
      if (res.code === ERR_OK) {
        setTopListArray(res.data.topList);
      }
    });
  };

  const selectItem = (item) => {
    setShowTopList(true);
    props.setTopList(item);
  };

  const hide = () => {
    setTimeout(() => {
      setShowTopList(false);
    }, 300);
  };

  const handlePlaylist = (playList)=>{
    if(!playList) return
    const bottom = playList.length > 0 ? '60px' : '0'
    document.getElementsByClassName("ranks")[0].style.bottom = bottom
    listViewRef.current.refresh()
  }

  useEffect(() => {
    _getTopList();
    handlePlaylist(playList)
  }, []);

  useEffect(()=>{
    handlePlaylist(playList);
  },[playList])

  return (
    <div className="ranks">
      <Scroll ref={listViewRef} classVal={"toplist"} data={topListArray}>
        <ul>
          {topListArray.map((item, index) => {
            return (
              <li
                className="item"
                key={index}
                onClick={() => {
                  selectItem(item);
                }}
              >
                <div className="icon">
                  <img width="100" height="100" src={item.picUrl} alt="" />
                </div>
                <ul className="songlist">
                  {item.songList.map((song, idx) => {
                    return (
                      <li className="song" key={idx}>
                        <span>{idx + 1}</span>
                        <span>
                          {song.songname}-{song.singername}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        {topListArray.length <= 0 && (
          <div className="loading-container">
            <Loading />
          </div>
        )}
      </Scroll>

      {showTopList && (
        <TopList rank={true} showTopList={showTopList} hide={hide} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  topList: state.recommendReducer.topList,
  playList:state.playerReducer.playList
});

const mapDispatchToProps = (dispatch) => {
  return {
    setTopList(topList) {
      dispatch(actionCreators.setTopList(topList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
