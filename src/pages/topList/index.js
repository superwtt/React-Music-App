import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {connect} from "react-redux";

import MusicList from "../musicList";
import "./index.less";

const TopList = (props) => {
  const [number, setNumber] = useState(0);
  const [songs, setSongs] = useState([]);

  const { topList } = props;

  const back = () => {
    setNumber(0);
    props.hide();
  };

  useEffect(() => {
    const { showTopList } = props;
    showTopList ? setNumber(1) : setNumber(0);
    
  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="app2">
      <MusicList
        hide={back}
        songs={[]}
        bgImage={topList.picUrl}
        title={topList.topTitle}
        songs={songs}
      />
    </CSSTransition>
  );
};

const mapStateToProps = state=>({
  topList:state.recommendReducer.topList
})

export default connect(mapStateToProps,null)(TopList);
