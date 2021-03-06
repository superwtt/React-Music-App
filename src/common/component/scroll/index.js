import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import useDeepCompareEffect from "use-deep-compare-effect";

import "./index.less";

let scroll = null;

const Scroll = forwardRef((props, ref) => {
  const wrapperRef = useRef(null);

  const bindScroll = () => {
    if (props.listenScroll) {
      scroll &&
        scroll.on("scroll", (pos) => {
          props.scroll(pos);
        });
    }
  };

  const pullup = () => {
    if (props.pullup) {
      scroll.on("scrollEnd", () => {
        if (scroll.y <= scroll.maxScrollY + 50) {
          props.scrollToEnd();
        }
      });
    }
  };

  const beforeScroll = () => {
    if (props.beforeScroll) {
      scroll.on("beforeScrollStart", () => {
        // console.log("beforeScrollStart")
      });
    }
  };

  const _initScroll = () => {
    if (!wrapperRef.current) return;
    console.log("进来初始化了")
    console.log(wrapperRef)

    const sc = new BScroll(wrapperRef.current, {
      probeType: props.probeType,
      click: props.click,
    });
    scroll = sc;
    // console.log(scroll)
    bindScroll();

    pullup(); // 滚动到底部的事件

    beforeScroll(); // 滚动开始之前收起键盘
  };

  const enable = () => {
    scroll && scroll.enable();
  };
  const disable = () => {
    scroll && scroll.disable();
  };
  const refresh = () => {
    console.log("进来刷新了")
    console.log(scroll)
    scroll && scroll.refresh();
    // bindScroll();
  };
  const scrollTo = function () {
    scroll && scroll.scrollTo.apply(scroll, arguments);
  };
  const scrollToElement = function () {
    scroll && scroll.scrollToElement.apply(scroll, arguments);
  };

  const getElement = () => {
    return wrapperRef.current;
  };

  useImperativeHandle(ref, () => ({
    enable,
    disable,
    refresh,
    scrollTo,
    scrollToElement,
    getElement,
  }));

  useEffect(() => {
    setTimeout(() => {
      _initScroll();
    }, props.refreshDelay);
  }, []);

  // disclist列表请求到数据的时候，bscroll的高度已经计算到了，所以高度不对，需要重新渲染一下
  useEffect(() => {
    refresh();
    // console.log("刷新")
    // console.log(props.data)
    // console.log(scroll)
  }, [props.data]);

  // useDeepCompareEffect(() => {
  //   console.log("deep-keys", props.data);
  // }, [props.data]);

  return (
    <div className={props.classVal} ref={wrapperRef}>
      {props.children}
    </div>
  );
});

Scroll.displayName = "Scroll";

Scroll.propTypes = {
  propType: PropTypes.number,
  click: PropTypes.bool,
  data: PropTypes.array,
  listenScroll: PropTypes.bool,
  pullup: PropTypes.bool,
  beforeScroll: PropTypes.bool,
  refreshDelay: PropTypes.number,
};

Scroll.defaultProps = {
  propType: 1,
  click: true,
  data: null,
  listenScroll: false,
  pullup: false,
  beforeScroll: false,
  refreshDelay: 20,
};

export default Scroll;
