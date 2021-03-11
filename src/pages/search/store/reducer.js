import * as constants from "./actionTypes";

const defaultState = {
  test:"123"
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_SEARCH:
      return state.set("toHome", true);
    default:
      return state;
  }
};
