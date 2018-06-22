"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ChallongeBase {
    constructor(api_key, group) {
        this.api_key = api_key;
        this.group = group;
        this.endpoint = "https://api.challonge.com/v1/";
    }
    getRequest(path, params) {
        return axios_1.default.get(`${this.endpoint}${path}.json`, {
            params: Object.assign({ "api_key": this.api_key }, params)
        });
    }
    postRequest(path, data) {
        return axios_1.default.post(`${this.endpoint}${path}.json`, Object.assign({ "api_key": this.api_key }, data));
    }
    putRequest(path, data) {
        return axios_1.default.put(`${this.endpoint}${path}.json`, Object.assign({ "api_key": this.api_key }, data));
    }
    deleteRequest(path, params) {
        return axios_1.default.delete(`${this.endpoint}${path}.json`, {
            params: Object.assign({ "api_key": this.api_key }, params)
        });
    }
    buildResponse(res) {
        let { data, status } = res;
        return { data, status };
    }
}
exports.default = ChallongeBase;
