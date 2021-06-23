import config from "../config";
const axios = require('axios');

const adminLogin = async (email, password) => {
    const url = config.apiURL + '/v1/admin/login';
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

const addAdmin = async (ACCESS_TOKEN, admin) => {
    const url = config.apiURL + '/v1/admin';
    const options = {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
        },
        timeout: 10000,
        responseType: 'json',
        responseEncoding: 'utf8',
    };
    const response = await axios.post(url, admin, options);
    return response;
}

const getAdminByPollingBoothId = async (pollingBoothId) => {
    const url = config.apiURL + '/v1/admin/' + pollingBoothId;
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
    adminLogin,
    addAdmin,
    getAdminByPollingBoothId
}
