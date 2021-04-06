import * as constants from "./actionTypes";
import { playMode } from "@/common/js/config";
import { shuffle } from "@/common/js/util";
import { saveSearch, deleteSearch, clearSearch,savePlay } from "@/common/js/cache";

let mode = 0;

function findCurrentIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id;
  });
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
    if (mode === 2) {
      // 如果点击了随机播放全部按钮  那么再次去点击其他歌曲播放  列表应该也是随机播放的列表，并且播放的是当前我点击的歌曲
      let randomList = shuffle(songs);
      let currentIndex = findCurrentIndex(randomList, songs[index]);

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
    } else {
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

export const setFullScreen = (flag) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: flag,
    });
  };
};

export const setPlayingState = (flag) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: flag,
    });
  };
};

export const setCurrentIndex = (index) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: index,
    });
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: index,
    });
  };
};

export const setSequence = (mode) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_PLAY_MODE,
      value: mode,
    });
  };
};

export const setPlayList = (list) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_PLAYLIST,
      value: list,
    });
  };
};

export const randomPlay = (list) => {
  let randomList = shuffle(list);
  mode = 2;
  return (dispatch) => {
    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: 0,
    });
    dispatch({
      type: constants.SET_PLAY_MODE,
      value: playMode.random,
    });
    dispatch({
      type: constants.SET_PLAYLIST,
      value: randomList,
    });
    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: list,
    });
    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: true,
    });
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: true,
    });
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: 0,
    });
  };
};

export const insertSong = (song, playList, sequenceList, currentIndex) => {
  return (dispatch) => {
    // 记录当前歌曲
    let currentSong = playList[currentIndex];

    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findCurrentIndex(playList, song);

    // 因为是插入歌曲，所以索引加1
    currentIndex++;

    // 插入歌曲到当前索引位置
    playList.splice(currentIndex, 0, song);

    // 如果当前插入的序号大于列表中的序号
    // [1,2,3,4,2]的例子
    if (fpIndex > -1) {
      // 如果我们在末尾增加一个2
      if (currentIndex > fpIndex) {
        playList.splice(fpIndex, 1);
        currentIndex--;
      } else {
        // 如果我们在前面增加一个2
        playList.splice(fpIndex + 1, 1);
      }
    }

    // 修改sequenceList，逻辑同修改playList
    // 先找到当前列表里有没有这首歌曲
    // 然后再插入这个歌曲
    // 如果有这个歌曲，分为[1,2,3,4,2]的两种情况
    let currentSIndex = findCurrentIndex(sequenceList, currentSong) + 1;

    let fsIndex = findCurrentIndex(sequenceList, song);

    sequenceList.splice(currentSIndex, 0, song);

    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1);
      } else {
        sequenceList.splice(fsIndex + 1, 1);
      }
    }

    dispatch({
      type: constants.SET_PLAYLIST,
      value: playList,
    });

    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: playList,
    });

    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: currentIndex,
    });

    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: true,
    });

    dispatch({
      type: constants.SET_FULL_SCREEN,
      value: true,
    });

    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: currentIndex,
    });
  };
};

export const saveSearchHistory = (query) => {
  return (dispatch) => {
    dispatch({
      type: constants.SET_SEARCH_HISTORY,
      value: saveSearch(query),
    });
  };
};

export const deleteSearchHistory = (query) => {
  return (dispatch) => {
    dispatch({
      type: constants.DELETE_SEARCH_HISTORY,
      value: deleteSearch(query),
    });
  };
};

export const clearSearchHistory = () => {
  return (dispatch) => {
    dispatch({
      type: constants.CLEAR_SEARCH_HISTORY,
      value: clearSearchHistory,
    });
  };
};

export const deleteSong = (song, playlist, sequenceList, currentIndex) => {
  return (dispatch) => {
    let pIndex = findCurrentIndex(playlist, song);
    playlist.splice(pIndex, 1);
    let sIndex = findCurrentIndex(sequenceList, song);
    sequenceList.splice(sIndex, 1);
    if (currentIndex > pIndex || currentIndex === playlist.length) {
      currentIndex--;
    }

    dispatch({
      type: constants.SET_PLAYLIST,
      value: playlist,
    });
    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: sequenceList,
    });
    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: currentIndex,
    });
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: currentIndex,
    });

    if (!playlist.length) {
      dispatch({
        type: constants.SET_PLAYING_STATE,
        value: false,
      });
    } else{
      dispatch({
        type: constants.SET_PLAYING_STATE,
        value: true,
      });
    }
  };
};


export const deleteSongList = ()=>{
  return dispatch=>{
    dispatch({
      type: constants.SET_PLAYLIST,
      value: [],
    });
    dispatch({
      type: constants.SET_SEQUENCE_LIST,
      value: [],
    });
    dispatch({
      type: constants.SET_CURRENT_INDEX,
      value: -1,
    });
    dispatch({
      type: constants.SET_CURRENT_SONG,
      value: -1,
    });
    dispatch({
      type: constants.SET_PLAYING_STATE,
      value: false,
    });
  }
}

export const savePlayHistory = (song)=>{
  console.log(savePlay(song))
  return dispatch=>{
    dispatch({
      type:constants.SAVE_PLAY_HISTORY,
      value:savePlay(song)
    })
  }
}