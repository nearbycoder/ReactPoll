import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import poll from './poll'; 

const rootReducer = combineReducers({
  routing: routerReducer,
  poll
});

export default rootReducer;
