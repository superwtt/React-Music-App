import * as constants from "./actionTypes";

const defaultState = {
  singers: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_SINGER_LIST:
      return { ...state, slider: action.value };
    default:
      return state;
  }
};
