import { combineReducers } from "redux";
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import allPostsReducer from './allPosts.Reducer';
import  trendingReducer from './trending.Reducer';


export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    allPostsReducer,
    trendingReducer,
  });
