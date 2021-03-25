import * as constants from "./actionTypes";
import {playMode} from '@/common/js/config';
import { shuffle } from "@/common/js/util";

let mode = 0;

function findCurrentIndex(list,song){
  return list.findIndex(item=>{
    return item.id === song.id
  })
}

export const selectPlay = ({ songs, index }) => {
  return function (dispatch) {
    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: songs,
    });
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: true,
    });
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: true,
    });
    if(mode===2){
      // 如果点击了随机播放全部按钮  那么再次去点击其他歌曲播放  列表应该也是随机播放的列表，并且播放的是当前我点击的歌曲
      let randomList = shuffle(songs);
      let currentIndex = findCurrentIndex(randomList,songs[index]);

      dispatch({
        type: constants.SET_PLAYLIST,
        value: randomList,
      });
      dispatch({
        type: constants.SET_CURRENT_INDEX,
        value: currentIndex,
      });
      dispatch({
        type: constants.SET_CURRENT_SONG,
        value: currentIndex,
      });
    } else{
      dispatch({
        type: constants.SET_PLAYLIST,
        value: songs,
      });
      dispatch({
        type: constants.SET_CURRENT_INDEX,
        value: index,
      });
      dispatch({
        type: constants.SET_CURRENT_SONG,
        value: index,
      });
    }
    
  };
};

export const setFullScreen = (flag)=>{
  return (dispatch)=>{
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: flag,
    });
  }
}

export const setPlayingState = (flag)=>{
  return (dispatch)=>{
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: flag,
    });
  }
}

export const setCurrentIndex = (index)=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_CURRENT_INDEX,
      value:index
    })
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: index,
    });
  }
}

export const setSequence = mode=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_PLAY_MODE,
      value:mode
    })
  }
}

export const setPlayList = (list)=>{
  return (dispatch)=>{
    dispatch({
      type:constants.SET_PLAYLIST,
      value:list
    })
  }
}

export const randomPlay = list=>{
  let randomList = shuffle(list);
  mode = 2;
  return dispatch=>{
    dispatch({
      type:constants.SET_CURRENT_INDEX,
      value:0
    })
    dispatch({
      type:constants.SET_PLAY_MODE,
      value:playMode.random
    })
    dispatch({
      type:constants.SET_PLAYLIST,
      value:randomList
    })
    dispatch({
      type:constants.SET_SEQUENCE_LIST,
      value:list
    })
    dispatch({
      type:constants.SET_FULL_SCREEN,
      value:true
    })
    dispatch({
      type:constants.SET_PLAYING_STATE,
      value:true
    })
    dispatch({
      type:constants.SET_CURRENT_SONG,
      value:0
    })
  }
}
