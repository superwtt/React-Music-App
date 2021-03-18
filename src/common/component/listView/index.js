import React, { useEffect, useMemo, useRef, useState } from "react";

import { getData } from "@/common/js/dom";
import Scroll from "../scroll/index";
import "./index.less";

const ListView = (props) => {
  const [shortcutList, setShortcutList] = useState([]);

  const listView = useRef(null);
  const listGroup = useRef(null);

  const { data } = props;

  const calShortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title.substr(0, 1);
    });
  }, [data.length]);

  const onShortcutTouchStart = (e) => {
    let anchorIndex = getData(e.target, "index");
    const listGroups = document.getElementsByClassName("listGroup");
    let firstTouch = e.touches[0];
    console.log(listGroup)
    listView.current.scrollToElement(listGroups[anchorIndex],0)
  };

  useEffect(() => {
    setShortcutList(calShortcutList);
  }, [data.length]);

  return (
    <Scroll data={data} ref={listView}>
      <ul>
        {data.map((item) => {
          return (
            <li className="listGroup" key={item.id} >
              <h2 className="listGroupTitle">{item.title}</h2>
              <ul>
                {item.items.map((it) => {
                  return (
                    <li className="listGroupItem">
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
      <div className="listShortcut" onTouchStart={onShortcutTouchStart}>
        <ul>
          {shortcutList.map((item, index) => {
            return (
              <li className="item" data-index={index}>
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
