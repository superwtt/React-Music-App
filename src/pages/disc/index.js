import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import {createSong,processSongsUrl} from '@/common/js/song';
import {getSongList} from '@/services/recommend';
import {ERR_OK} from '@/services/config';
import MusicList from "../musicList";
import "./index.less";

const Disc = (props) => {
  const [number, setNumber] = useState(0);
  const [songs, setSongs] = useState([]);

  const { disc } = props;

  const back = () => {
    setNumber(0);
    props.hide();
  };

  const _normalizeSongs = (list)=>{
    let ret = [];
    list.forEach(musicData=>{
      if(musicData.songid&&musicData.albumid){
        ret.push(createSong(musicData))
      }
    })
    return ret
  }

  useEffect(() => {
    const { showDisc } = props;
    showDisc ? setNumber(1) : setNumber(0);

    getSongList(disc.dissid).then(res=>{      
      if (res.code === ERR_OK) {
        processSongsUrl(_normalizeSongs(res.cdlist[0].songlist)).then((songs) => {
          setSongs(songs);
        })
      }
    })

  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <MusicList
        hide={back}
        songs={[]}
        bgImage={disc.imgurl}
        title={disc.dissname}
        songs={songs}
      />
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
    disc: state.recommendReducer.disc,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Disc);
