import React from "react";
import Scroll from "../scroll/index";
import "./index.less";

const ListView = (props) => {
  const { data } = props;

  console.log(data);

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
    </Scroll>
  );
};

export default ListView;
