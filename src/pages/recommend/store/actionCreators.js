import * as constants from "./actionTypes";
import * as RecommendServices from "@/services/recommend";
import { ERR_OK } from "@/services/config";

export const getRecommendList = () => {
  return (dispatch) => {
    RecommendServices.getRecommend().then((res) => {
      if (res.code === ERR_OK) {
        dispatch({
          type: constants.GET_RECOMMEND_LIST,
          value: res.data.slider,
        });
      }
    });
  };
};

export const getDiscList = () => {
  return (dispatch) => {
    RecommendServices.getDiscList().then((res) => {
      if (res.code === ERR_OK) {
        dispatch({
          type: constants.GET_DISC_LIST,
          value: res.data.list,
        });
      }
    });
  };
};
