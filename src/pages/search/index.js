import React, { useEffect, useState } from "react";

import Suggest from "@/pages/suggest";
import { ERR_OK } from "@/services/config";
import { getHotKey } from "@/services/search";
import SearchBox from "@/common/component/searchBox";
import "./index.less";

const Search = (props) => {
  const [hotKey, setHotKey] = useState([]);
  const [query, setQuery] = useState("");

  const getQuery = (query) => {
    setQuery(query);
  };

  const selectItem = (item) => {
    setQuery(item.k);
  };

  useEffect(() => {
    getHotKey().then((res) => {
      if (res.code === ERR_OK) {
        const {
          data: { hotkey },
        } = res;
        setHotKey(hotkey.slice(0, 10));
      }
    });
  }, []);

  return (
    <div className="search">
      <div className="search-box-wrapper">
        <SearchBox query={query} getQuery={getQuery} />
      </div>
      {!query && (
        <div className="shortcut-wrapper">
          <div className="shortcut">
            <div className="hot-key">
              <h1 className="title">热门搜索</h1>
              <ul>
                {hotKey.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="item"
                      onClick={() => {
                        selectItem(item);
                      }}
                    >
                      <span>{item.k}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      {query && (
        <div className="search-result">
          <Suggest query={query} />
        </div>
      )}
    </div>
  );
};

export default Search;
