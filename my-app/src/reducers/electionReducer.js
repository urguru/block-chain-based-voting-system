import types from "../actions/types";
import constants from "../common/constants";

const INITIAL_STATE = {
    electionStatus: constants.electionStatus.NOT_STARTED
};

export default (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case types.SET_ELECTION_STATUS_NOT_STARTED:
            return { ...state, electionStatus: constants.electionStatus.NOT_STARTED };
        case types.SET_ELECTION_STATUS_STARTED:
            return { ...state, electionStatus: constants.electionStatus.STARTED };
        case types.SET_ELECTION_STATUS_COMPLETED:
            return { ...state, electionStatus: constants.electionStatus.COMPLETED };
        default:
            return state;
    }
};

