import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./index.less";

const dashArray = Math.PI * 100;

const ProgressCircle = (props) => {
  const { percent } = props;

  const [dashOffset, setDashOffset] = useState(0);

  useEffect(() => {
    const offset = (1 - percent) * dashArray;
    // console.log(offset);
    setDashOffset(offset);
  }, [percent]);

  return (
    <>
      <div className="progress-circle">
        <svg
          viewBox="0 0 100 100"
          version="1.1"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="progress-background"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
          />
          <circle
            className="progress-bar"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />
        </svg>
        {props.children}
      </div>
    </>
  );
};

ProgressCircle.defaultProps = {
  percent: 0,
};

ProgressCircle.propTypes = {
  percent: PropTypes.number,
};

export default ProgressCircle;
