import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import * as actionCreators from "@/pages/player/store/actionCreators"
import { debounce } from "@/common/js/util";
import Suggest from "@/pages/suggest";
import { ERR_OK } from "@/services/config";
import { getHotKey } from "@/services/search";
import SearchBox from "@/common/component/searchBox";
import "./index.less";

const Search = (props) => {
  const [hotKey, setHotKey] = useState([]);
  const [query, setQuery] = useState("");

  const box = useRef(null);

  const getQuery = debounce((query) => {
    setQuery(query);
  }, 200);

  const selectItem = (item) => {
    setQuery(item.k);
  };

  // 让鼠标失去焦点 移动端收起键盘
  const beforeScrollStart = () => {
    props.blur();
  };

  const saveSearchHistory = (item) => {
    props.saveSearch(item)
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
        <SearchBox ref={box} query={query} getQuery={getQuery} />
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
          <Suggest
            beforeScrollStart={beforeScrollStart}
            query={query}
            saveSearchHistory={saveSearchHistory}
          />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch(item) {
      dispatch(actionCreators.saveSearchHistory(item))
    },
  };
};

export default connect(null, mapDispatchToProps)(Search);
