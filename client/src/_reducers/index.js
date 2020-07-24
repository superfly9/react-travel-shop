import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
});
//combieReducer에 넣어준 이름이 redux-devtool의
//state이름이 된다
export default rootReducer;