import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

const Scroll = (props) => {
  const [scroll, setScroll] = useState(null);

  const wrapperRef = useRef(null);

  const _initScroll = () => {
    if (!wrapperRef.current) return;
    const sc = new BScroll(wrapperRef.current, {
      probeType: 1,
      click: true,
    });
    setScroll(sc);
  };

  const enable = () => {
    scroll && scroll.enable();
  };
  const disable = () => {
    scroll && scroll.disable();
  };
  const refresh = () => {
    scroll && scroll.refresh();
  };

  useEffect(() => {
    setTimeout(() => {
      _initScroll();
    }, 20);
  }, 20);

  // disclist列表请求到数据的时候，bscroll的高度已经计算到了，所以高度不对，需要重新渲染一下
  useEffect(() => {
    refresh();
  }, [props.data.length]);

  useEffect(() => {
    refresh();
  }, [props.slider&&props.slider.length]);

  return <div className="recommendContent" ref={wrapperRef}>{props.children}</div>;
};

Scroll.defaultProps = {
  propType: 1,
  click: true,
  data: null,
};

Scroll.propTypes = {
  propType: PropTypes.number,
  click: PropTypes.bool,
  data: PropTypes.array,
};

export default Scroll;
