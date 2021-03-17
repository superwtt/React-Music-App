import React from "react";
import PropTypes from "prop-types";

import LoadingGif from './loading.gif';
import "./index.less";

const Loading = (props) => {
  return (
    <div className="loading">
      <img width="24" height="24" src={LoadingGif} />
      <p className="desc">{props.title}</p>
    </div>
  );
};

Loading.defaultProps = {
  title: "正在载入...",
};

Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;
