import * as constants from "./actionTypes";

export const selectPlay = ({ songs, index }) => {
  return function (dispatch) {
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: true,
    });
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: true,
    });
    dispatch({
      type: constants.SET_PLAYLIST,
      value: songs,
    });
    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: songs,
    });
    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: index,
    });
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: index,
    });
  };
};

export const setFullScreen = (flag)=>{
  return (dispatch)=>{
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: flag,
    });
  }
}

export const setPlayingState = (flag)=>{
  return (dispatch)=>{
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: flag,
    });
  }
}

export const setCurrentIndex = (index)=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_CURRENT_INDEX,
      value:index
    })
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: index,
    });
  }
}

export const setSequence = mode=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_PLAY_MODE,
      value:mode
    })
  }
}
