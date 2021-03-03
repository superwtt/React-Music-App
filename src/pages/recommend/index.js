import React from "react";
import Slider from "@/common/component/slider";
import Scroll from '@/common/component/scroll';

import './index.less';

const Recommend = () => {
  return (
<div className="recommend" ref="recommend">
    <Scroll className="recommendContent">
    <div className="sliderWrapper">
      <Slider />
    </div>
      
      <div className="recommendList">
        <h1 className="listTitle">热门歌单推荐</h1>
        <ul>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1"  alt=""/>
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://qpic.y.qq.com/music_cover/JKNRKMiciaU6Su0ibZV93emzptlPMwSbiaksya7Ck7lcAvtk4QPR2YtSQw/300?n=1" alt="" />
            </div>
            <div className="text">
              <h2 className="name">孟冬</h2>
              <p className="desc">温柔公子张真源，磁性嗓音诱你</p>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    </div>
  );
};

export default Recommend;
