import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import SingerDetail from "@/pages/singerDetail";
import ListView from "@/common/component/listView";
import SingerJS from "@/common/js/singer";
import * as actionCreators from "./store/actionCreators";

import "./index.less";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

const Singer = (props) => {

  const [singers,setSingers] = useState([])
  const [showDetail,setShowDetail] = useState(false)

  const _normalizeSinger = (list) => {
    let map = {
      hot: {
        title: HOT_NAME,
        items: [],
      },
    };
    list.forEach((item, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(new SingerJS({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
        }));
      }
      const key = item.Findex;
      if (!map[key]) {
        map[key] = {
          title: key,
          items: [],
        };
      }
      map[key].items.push(
        new SingerJS({
          name: item.Fsinger_name,
          id: item.Fsinger_mid,
        })
      );
    });
    // 为了得到有序列表，我们需要处理 map
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  };

  const selectItem = (item)=>{
    console.log(item)
    setShowDetail(true)
  }

  useEffect(() => {
    props.getSingerList().then((res) => {
      const list = _normalizeSinger(res.data.list);
      setSingers(list);
    });
  }, []);

  return <div className="singer">
    <ListView selectItem={selectItem} data={singers}></ListView>
    {
      showDetail&&<SingerDetail />
    }
  </div>;
};

const mapStateToProps = (state) => ({
  singers: state.singerReducer.singers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerList() {
     return dispatch(actionCreators.getSingerList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
