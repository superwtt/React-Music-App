import * as constants from "./actionTypes";

const defaultState = {
  slider:[],
  discList:[]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_RECOMMEND_LIST:
      return {...state,slider:action.value};
    case constants.GET_DISC_LIST:
      return {...state,discList:action.value};
    default:
      return state;
  }
};
