import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const SearchList = (props) => {
  const { searches } = props;

  const selectItem = (item) => {};

  const deleteItem = (e, item) => {};

  return (
    <div className="search-list">
      <ul>
        {searches.length > 0 &&
          searches.map((item, index) => {
            return (
              <li
                onClick={() => selectItem(item)}
                className="search-item"
                key={index}
              >
                <span className="text">{item}</span>
                <span
                  className="icon"
                  onClick={(e) => {
                    deleteItem(e, item);
                  }}
                >
                  <i className="icon-delete"></i>
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

SearchList.defaultProps = {
  searches: [],
};

SearchList.propTypes = {
  searches: PropTypes.array,
};

export default SearchList;
