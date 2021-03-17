import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

const Scroll = (props) => {
  const [scroll, setScroll] = useState(null);

  const wrapperRef = useRef(null);

  const _initScroll = () => {
    if (!wrapperRef.current) return;
    const sc = new BScroll(wrapperRef.current, {
      probeType: props.probeType,
      click: props.click,
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

  useEffect(() => {
    refresh();
  }, [props.data]);

  return <div ref={wrapperRef}>{props.children}</div>;
};

Scroll.defaultProps = {
  propType: 1,
  click: true,
  data: null,
};

Scroll.propTypes = {
  propType: PropTypes.Number,
  click: PropTypes.Boolean,
  data: PropTypes.Array,
};

export default Scroll;
