import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import "./index.less";

const Confirm = (props) => {
  const [showFlag, setShowFlag] = useState(false);
  const [number, setNumber] = useState(0);

  const { text, confirmBtnText, cancelBtnText, showConfirm } = props;

  const handleConfirm = () => {
    props.confirm();
  };

  const handleCancel = () => {
    props.cancel();
  };

  useEffect(() => {
    showConfirm ? setNumber(1) : setNumber(0);
  }, []);

  return (
    <CSSTransition in={number ? true : false} timeout={300} classNames="fade">
      <div className="confirm">
        <div className="confirm-wrapper">
          <div className="confirm-content">
            <p className="text">{text}</p>
            <div className="operate">
              <div onClick={handleCancel} className="operate-btn">
                {cancelBtnText}
              </div>
              <div onClick={handleConfirm} className="operate-btn left">
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

Confirm.defaultProps = {
  text: "确认清空所有搜索历史吗",
  confirmBtnText: "确定",
  cancelBtnText: "取消",
};

Confirm.propTypes = {
  text: PropTypes.string,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
};

export default Confirm;
