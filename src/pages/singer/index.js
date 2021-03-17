import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actionCreators";

import "./index.less";

const Singer = (props) => {

  useEffect(() => {
    props.getSingerList();
  }, []);

  return <div className="singer">Singer page</div>;
};

const mapStateToProps = (state) => ({
  singers: state.singerReducer.singers,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerList(){
      dispatch(actionCreators.getSingerList())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
