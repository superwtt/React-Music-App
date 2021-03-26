import * as constants from "./actionTypes";
import * as RecommendServices from "@/services/recommend";
import { ERR_OK } from "@/services/config";

export const getRecommendList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      RecommendServices.getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          dispatch({
            type: constants.GET_RECOMMEND_LIST,
            value: res.data.slider,
          });
          resolve(res);
          return;
        }
        reject();
      });
    });
  };
};

export const getDiscList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      RecommendServices.getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          dispatch({
            type: constants.GET_DISC_LIST,
            value: res.data.list,
          });
          resolve(res);
          return;
        }
        reject();
      });
    });
  };
};

export const setDisc = (disc)=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_DISC,
      value:disc
    })
  }
}
