import { playMode } from "@/common/js/config";
import * as constants from "./actionTypes";

const defaultState = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲的索引
  currentSong: {}, // 当前播放歌曲
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_SINGER:
      return { ...state, singer: action.value };
    case constants.SET_PLAYING_STATE:
      return { ...state, playing: action.value };
    case constants.SET_FULL_SCREEN:
      return { ...state, fullScreen: action.value };
    case constants.SET_PLAYLIST:
      return { ...state, playList: action.value };
    case constants.SET_SEQUENCE_LIST:
      return { ...state, sequenceList: action.value };
    case constants.SET_PLAY_MODE:
      return { ...state, mode: action.value };
    case constants.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.value };
    case constants.SET_CURRENT_SONG:
      return { ...state, currentSong: state.playList[action.value] };
    default:
      return state;
  }
};
