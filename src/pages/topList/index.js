import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import { createSong,processSongsUrl } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import { getMusicList } from "@/services/rank";
import MusicList from "../musicList";
import "./index.less";


const TopList = (props) => {
  const [number, setNumber] = useState(0);
  const [songs, setSongs] = useState([]);

  const { topList,rank } = props;

  const back = () => {
    setNumber(0);
    props.hide();
  };

  const _normalizeSongs = (list) => {
    let ret = [];
    list.forEach((musicData) => {
      if (musicData.data.songid && musicData.data.albumid) {
        ret.push(createSong(musicData.data));
      }
    });
    return ret;
  };

  const _getMusicList = () => {
    getMusicList(topList.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(_normalizeSongs(res.songlist)).then(
          (song) => {
            setSongs(song);
          }
        );
      }
    });
  };

  useEffect(() => {
    const { showTopList } = props;
    showTopList ? setNumber(1) : setNumber(0);

    _getMusicList()
  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <MusicList
        rank={rank}
        hide={back}
        songs={[]}
        bgImage={songs[0]?songs[0].image:''}
        title={topList.topTitle}
        songs={songs}
      />
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  topList: state.recommendReducer.topList,
});

export default connect(mapStateToProps, null)(TopList);
