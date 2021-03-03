import React, { useEffect } from "react";
import BScroll from "better-scroll";

const Scroll = () => {
  const initScroll = () => {
    const wrapper = document.querySelector('wrapper');
    const scroll = new BScroll(wrapper,{
        scrollX: false,  //开启横向滚动
        click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
        scrollY: true, //关闭竖向滚动
    })
  };
  useEffect(() => {
    initScroll();
  }, []);

  return <div className="wrapper">scroll component</div>;
};

export default Scroll;
