import * as contants from "./actionTypes";

export const getRecommendList = (dispatch) => {
  dispatch({
    type: contants.GET_RECOMMEND_LIST,
    payload: {},
  });
};
