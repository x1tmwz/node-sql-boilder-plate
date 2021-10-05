const axios = require('axios');
const config = require('config');
const pbxPaths = require('../data/pbxPaths.json');

const url = config.get('pbx.url');
const userName = config.get('pbx.userName');
const password = config.get('pbx.password');


async function send(path, data) {
    const params = {
        auth_username: userName,
        auth_password: password,
    }
    Object.assign(params, data)
    return axios({
        url: url + path,
        method: "POST",
        params: {
            auth_username: userName,
            auth_password: password,
            stype: "number",
            snumber: 200,
            cnumber: ""
        }
    })
}

async function makeACall(suplier, number, code) {
    const params = {
        stype: "number",
        snumber: 200,
        cnumber: suplier + 'wp1pw' + code + number + 'pwpw2'
    }
    return send(pbxPaths.makeCall, params);
}

module.exports = { makeACall }