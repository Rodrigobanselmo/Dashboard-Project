import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import routeReducer from './reducers/routeReducer';
import themeReducer from './reducers/themeReducer';
import riskReducer from './reducers/riskReducer';
import riskDataReducer from './reducers/riskDataReducer';
import saveReducer from './reducers/saveReducer';

export default combineReducers({
    user:userReducer,
    route:routeReducer,
    theme:themeReducer,
    risk:riskReducer,
    riskData:riskDataReducer,
    save:saveReducer,
});
