import * as constants from "./actionTypes";

const defaultState = {
  CompanyName: "123321",
  UserName: "",
  UserPass: "",
  loginType: "Company",
  toHome: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_RECOMMEND_LIST:
      return state.set("toHome", true);
    default:
      return state;
  }
};