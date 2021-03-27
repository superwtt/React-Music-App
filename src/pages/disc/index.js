import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import {getSongList} from '@/services/recommend';
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

  useEffect(() => {
    const { showDisc } = props;
    showDisc ? setNumber(1) : setNumber(0);

    getSongList(disc.dissid).then(res=>{
      console.log(res)
    })

  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <MusicList
        hide={back}
        songs={[]}
        bgImage={disc.imgurl}
        title={disc.dissname}
      />
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
    disc: state.recommendReducer.disc,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Disc);
