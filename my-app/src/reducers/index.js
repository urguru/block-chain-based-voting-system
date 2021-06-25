import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import uiReducer from './uiReducer';
import contractReducer from './contractReducer';
import electionReducer from './electionReducer';
import citizenReducer from './citizenReducer';
import candidateReducer from './candidateReducer';
import pollingBoothReducer from './pollingBoothReducer';
import constituencyReducer from './constituencyReducer';

export default combineReducers({
    admin: adminReducer,
    ui: uiReducer,
    contract: contractReducer,
    election: electionReducer,
    citizen: citizenReducer,
    candidate: candidateReducer,
    pollingBooth: pollingBoothReducer,
    constituency: constituencyReducer
});