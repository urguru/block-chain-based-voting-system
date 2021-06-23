import config from "../config";
const axios = require('axios');

const updateElectionStatus = async (ACCESS_TOKEN, electionStatus) => {
    const url = config.apiURL + '/v1/election';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.put(url,{electionStatus}, options);
    return response;
}
const getElectionStatus= async () => {
    const url = config.apiURL + '/v1/election';
    const options = {
        headers: {
            'content-type': 'application/json',
            
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };

    const response = await axios.get(url,options);
    return response;
}





export default {
    updateElectionStatus,
    getElectionStatus,
}
