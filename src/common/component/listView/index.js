import React, { useEffect, useMemo, useRef, useState } from "react";

import { getData } from "@/common/js/dom";
import Scroll from "../scroll/index";
import "./index.less";

const ANCHOR_HEIGHT = 18;

const touch = {
  y1: 0,
  y2: 0,
  anchorIndex: 0,
};

const ListView = (props) => {
  const [shortcutList, setShortcutList] = useState([]);
  const [listenScroll, setListenScroll] = useState(true);
  const [scrollY, setScrollY] = useState(-1);
  const [listHeight, setListHeight] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const listView = useRef(null);

  const { data } = props;

  const calShortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title.substr(0, 1);
    });
  }, [data.length]);

  const _scrollTo = (anchorIndex) => {
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

  useEffect(() => {
    setShortcutList(calShortcutList);
    _calculateHeight();
  }, [data.length]);

  useEffect(() => {
    console.log(scrollY)
    for (let i = 0; i < listHeight.length; i++) {
      let h1 = listHeight[i];
      let h2 = listHeight[i + 1];
      if (!h2 || (-scrollY > h1 && -scrollY < h2)) {
        setCurrentIndex(i);
        return;
      }
      setCurrentIndex(0);
    }
  }, [scrollY]);

  return (
    <Scroll
      data={data}
      ref={listView}
      listenScroll={listenScroll}
      probeType={3}
      scroll={scroll}
    >
      <ul>
        {data.map((item,index) => {
          return (
            <li className="listGroup" key={index}>
              <h2 className="listGroupTitle">{item.title}</h2>
              <ul>
                {item.items.map((it,idx) => {
                  return (
                    <li className="listGroupItem" key={idx}>
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
                className={`item ${currentIndex === index?'current':''}`}
                data-index={index}
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </Scroll>
  );
};

export default ListView;
