import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const NoResult = (props) => {
  return (
    <div className="no-result">
      <div className="no-result-icon"></div>
      <p className="no-result-text">{props.title}</p>
    </div>
  );
};

NoResult.defaultProps = {
  title: "暂无搜索结果",
};

NoResult.propTypes = {
  title: PropTypes.string,
};

export default NoResult;
