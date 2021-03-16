import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swiper from "swiper";

import Slider from "@/common/component/slider";
import * as actionCreators from "./store/actionCreators";
import "./index.less";

const Recommend = (props) => {
  const { slider, discList } = props;

  const listRef = useRef(false);

  const cacheStore = (arr) => {
    if (arr.length) {
      return true;
    }
    return false;
  };

  const initSwiper = () => {
    new Swiper(".swiper-wrap", {
      scrollbar: ".swiper-scrollbar",
      direction: "vertical",
      slidesPerView: "auto",
      mousewheelControl: true,
      freeMode: true,
      roundLengths: true, //防止文字模糊
    });
  };

  const calcClient = ()=>{
    const clientHeight = document.body.clientHeight;
    const targetElement = document.getElementsByClassName("swiper-wrap");
    
    targetElement[0].style.height = (clientHeight-88)+"px";

  }

  useEffect(() => {
    !cacheStore(slider) && props.getRecommendList();
    !cacheStore(discList) && props.getDiscList();
  }, []);

  useEffect(() => {
    calcClient();
    discList.length && initSwiper();
  }, [discList.length]);

  return (
    <div className="swiper-wrap">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="recommend">
            <Slider slider={slider} />
            <div className="recommendList">
              <h1 className="listTitle">热门歌单推荐</h1>
              <ul>
                {discList &&
                  discList.map((item) => {
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
        </div>
      </div>
      <div className="swiper-scrollbar"></div>
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
      dispatch(actionCreators.getRecommendList());
    },
    getDiscList() {
      dispatch(actionCreators.getDiscList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
