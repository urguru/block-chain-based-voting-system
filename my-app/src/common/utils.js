export const getVotesForTheCandidate = (candidateVoterId, candidatesList, candidateVoteCountList) => {
    if (candidateVoterId == null || candidatesList == null || candidatesList.length == 0 ||
        candidateVoteCountList == null || candidateVoteCountList.length == 0) {
        return 0;
    }
    for (let i = 0; i < candidatesList.length; ++i) {
        if (candidatesList[i][0] == candidateVoterId) {
            return candidateVoteCountList[i];
        }
    }
    return 0;
}

export const getContestingConstituencyOfCandidate = (candidateVoterId, candidatesList) => {
    if (candidateVoterId == null || candidatesList == null || candidatesList.length == 0) {
        return "ER_INVALID";
    }
    for (let i = 0; i < candidatesList.length; ++i) {
        if (candidatesList[i][0] == candidateVoterId) {
            return candidatesList[i][1];
        }
    }
    return "ER_INVALID";
}

export const calculateCandidateRank = (candidateVoterId, contestingConstituency, candidatesList, candidateVoteCountList) => {
    if (candidateVoterId == null || contestingConstituency == null || contestingConstituency.length == 0 || candidatesList == null
        || candidatesList.length == 0 || candidateVoteCountList == null || candidateVoteCountList.length == 0) {
        return -1;
    }
    const validCandidates = [];
    for (let i = 0; i < candidatesList.length; ++i) {
        if (candidatesList[i][1] == contestingConstituency) {
            validCandidates.push([candidatesList[i], candidateVoteCountList[i]]);
        }
    }
    if (validCandidates.length == 1) {
        return 1;
    }
    validCandidates.sort((a, b) => (b[1] - a[1]))

    let presentRank = 0;
    for (let i = 0; i < validCandidates.length; ++i) {
        if (presentRank == 0) {
            ++presentRank;
        } else {
            if (validCandidates[i][1] < validCandidates[i - 1][1]) {
                ++presentRank
            }
        }
        if (validCandidates[i][0] === candidateVoterId) {
            return presentRank;
        }
    }
    return -1;
}