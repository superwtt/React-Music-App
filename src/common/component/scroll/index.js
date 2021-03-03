import React, { useEffect } from "react";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

const Scroll = (props) => {
  const initScroll = () => {
    new Swiper(".swiper-container", {
      autoplay: 3000,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  };

  useEffect(() => {
    initScroll();
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <a href="https://y.qq.com/n/yqq/album/002eRxDu1K81BZ.html">
            <img
              src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/3687967.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="swiper-slide">
          <a href="https://y.qq.com/n/yqq/album/002GYPMQ1Rkiqu.html">
            <img
              src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/3677737.jpg"
              alt=""
            />
          </a>
        </div>
        <div className="swiper-slide">
          <a href="https://y.qq.com/n/yqq/album/001MTYcg233Pra.html">
            <img
              src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/3691242.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
      {/* 分页器结构 */}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Scroll;
