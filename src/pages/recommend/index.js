import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Slider from "@/common/component/slider";

import * as actionCreators from './store/actionCreators'

import "./index.less";

const Recommend = (props) => {
  const getRecommendList = () => {};

  useEffect(() => {}, []);

  return (
    <div className="recommend">
      <Slider />
      <div className="recommendList">
        <h1 className="listTitle">热门歌单推荐</h1>
        <ul>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img
                width="60"
                height="60"
                src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"
                alt=""
              />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

// state是状态树
const mapStateToProps = (state) => ({
  CompanyName: state.CompanyName,
});

// dispatch(action) 方法更新state
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
