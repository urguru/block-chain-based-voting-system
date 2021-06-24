const gender = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other",
};

const roles = {
    CEC: "CEC",
    PBO: "PBO",
};

const electionStatus = {
    NOT_STARTED: { text: "not started", value: 0 },
    STARTED: { text: "started", value: 1 },
    COMPLETED: { text: "completed", value: 2 },
};

const mainLoadingWindowStates = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
    CLOSED: "closed",
}

export default {
    gender,
    roles,
    electionStatus,
    mainLoadingWindowStates
};
