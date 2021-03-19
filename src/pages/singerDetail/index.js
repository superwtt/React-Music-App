import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import MusicList from '../musicList';
import { getSingerDetail } from "@/services/singer";
import { createSong, isValidMusic, processSongsUrl } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import "./index.less";

const SingerDetail = (props) => {
  const [number, setNumber] = useState(0);
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [bgImage, setBgImage] = useState('');

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
    console.log(props.singer)
    setNumber(1);
    getSingerDetail(props.singer.id).then((res) => {
      if (res.code === ERR_OK) {
        processSongsUrl(_normalizeSongs(res.data.list)).then((songs) => {
          setSongs(songs);
        });
      }
    });
  }, []);

  return (
    <TransitionGroup>
      <CSSTransition key={number} timeout={500} classNames="app2">
        <MusicList songs={songs} bgImage={props.singer.avatar} title={props.singer.name} />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SingerDetail;
