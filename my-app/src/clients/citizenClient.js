import config from "../config";
const axios = require('axios');

const createCitizen = async (ACCESS_TOKEN, citizen) => {
    const url = config.apiURL + '/v1/citizen';
    console.log(url);
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
    console.log(response.data)
    return response;
}

export default {
    createCitizen,
}
