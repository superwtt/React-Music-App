import React from "react";

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

export default SearchBox;
