import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Loading from "@/common/component/loading";
import Scroll from "@/common/component/scroll";
import { createSong } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import { search } from "@/services/search";
import "./index.less";

const TYPE_SINGER = "singer";
const perpage = 20;
let page = 1;
let hasMore = false;

const Suggest = (props) => {
  const [result, setResult] = useState([]);
  const [pullup, setPullUp] = useState(true);

  const { query, showSinger } = props;

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
    page = 1;
    search(query, page, showSinger, perpage).then((res) => {
      if (res.code === ERR_OK) {
        setResult(_getResult(res.data));
        setTimeout(()=>{
           _checkMore(res.data);
        },20)
      }
    });
  };

  const _checkMore = (data) => {
    const song = data.song;
    if (
      !song.list.length ||
      song.curnum + song.curpage * perpage > song.totalnum
    ) {
      hasMore = false;
    }
  };

  const searchMore = () => {
    if (!hasMore) return;
    page++;
    search(query, page, showSinger, perpage).then((res) => {
      if (res.code === ERR_OK) {
        setResult(result.concat(_getResult(res.data)));
        setTimeout(()=>{
            _checkMore(res.data);
         },20)
      }
    });
  };

  useEffect(() => {
    searchFn();
  }, [query]);

  return (
    <Scroll
      classVal={"suggest"}
      pullup={pullup}
      scrollToEnd={searchMore}
      data={result}
    >
      <ul className="suggest-list">
        {result.map((item, index) => {
          return (
            <li className="suggest-item">
              <div className="icon">
                <i className={`${getIconCls(item)}`}></i>
              </div>
              <div className="name">
                <p className="text">{getDisplayName(item)}</p>
              </div>
            </li>
          );
        })}
        {hasMore && <Loading title="" />}
      </ul>
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

export default Suggest;
