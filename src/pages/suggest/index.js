import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { filterSinger } from "@/common/js/song";
import { ERR_OK } from "@/services/config";
import { search } from "@/services/search";
import "./index.less";

const TYPE_SINGER = "singer";

const Suggest = (props) => {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);

  const { query, showSinger } = props;

  const _getResult = (data) => {
    let ret = [];
    if (data.zhida && data.zhida.singerid) {
      ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
    }
    if (data.song) {
      ret = ret.concat(data.song.list);
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
      return `${item.songname}-${filterSinger(item.singer)}`;
    }
  };

  useEffect(() => {
    search(query, page, showSinger).then((res) => {
      if (res.code === ERR_OK) {
        setResult(_getResult(res.data));
      }
    });
  }, [query]);

  return (
    <div className="suggest">
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
      </ul>
    </div>
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
