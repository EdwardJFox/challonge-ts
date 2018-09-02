"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/** Endpoint for Challonge API V1 */
exports.endpoint = "https://api.challonge.com/v1/";
/** Base API calls for the challonge API */
function getRequest(path, api_key, params) {
    return node_fetch_1.default(`${exports.endpoint}${path}.json`, {
        headers: {
            Authorization: api_key
        },
        body: params
    });
}
exports.getRequest = getRequest;
function postRequest(path, api_key, params) {
    return node_fetch_1.default(`${exports.endpoint}${path}.json`, {
        headers: {
            Authorization: api_key
        },
        method: 'POST',
        body: params
    });
}
exports.postRequest = postRequest;
function putRequest(path, api_key, params) {
    return node_fetch_1.default(`${exports.endpoint}${path}.json`, {
        headers: {
            Authorization: api_key
        },
        method: 'PUT',
        body: params
    });
}
exports.putRequest = putRequest;
function deleteRequest(path, api_key, params) {
    return node_fetch_1.default(`${exports.endpoint}${path}.json`, {
        headers: {
            Authorization: api_key
        },
        method: 'DELETE',
        body: params
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
