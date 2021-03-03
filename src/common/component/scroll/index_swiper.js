import React, { useEffect } from "react";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

const Scroll = (props) => {

  const initScroll = () => {

    new Swiper(".swiper-bar", {
      scrollbar: ".swiper-scrollbar",
      direction: "vertical",
      slidesPerView: "auto",
      mousewheelControl: true,
      freeMode: true,
      roundLengths: true, //防止文字模糊
    });

  };

  useEffect(() => {
    initScroll();
  }, []);

  return (
    <div className="swiper-bar" style={{height:'100%'}}>
      <div className="swiper-wrapper">
        <div className="swiper-slide" >
          {
            props.children
          }
        </div>
      </div>
      <div className="swiper-scrollbar"></div>
    </div>
  );
};

export default Scroll;
