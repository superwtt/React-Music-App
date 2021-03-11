import { combineReducers } from "redux";
import { reducer as recommendReducer } from '@/pages/recommend/store';
import { reducer as searchReducer } from '@/pages/search/store';

export default combineReducers({
    recommendReducer,
    searchReducer,
});
