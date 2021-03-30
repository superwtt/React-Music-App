import React from "react";
import PropTypes from "prop-types";

import "./index.less"

const SearchBox = (props) => {
  return (
    <div className="search-box">
      <i className="icon-search"></i>
      <input className="box" type="text" />
      <i className="icon-dismiss"></i>
    </div>
  );
};

SearchBox.defaultProps = {
  placeholder:"搜索歌曲、歌手"
}

SearchBox.propTypes = {
  placeholder: PropTypes.string
}

export default SearchBox;
