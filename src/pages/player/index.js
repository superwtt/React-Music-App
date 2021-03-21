import React from "react";
import { connect } from "react-redux";

import "./index.styl";

const Player = (props) => {

  const {fullScreen,playList} = props;  

  return (
    <>
      {playList.length > 0 && (
        <div className="player">
          {
             fullScreen&&<div className="normalPlayer">播放器</div>
          }
          {
             !fullScreen&&<div className="miniPlayer"></div>
          }
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
    fullScreen: state.playerReducer.fullScreen,
    playList: state.playerReducer.playList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
