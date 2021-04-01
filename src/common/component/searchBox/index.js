import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./index.less";

const SearchBox = (props) => {
  const [queryFromState, setQueryFromState] = useState("");
  const { placeholder, getQuery, query } = props;

  const blurInput = useRef(null);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    getQuery(val);
    setQueryFromState(val);
  };

  const clearQuery = () => {
    setQueryFromState("");
    getQuery("");
  };

  const blur = () => {
    blurInput.current.blur();
  };

  useEffect(() => {
    setQueryFromState(query);
  }, [query]);

  return (
    <div className="search-box">
      <i className="icon-search"></i>
      <input
        ref={blurInput}
        className="box"
        type="text"
        value={queryFromState}
        placeholder={placeholder}
        onChange={handleQueryChange}
        blur={blur}
      />
      {query && <i onClick={clearQuery} className="icon-dismiss"></i>}
    </div>
  );
};

SearchBox.defaultProps = {
  placeholder: "搜索歌曲、歌手",
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchBox;
