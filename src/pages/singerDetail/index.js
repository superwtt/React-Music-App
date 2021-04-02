import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import MusicList from "../musicList";
import { getSingerDetail } from "@/services/singer";
import { createSong, isValidMusic, processSongsUrl } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import "./index.less";

const SingerDetail = (props) => {
  const [number, setNumber] = useState(0);
  const [songs, setSongs] = useState([]);

  const _normalizeSongs = (list) => {
    let ret = [];
    list.forEach((item) => {
      let { musicData } = item;
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData));
      }
    });
    return ret;
  };

  const back = () => {
    setNumber(0);
    props.hide();
  };

  useEffect(() => {
    const { showDetail } = props;
    showDetail ? setNumber(1) : setNumber(0);
    getSingerDetail(props.singer.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(_normalizeSongs(res.data.list)).then((songs) => {
          setSongs(songs);
        });
      }
    });
  }, []);

  return (
    // <TransitionGroup>
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <MusicList
        hide={back}
        songs={songs}
        bgImage={props.singer.avatar}
        title={props.singer.name}
      />
    </CSSTransition>
    // </TransitionGroup>
  );
};

export default SingerDetail;
