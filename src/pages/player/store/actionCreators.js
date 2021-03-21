import * as constants from "./actionTypes";

export const selectPlay = () => {
  debugger
  return function (dispatch, { songs, index }) {
    console.log(arguments)
    console.log(dispatch);
    console.log(songs);

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
  };
};
