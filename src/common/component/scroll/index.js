import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

const Scroll = forwardRef((props, ref) => {
  const [scroll, setScroll] = useState(null);

  const wrapperRef = useRef(null);

  const bindScroll = ()=>{
    if(props.listenScroll){
      scroll&&scroll.on('scroll',(pos)=>{
        props.scroll(pos)
      })
    }
  }

  const _initScroll = () => {
    if (!wrapperRef.current) return;

    const sc = new BScroll(wrapperRef.current, {
      probeType:props.probeType,
      click:props.click,
    });
    setScroll(sc);
    bindScroll();
  };

  const enable = () => {
    scroll && scroll.enable();
  };
  const disable = () => {
    scroll && scroll.disable();
  };
  const refresh = () => {
    scroll && scroll.refresh();
    bindScroll();
  };
  const scrollTo = function() {
    scroll && scroll.scrollTo.apply(scroll, arguments);
  };
  const scrollToElement = function() {
    scroll && scroll.scrollToElement.apply(scroll, arguments);
  };

  useImperativeHandle(ref, () => ({
    enable,
    disable,
    refresh,
    scrollTo,
    scrollToElement,
  }));

  useEffect(() => {
    setTimeout(() => {
      _initScroll();
    }, 20);
  },[]);

  useEffect(()=>{
    refresh()
  },[props.data.length])

  // disclist列表请求到数据的时候，bscroll的高度已经计算到了，所以高度不对，需要重新渲染一下
  useEffect(() => {
    refresh();
  }, [props.data.length]);

  return (
    <div className="recommendContent" ref={wrapperRef}>
      {props.children}
    </div>
  );
});

Scroll.displayName = 'Scroll';

Scroll.propTypes = {
  propType: PropTypes.number,
  click: PropTypes.bool,
  data: PropTypes.array,
  listenScroll: PropTypes.bool
};

Scroll.defaultProps = {
  propType: 1,
  click: true,
  data: null,
  listenScroll:false
};


export default Scroll;
