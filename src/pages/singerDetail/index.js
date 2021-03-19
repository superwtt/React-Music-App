import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { getSingerDetail } from "@/services/singer";
import { createSong, isValidMusic, processSongsUrl } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import "./index.less";

const SingerDetail = (props) => {
  const [number, setNumber] = useState(0);

  const _normalizeSongs = (list) => {
    let ret = [];
    list.forEach((item) => {
      let { musicData } = item;
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData));
      }
    });
    return ret
  };

  useEffect(() => {
    setNumber(1);
    getSingerDetail(props.singer.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(_normalizeSongs(res.data.list)).then((songs) => {
          console.log(songs)
        });
      }
    });
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition key={number} timeout={10000} classNames="app2">
        <div className="singerDetail">1</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SingerDetail;
