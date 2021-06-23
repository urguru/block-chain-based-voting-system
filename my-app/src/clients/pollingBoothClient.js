import config from "../config";
const axios = require('axios');

const addPollingBooth = async (ACCESS_TOKEN, pollingBooth) => {
    const url = config.apiURL + '/v1/pollingBooth';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, pollingBooth, options);
    return response;
}

const getPollingBoothById = async (pollingBoothId) => {
    const url = config.apiURL + '/v1/pollingBooth/' + pollingBoothId;
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
    addPollingBooth,
    getPollingBoothById,
}
