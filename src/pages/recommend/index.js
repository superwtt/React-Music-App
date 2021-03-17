import React, { useEffect,useRef } from "react";
import { connect } from "react-redux";

import Scroll from "@/common/component/scroll";
import Slider from "@/common/component/slider";
import * as actionCreators from "./store/actionCreators";
import "./index.less";

const Recommend = (props) => {

  const scroll = useRef(null);

  const { slider, discList } = props;

  const cacheStore = (arr) => {
    if (arr.length) {
      return true;
    }
    return false;
  };

  const initData = () => {
    if (cacheStore(slider) || cacheStore(discList)) return;

    const p1 = props.getRecommendList();
    const p2 = props.getDiscList();

    Promise.all([p1, p2])
      .then(function (posts) {
        
      })
      .catch(function (reason) {
        console.log(reason);
      });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="recommend">
      <Scroll slider={slider} data={discList}>
        <div>
          <Slider slider={slider} />
          <div className="recommendList">
            <h1 className="listTitle">热门歌单推荐</h1>
            <ul>
              {discList &&
                discList.map((item) => {
                  return (
                    <li className="item" key={item.dissid}>
                      <div className="icon">
                        <img width="60" height="60" src={item.imgurl} alt="" />
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
      </Scroll>
    </div>
  );
};

// state是状态树
const mapStateToProps = (state) => ({
  slider: state.recommendReducer.slider,
  discList: state.recommendReducer.discList,
});

// dispatch(action) 方法更新state
const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendList() {
      return dispatch(actionCreators.getRecommendList());
    },
    getDiscList() {
      return dispatch(actionCreators.getDiscList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
