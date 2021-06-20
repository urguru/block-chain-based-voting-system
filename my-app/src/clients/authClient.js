import config from "../config";
const axios = require('axios');

const adminLogin = async (email, password) => {
    console.log(config);
    const url = config.apiURL + '/v1/admin/login';
    console.log(url);
    const data = {
        email, password
    };
    const options = {
        headers: {
            'content-type': 'application/json',
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, data, options);
    return response;
}

export default {
    adminLogin,
}
