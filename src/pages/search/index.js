import React from "react";

import SearchBox from "@/common/component/searchBox";
import './index.styl';

const Search = () => {
  return <div className="search">
    <div className="search-box-wrapper">
      <SearchBox />
    </div>
  </div>;
};

export default Search;