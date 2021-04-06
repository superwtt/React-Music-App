import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const Switches = (props) => {
  const { switches, currentIndex } = props;

  const selectIndex = index=>{
    props.selectIndex(index)
  }

  return (
    <ul className="switches">
      {switches.map((item, index) => {
        return (
          <li
            key={index}
            className={`switch-item ${currentIndex === index ? "active" : ""}`}
            onClick={()=>selectIndex(index)}
          >
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

Switches.defaultProps = {
  switches: [],
  currentIndex: 0,
};

Switches.propTypes = {
  switches: PropTypes.array,
  currentIndex: PropTypes.number,
};

export default Switches;
