import config from "../config";
const axios = require('axios');

const addCitizen = async (ACCESS_TOKEN, citizen) => {
    const url = config.apiURL + '/v1/citizen';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, citizen, options);
    return response;
}

const getCitizenByVoterId = async (ACCESS_TOKEN, voterId) => {
    const url = config.apiURL + `/v1/citizen/${voterId}`;
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.get(url, options);
    console.log(response);
    return response;
}

const castVote = async (ACCESS_TOKEN, candidateVoterId,voterId) => {
    const url = config.apiURL + `/v1/citizen/${voterId}/vote`;
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const body = {
        candidateVoterId
    }
    const response = await axios.post(url, body, options);
    return response;
}

export default {
    addCitizen,
    getCitizenByVoterId,
    castVote,
}
