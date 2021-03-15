import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Slider from "@/common/component/slider";
import * as actionCreators from "./store/actionCreators";
import "./index.less";

const Recommend = (props) => {

  const { slider,discList } = props;

  console.log(slider)

  useEffect(() => {
    props.getRecommendList();
    props.getDiscList();
  }, []);


  return (
    <div className="recommend">
      <Slider slider={slider} />
      <div className="recommendList">
        <h1 className="listTitle">热门歌单推荐</h1>
        <ul>
          {discList&&discList.map((item) => {
            return (
              <li className="item" key={item.dissid}>
                <div className="icon">
                  <img
                    width="60"
                    height="60"
                    src={item.imgurl}
                    alt=""
                  />
                </div>
                <div className="text">
                  <h2 className="name">{item.creator.name}</h2>
                  <p className="desc">{item.dissname}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// state是状态树
const mapStateToProps = (state) => ({
  slider: state.recommendReducer.slider,
  discList: state.recommendReducer.discList
});

// dispatch(action) 方法更新state
const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendList() {
      dispatch(actionCreators.getRecommendList());
    },
    getDiscList() {
      dispatch(actionCreators.getDiscList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
