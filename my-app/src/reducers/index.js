import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import contractReducer from './contractReducer';

export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    contract: contractReducer,
});