import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { prefixStyle } from "@/common/js/dom";
import "./index.less";

const transform = prefixStyle("transform");
const progressBtnWidth = 16;
const touch = {}; // touch事件之间共享数据

const ProgressBar = (props) => {
  const { percent } = props;

  const progressBar = useRef(null);
  const progressBtn = useRef(null);


  const _offsetWidth = (offsetWidth)=>{
    document.getElementsByClassName(
        "progress"
      )[0].style.width = `${offsetWidth}px`;
      progressBtn.current.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
  }

  const _triggerPercent = ()=>{
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const per =  document.getElementsByClassName("progress")[0].clientWidth / barWidth  
    props.percentChange(per)
  }

  const progressTouchStart = (e)=>{
      e.stopPropagation()
      touch.initialed = true;
      touch.startX = e.touches[0].pageX
      touch.left = document.getElementsByClassName("progress")[0].clientWidth;
  }

  const progressTouchMove = (e)=>{
    e.stopPropagation()
    const deltaX = e.touches[0].pageX-touch.startX;
    const offsetWidth = Math.min(progressBar.current.clientWidth - progressBtnWidth, Math.max(0, touch.left + deltaX))
    _offsetWidth(offsetWidth);
  }

  const progressTouchEnd = (e)=>{
    e.stopPropagation ()
    touch.initialed = false;
    _triggerPercent();
  }

  const progressClick = (e)=>{
    // getBoundingClientRect方法返回元素的大小及其相对于视口的位置。  
    const rect = progressBar.current.getBoundingClientRect();  
    _offsetWidth(e.pageX-rect.left)
    _triggerPercent()
  }

  useEffect(() => {
    if (percent > 0&&!touch.initialed) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      _offsetWidth(offsetWidth)
    }
  }, [percent]);

  return (
    <div className="progress-bar" ref={progressBar} onClick={progressClick}>
      <div className="bar-inner">
        <div className="progress"></div>
        <div className="progress-btn-wrapper">
          <div className="progress-btn" ref={progressBtn}
             onTouchStart={progressTouchStart}
             onTouchMove={progressTouchMove}
             onTouchEnd={progressTouchEnd}
          ></div>
        </div>
      </div>
    </div>
  );
};

// 百分比
ProgressBar.defaultProps = {
  percent: 0,
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
};

export default ProgressBar;
