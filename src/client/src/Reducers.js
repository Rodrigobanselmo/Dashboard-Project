import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import routeReducer from './reducers/routeReducer';
import themeReducer from './reducers/themeReducer';

export default combineReducers({
    user:userReducer,
    route:routeReducer,
    theme:themeReducer,
});
