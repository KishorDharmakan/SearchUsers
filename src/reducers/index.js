import { combineReducers } from 'redux';
import UserListReducer from './userlist_reducer';


const rootReducer = combineReducers({
  listUsers:UserListReducer,
});

export default rootReducer;
