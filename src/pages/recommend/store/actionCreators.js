import * as contants from "./actionTypes";
import * as RecommendServices from "@/services/recommend";

export const getRecommendList = (dispatch) => {
  
  const res = RecommendServices.getRecommend();  

  dispatch({
    type: contants.GET_RECOMMEND_LIST,
    payload: {},
  });
};
