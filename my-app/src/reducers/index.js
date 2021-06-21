import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import ethereumReducer from './ethereumReducer';

export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    ethereum: ethereumReducer,
});