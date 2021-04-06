import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import SongList from "@/common/component/songList";
import Scroll from "@/common/component/scroll";
import Switches from "@/common/component/switches";
import * as actionCreators from "@/pages/player/store/actionCreators";
import SearchBox from "@/common/component/searchBox";
import Suggest from "@/pages/suggest";
import { debounce } from "@/common/js/util";
import "./index.less";

const switches = [
  {
    name: "最近播放",
  },
  {
    name: "搜索历史",
  },
];

const AddSong = (props) => {
  const [number, setNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");

  const { showAddSong, playHistory } = props;

  const box = useRef(null);

  const getQuery = debounce((query) => {
    setQuery(query);
  }, 200);

  // 让鼠标失去焦点 移动端收起键盘
  const beforeScrollStart = () => {
    props.blur();
  };

  const saveSearchHistory = (item) => {
    props.saveSearch(item.name);
  };

  const back = () => {
    setNumber(0);
    setTimeout(() => {
      props.hide();
    }, 300);
  };

  const selectIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    showAddSong ? setNumber(1) : setNumber(0);
  }, [showAddSong]);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="slide">
      <div className="add-song">
        <div className="header">
          <h1 className="title">添加歌曲到列表</h1>
          <div className="close" onClick={back}>
            <i className="icon-close"></i>
          </div>
        </div>
        <div className="search-box-wrapper">
          <SearchBox
            //    ref={box}
            query={query}
            getQuery={getQuery}
          />
        </div>
        <div className="shortcut">
          <Switches
            selectIndex={selectIndex}
            currentIndex={currentIndex}
            switches={switches}
          />
          <div className="list-wrappers">
            {currentIndex === 0 && 
            <Scroll classVal={"list-scroll"} data={playHistory}>
              <div className="list-inner">
                <SongList songs={playHistory} />
              </div>    
            </Scroll>}
          </div>
        </div>
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
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  playHistory: state.playerReducer.playHistory,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch(item) {
      dispatch(actionCreators.saveSearchHistory(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
