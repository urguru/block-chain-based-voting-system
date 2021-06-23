import config from "../config";
const axios = require('axios');

const addConstituency = async (ACCESS_TOKEN, constituency) => {
    const url = config.apiURL + '/v1/constituency';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, constituency, options);
    return response;
}

const getConstituencyById = async (constituencyId) => {
    const url = config.apiURL + '/v1/constituency/' + constituencyId;
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
    addConstituency,
    getConstituencyById,
}
