import React, { useEffect, useMemo, useState } from "react";
import Scroll from "../scroll/index";
import "./index.less";

const ListView = (props) => {
  const [shortcutList, setShortcutList] = useState([]);

  const { data } = props;

  const calShortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title.substr(0, 1);
    });
  }, [data.length]);

  useEffect(() => {
    setShortcutList(calShortcutList);
    console.log(calShortcutList);
  }, [data.length]);

  return (
    <Scroll data={data}>
      <ul>
        {data.map((item) => {
          return (
            <li className="listGroup" key={item.id}>
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
      <div className="listShortcut">
        <ul>
          {shortcutList.map((item, index) => {
            return <li className="item">{item}</li>;
          })}
        </ul>
      </div>
    </Scroll>
  );
};

export default ListView;
