import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
// 整合其他仓库的 reducer 的数据
export default combineReducers({
  recommend: recommendReducer,
})