import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NoResult from "@/common/component/noResult";
import * as actionCreators from "@/pages/player/store/actionCreators";
import Loading from "@/common/component/loading";
import Scroll from "@/common/component/scroll";
import { createSong, processSongsUrl } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import { search } from "@/services/search";
import "./index.less";

const TYPE_SINGER = "singer";
const perpage = 20;
let page = 1;

let hasMore = false;

// function useCallbackState(state){
//     const cbRef = useRef();
//     const [data,setData] = useState(state);

//     useEffect(()=>{
//       cbRef.current&&cbRef.current(data)
//     },[data])

//     return [data,function(val,callback){
//         cbRef.current = callback;
//         setData(val);
//     }]
// }

const Suggest = (props) => {
  const suggest = useRef(null);
  const resultRef = useRef(null);

  const [noSource, setNoSource] = useState(false);
  const [title, setTitle] = useState("抱歉，暂无搜索结果");
  const [result, setResult] = useState([]);
  const [pullup, setPullUp] = useState(true);
  const [hasMoreFromState, setHasMoreFromState] = useState(false);

  const { query, showSinger, playList, sequenceList, currentIndex } = props;

  const _normalizeSongs = (list) => {
    let ret = [];
    list.forEach((musicData) => {
      if (musicData.songid && musicData.albumid) {
        ret.push(createSong(musicData));
      }
    });
    return ret;
  };

  const _getResult = (data) => {
    let ret = [];
    if (data.zhida && data.zhida.singerid) {
      ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
    }
    if (data.song) {
      ret = ret.concat(_normalizeSongs(data.song.list));
    }
    return ret;
  };

  const getIconCls = (item) => {
    if (item.type === TYPE_SINGER) {
      return "icon-mine";
    } else {
      return "icon-music";
    }
  };

  const getDisplayName = (item) => {
    if (item.type === TYPE_SINGER) {
      return item.singername;
    } else {
      return `${item.name}-${item.singer}`;
    }
  };

  const searchFn = () => {
    hasMore = true;
    setHasMoreFromState(true);
    page = 1;
    suggest.current.scrollTo(0, 0);
    search(query, page, showSinger, perpage).then((res) => {
      if (res.code === ERR_OK) {
        setResult(_getResult(res.data));
        setTimeout(() => {
          _checkMore(res.data);
        }, 20);
      }
    });
  };

  const _checkMore = (data) => {
    const song = data.song;
    if (
      !song.list.length ||
      song.curnum + song.curpage * perpage >= song.totalnum
    ) {
      hasMore = false;
      setHasMoreFromState(false);
    }
  };

  const searchMore = useCallback(() => {
    if (!hasMore) return;
    page++;
    search(query, page, showSinger, perpage).then((res) => {
      if (res.code === ERR_OK) {
        setResult(resultRef.current.concat(_getResult(res.data)));
        setTimeout(() => {
          _checkMore(res.data);
        }, 20);
      }
    });
  }, [result]);

  const selectItem = (item) => {
    processSongsUrl([item])
      .then((songs) => {
        setNoSource(false);
        const song = songs[0];
        props.insetSong(song, playList, sequenceList, currentIndex);
      })
      .catch((err) => {
        setTitle("暂无播放源");
        setNoSource(true);
      });
  };

  const beforeScrollStart = ()=>{
     props.beforeScrollStart() 
  }

  useEffect(() => {
    searchFn();
  }, [query]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  return (
    <Scroll
      classVal={"suggest"}
      pullup={pullup}
      scrollToEnd={searchMore}
      data={result}
      ref={suggest}
      beforeScroll={true}
      beforeScrollStart={beforeScrollStart}
    >
      {!noSource && (
        <ul className="suggest-list">
          {result.map((item, index) => {
            return (
              <li className="suggest-item" onClick={() => selectItem(item)}>
                <div className="icon">
                  <i className={`${getIconCls(item)}`}></i>
                </div>
                <div className="name">
                  <p className="text">{getDisplayName(item)}</p>
                </div>
              </li>
            );
          })}
          {hasMoreFromState && <Loading title="" />}
        </ul>
      )}
      {noSource && (
        <div className="no-result-wrapper">
          <NoResult title={title} />
        </div>
      )}
    </Scroll>
  );
};

PropTypes.defaultProps = {
  query: "",
  showSinger: false,
};

PropTypes.propTypes = {
  query: PropTypes.string,
  showSinger: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  playList: state.playerReducer.playList,
  sequenceList: state.playerReducer.sequenceList,
  currentIndex: state.playerReducer.currentIndex,
});

const mapDispatchToProps = (dispatch) => {
  return {
    insetSong(song, playList, sequenceList, currentIndex) {
      dispatch(
        actionCreators.insertSong(song, playList, sequenceList, currentIndex)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggest);
