import { playMode } from "@/common/js/config";
import * as constants from "./actionTypes";
import { loadSearch } from "@/common/js/cache";

const defaultState = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲的索引
  currentSong: {}, // 当前播放歌曲
  searchHistory: loadSearch(), // 搜索历史
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
    case constants.SET_SEARCH_HISTORY:
      return { ...state, searchHistory: action.value };
    case constants.DELETE_SEARCH_HISTORY:
      return { ...state, searchHistory: action.value };
      case constants.CLEAR_SEARCH_HISTORY:
        return { ...state, searchHistory: [] };
    default:
      return state;
  }
};
