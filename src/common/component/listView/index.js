import React, { forwardRef,useEffect, useMemo, useRef, useState,useImperativeHandle } from "react";

import Loading from "@/common/component/loading";
import { getData } from "@/common/js/dom";
import Scroll from "../scroll/index";
import "./index.less";

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;

const touch = {
  y1: 0,
  y2: 0,
  anchorIndex: 0,
};

const ListView = forwardRef((props,ref) => {
  const [shortcutList, setShortcutList] = useState([]);
  const [listenScroll, setListenScroll] = useState(true);
  const [scrollY, setScrollY] = useState(-1);
  const [listHeight, setListHeight] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fixedTitle, setFixedTitle] = useState("");
  const [diff, setDiff] = useState(-1);

  const listView = useRef(null);

  const { data } = props;

  const calShortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title.substr(0, 1);
    });
  }, [data.length]);

  const _scrollTo = (anchorIndex) => {
    if (!anchorIndex && anchorIndex !== 0)
      // 最顶部和最底部UI美化部分，点击应该是无效的
      return;
    if (anchorIndex < 0) {
      anchorIndex = 0;
    } else if (anchorIndex > listHeight.length - 2) {
      anchorIndex = listHeight.length - 2; // listHeight计算出来是24个，实际数据只有23个，数组索引还要再减去1
    }
    setScrollY(-listHeight[anchorIndex]); // 点击的时候获取位置，高亮右侧字母
    const listGroups = document.getElementsByClassName("listGroup");
    listView.current.scrollToElement(listGroups[anchorIndex], 0);
  };

  const onShortcutTouchStart = (e) => {
    let anchorIndex = getData(e.target, "index");
    let firstTouch = e.touches[0];
    touch.y1 = firstTouch.pageY;
    touch.anchorIndex = anchorIndex;
    _scrollTo(anchorIndex);
  };

  const onShortcutTouchMove = (e) => {
    console.log(e.nativeEvent)
    e.stopPropagation(); // 阻止事件冒泡

    let firstTouch = e.touches[0];
    touch.y2 = firstTouch.pageY;
    let delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0;
    let anchorIndex = Number(touch.anchorIndex) + delta;
    _scrollTo(anchorIndex);
  };

  const scroll = (pos) => {
    setScrollY(pos.y);
  };

  const _calculateHeight = () => {
    
    setListHeight([]);

    const listH = [];

    const listGroups = document.getElementsByClassName("listGroup");
    let height = 0;
    listH.push(height);
    for (let i = 0; i < listGroups.length; i++) {
      let item = listGroups[i];
      height += item.clientHeight;
      listH.push(height);
    }
    setListHeight(listH);
  };

  const _calculateFixedTitle = () => {
    if (scrollY > 0) {
      return "";
    }
    return data[currentIndex] ? data[currentIndex].title : "";
  };

  const selectItem = (item)=>{
    props.selectItem(item)
  }
  const refresh = () => {
    listView && listView.current.refresh();
  };
  
  useImperativeHandle(ref, () => ({
    refresh,
  }));

  useEffect(() => {
    setShortcutList(calShortcutList);
    _calculateHeight();
  }, [data.length]);

  useEffect(() => {

    // 监测滚动设置顶部的值
    setFixedTitle(_calculateFixedTitle());

    // 当滚动到顶部，scrollY>0
    if (scrollY > 0) {
      setCurrentIndex(0);
      return;
    }

    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let h1 = listHeight[i];
      let h2 = listHeight[i + 1];
      if (-scrollY >= h1 && -scrollY < h2) {
        setCurrentIndex(i);
        setDiff(h2 + scrollY); // 实际上是减去scrollY,scrollY是负值
        return;
      }
      // 滚动到底部，且-scrollY大于最后一个元素上限
      setCurrentIndex(listHeight.length - 2);
    }
  }, [scrollY]);

  useEffect(() => {
    let fixedTop = diff > 0 && diff < TITLE_HEIGHT ? diff - TITLE_HEIGHT : 0;
    const dom = document.getElementsByClassName("listFixed");
    if (!dom.length) return;
    dom[0].style.transform = `translate3d(0,${fixedTop}px,0)`;
  }, [diff]);

  

  return (
    <Scroll
      classVal = {"recommendContent"}
      data={data}
      ref={listView}
      listenScroll={listenScroll}
      probeType={3}
      scroll={scroll}
    >
      <ul>
        {data.map((item, index) => {
          return (
            <li className="listGroup" key={index}>
              <h2 className="listGroupTitle">{item.title}</h2>
              <ul>
                {item.items.map((it, idx) => {
                  return (
                    <li className="listGroupItem" key={idx} onClick={()=>selectItem(it)}>
                      <img className="avatar" src={it.avatar} />
                      <span className="name">{it.name}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div
        className="listShortcut"
        onTouchStart={onShortcutTouchStart}
        onTouchMove={onShortcutTouchMove}
      >
        <ul>
          {shortcutList.map((item, index) => {
            return (
              <li
                className={`item ${currentIndex === index ? "current" : ""}`}
                data-index={index}
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      {fixedTitle && (
        <div className="listFixed">
          <div className="fixedTitle">{fixedTitle}</div>
        </div>
      )}
      {data.length <= 0 && (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
    </Scroll>
  );
});


export default ListView;
