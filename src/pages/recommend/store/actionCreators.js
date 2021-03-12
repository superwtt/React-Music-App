import * as constants from "./actionTypes";
import * as RecommendServices from "@/services/recommend";
import { ERR_OK } from '@/services/config';


export const getRecommendList = () => {
  return (dispatch) => {
    RecommendServices.getRecommend().then((res) => {
      if(res.code===ERR_OK){
        dispatch({
          type: constants.GET_RECOMMEND_LIST,
          value: res.data.slider,
        });
      }
    });
  };
};
