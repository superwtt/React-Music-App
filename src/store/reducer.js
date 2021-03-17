import { combineReducers } from "redux";
import { reducer as recommendReducer } from '@/pages/recommend/store';
import { reducer as searchReducer } from '@/pages/search/store';
import { reducer as singerReducer } from '@/pages/search/store';

export default combineReducers({
    recommendReducer,
    searchReducer,
    singerReducer
});
