import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import routeReducer from './reducers/routeReducer';

export default combineReducers({
    user:userReducer,
    route:routeReducer,
});