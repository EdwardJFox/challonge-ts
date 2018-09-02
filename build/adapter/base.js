"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/** Endpoint for Challonge API V1 */
exports.endpoint = "https://api.challonge.com/v1/";
/** Base API calls for the challonge API */
function getRequest(path, api_key, params) {
    return axios_1.default.get(`${exports.endpoint}${path}.json`, {
        params: Object.assign({ "api_key": api_key }, params)
    });
}
exports.getRequest = getRequest;
function postRequest(path, api_key, params) {
    return axios_1.default.post(`${exports.endpoint}${path}.json`, Object.assign({ "api_key": api_key }, params));
}
exports.postRequest = postRequest;
function putRequest(path, api_key, params) {
    return axios_1.default.put(`${exports.endpoint}${path}.json`, Object.assign({ "api_key": api_key }, params));
}
exports.putRequest = putRequest;
function deleteRequest(path, api_key, params) {
    return axios_1.default.delete(`${exports.endpoint}${path}.json`, {
        params: Object.assign({ "api_key": api_key }, params)
    });
}
exports.deleteRequest = deleteRequest;
function buildResponse(res) {
    let { data, status } = res;
    return { data, status };
}
exports.buildResponse = buildResponse;
function url(tournament, group) {
    return group !== undefined && group !== '' ? `${group + "-" + tournament}` : tournament;
}
exports.url = url;
