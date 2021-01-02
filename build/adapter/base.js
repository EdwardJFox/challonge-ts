"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.buildResponse = exports.deleteRequest = exports.putRequest = exports.postRequest = exports.getRequest = exports.endpoint = void 0;
var axios_1 = require("axios");
/** Endpoint for Challonge API V1 */
exports.endpoint = "https://api.challonge.com/v1/";
/** Base API calls for the challonge API */
function getRequest(path, api_key, params) {
    return axios_1.default.get("" + exports.endpoint + path + ".json", {
        params: __assign({ "api_key": api_key }, params)
    });
}
exports.getRequest = getRequest;
function postRequest(path, api_key, params) {
    return axios_1.default.post("" + exports.endpoint + path + ".json", __assign({ "api_key": api_key }, params));
}
exports.postRequest = postRequest;
function putRequest(path, api_key, params) {
    return axios_1.default.put("" + exports.endpoint + path + ".json", __assign({ "api_key": api_key }, params));
}
exports.putRequest = putRequest;
function deleteRequest(path, api_key, params) {
    return axios_1.default.delete("" + exports.endpoint + path + ".json", {
        params: __assign({ "api_key": api_key }, params)
    });
}
exports.deleteRequest = deleteRequest;
function buildResponse(res) {
    var data = res.data, status = res.status;
    return { data: data, status: status };
}
exports.buildResponse = buildResponse;
function url(tournament, group) {
    return group !== undefined && group !== '' ? "" + (group + "-" + tournament) : tournament;
}
exports.url = url;
