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

export default {
    addCitizen,
}
