import React, { useEffect, useState } from "react";

import { getHotKey } from "@/services/search";
import SearchBox from "@/common/component/searchBox";
import "./index.less";

const Search = (props) => {
  const [hotKey, setHotKey] = useState([]);

  useEffect(() => {
    getHotKey().then((res) => {
      const {
        data: { hotkey },
      } = res;
      setHotKey(hotkey.slice(0, 10));
    });
  }, []);

  return (
    <div className="search">
      <div className="search-box-wrapper">
        <SearchBox />
      </div>
      <div className="shortcut-wrapper">
        <div className="shortcut">
          <div className="hot-key">
            <h1 className="title">热门搜索</h1>
            <ul>
              {hotKey.map((item, index) => {
                return (
                  <li key={index} className="item">
                    <span>{item.k}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
