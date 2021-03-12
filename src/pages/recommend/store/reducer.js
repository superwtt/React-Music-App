import * as constants from "./actionTypes";

const defaultState = {
  slider:[]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_RECOMMEND_LIST:
      return {...state,slider:action.value};
    default:
      return state;
  }
};
