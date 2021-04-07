import React from "react";

import './index.less';

const UserCenter = ()=>{
   return <>
     <div className="user-center">
         <div className="back">
             <i className="icon-back"></i>
         </div>
         <div className="switches-wrapper"></div>
         <div className="play-btn">
             <i className="icon-play"></i>
             <span className="text">随机播放全部</span>
         </div>
         <div className="list-wrapper"></div>
     </div>
   </>
}

export default UserCenter;