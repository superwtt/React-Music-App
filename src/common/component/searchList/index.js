import React from "react";
import PropTypes from "prop-types";

import "./index.less";

const SearchList = (props) => {
  const { searches } = props;

  const selectListItem = (item) => {
      props.selectListItem(item)
  };

  const deleteListItem = (e, item) => {
    e.stopPropagation()
    props.deleteListItem(item)
  };

  return (
    <div className="search-list">
      <ul>
        {searches.length > 0 &&
          searches.map((item, index) => {
            return (
              <li
                onClick={() => selectListItem(item)}
                className="search-item"
                key={index}
              >
                <span className="text">{item}</span>
                <span
                  className="icon"
                  onClick={(e) => {
                    deleteListItem(e, item);
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
