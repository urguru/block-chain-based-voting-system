import config from "../config";
const axios = require('axios');

const addCandidate = async (ACCESS_TOKEN, candidate) => {
    const url = config.apiURL + '/v1/candidate';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, candidate, options);
    return response;
}

const getCandidateByVoterId = async (voterId) => {
    const url = config.apiURL + '/v1/candidate/' + voterID;
    const options = {
        headers: {
            'content-type': 'application/json',

        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.get(url, options);
    return response;
}

export default {
    addCandidate,
    getCandidateByVoterId,
}
