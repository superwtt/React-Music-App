import React from "react";

import "./index.less"

const MusicList = ()=>{
   return (
       <div className="musicList">
           <div className="back">
               <i className="iconBack"></i>
           </div>
           <h1 className="title"></h1>
           <div className="bgImage">
               <div className="filter"></div>
           </div>
       </div>
   ) 
}

export default MusicList;