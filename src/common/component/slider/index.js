import React, { useEffect } from "react";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

import "./index.less";

const Slider = (props) => {
  const { slider } = props;

  useEffect(() => {
    slider.length &&
      new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
      });
  }, [slider]);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {slider.map((item) => {
          return (
            <div className="swiper-slide" key={item.id}>
              <a href={item.linkUrl}>
                <img src={item.picUrl} alt="" />
              </a>
            </div>
          );
        })}
      </div>
      {/* 分页器结构 */}
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Slider;
