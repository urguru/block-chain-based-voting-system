import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import uiReducer from './uiReducer';
import contractReducer from './contractReducer';
import electionReducer from './electionReducer';

export default combineReducers({
    admin: adminReducer,
    ui: uiReducer,
    contract: contractReducer,
    election: electionReducer,
});