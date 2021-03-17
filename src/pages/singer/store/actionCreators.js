import * as constants from "./actionTypes";
import * as SingerService from "@/services/singer";
import { ERR_OK } from "@/services/config";

export const getSingerList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      SingerService.getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          dispatch({
            type: constants.GET_SINGER_LIST,
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
