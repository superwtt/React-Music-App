import React from "react";
import Slider from "@/common/component/slider";

import './index.less';

const Recommend = () => {
  return (
    <div>
      <Slider />
      <div className="recommendList">
        <h1 className="listTitle">热门歌单推荐</h1>
        <ul>
          <li className="item">
            <div className="icon">
              <img width="60" height="60" src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/3687967.jpg" />
            </div>
            <div className="text">
              <h2 className="name"></h2>
              <p className="desc"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Recommend;
