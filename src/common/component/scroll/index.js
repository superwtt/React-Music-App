import React, { useEffect } from "react";

import BScroll from 'better-scroll';

const Scroll = (props) => {

  const initScroll = () => {
    const wrapper = document.querySelector('wrapper')
    new BScroll(wrapper, {
      probeType: 1,
    });

  };

  useEffect(() => {
    initScroll();
  }, []);

  return (
   <div className="wrapper">
     {
       props.children
     }
   </div>
  );
};

export default Scroll;
