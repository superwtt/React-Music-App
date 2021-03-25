import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import SingerDetail from "@/pages/singerDetail";
import ListView from "@/common/component/listView";
import SingerJS from "@/common/js/singer";
import * as actionCreators from "./store/actionCreators";

import "./index.less";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

const Singer = (props) => {

  const {playList} = props;

  const listViewRef = useRef(null);

  const [singers,setSingers] = useState([])
  const [showDetail,setShowDetail] = useState(0);
  const [singerTarget,setSingerTarget] = useState({});

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
    setShowDetail(1);
    setSingerTarget(item);
  }

  const hide = ()=>{
    setTimeout(()=>{
      setShowDetail(0);
    },300)
  }

  const handlePlaylist = () => {
    // throw new Error("component must implement handlePlaylist method");
    if(!playList) return
    const bottom = playList.length > 0 ? '60px' : '0'

    document.getElementsByClassName("singer")[0].style.bottom = bottom
    listViewRef.current.refresh()
  };

  useEffect(()=>{
    handlePlaylist(playList);
  },[playList])

  useEffect(() => {
    props.getSingerList().then((res) => {
      const list = _normalizeSinger(res.data.list);
      setSingers(list);
    });
    handlePlaylist(playList);
  }, []);

  return <div className="singer">
    <ListView ref={listViewRef} selectItem={selectItem} data={singers} />
    {
      showDetail>0&&<SingerDetail showDetail={showDetail} singer={singerTarget} hide={hide} />
    }
  </div>;
};

const mapStateToProps = (state) => ({
  singers: state.singerReducer.singers,
  playList:state.playerReducer.playList
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerList() {
     return dispatch(actionCreators.getSingerList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
