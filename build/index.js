"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Challonge {
    constructor(api_key, group) {
        this.api_key = api_key;
        this.group = group;
        this.endpoint = "https://api.challonge.com/v1/";
    }
    getTournaments() {
        return new Promise((resolve, reject) => {
            this.getRequest('tournaments').then(res => {
                let { data, status } = res;
                resolve({ tournaments: data, status });
            }).catch(err => reject(err.response));
        });
    }
    createTournament(params) {
        return new Promise((resolve, reject) => {
            this.postRequest(`tournaments`, { tournament: Object.assign({}, params, { subdomain: this.group }) }).then(res => {
                let { data: { tournament }, status } = res;
                resolve({ tournament, status });
            }).catch(err => reject(err.response));
        });
    }
    getTournament(tournament_url, params) {
        return new Promise((resolve, reject) => {
            this.getRequest(`tournaments/${this.tournamentUrl(tournament_url)}`, params).then(res => {
                let { data: { tournament }, status } = res;
                resolve({ tournament, status });
            }).catch(err => reject(err.response));
        });
    }
    updateTournament(tournament_url, params) {
        return new Promise((resolve, reject) => {
            this.putRequest(`tournaments/${this.tournamentUrl(tournament_url)}`, { tournament: Object.assign({}, params, { subdomain: this.group }) }).then(res => {
                let { data: { tournament }, status } = res;
                resolve({ tournament, status });
            }).catch(err => reject(err.response));
        });
    }
    destroyTournament(tournament_url) {
        return new Promise((resolve, reject) => {
            this.deleteRequest(`tournaments/${this.tournamentUrl(tournament_url)}`).then(res => {
                let { data: { tournament }, status } = res;
                resolve({ tournament, status });
            }).catch(err => reject(err.response));
        });
    }
    processTournamentCheckIn(tournament_url) {
    }
    abortTournamentCheckIn(tournament_url) {
    }
    startTournament(tournament_url, params) {
        return new Promise((resolve, reject) => {
            this.postRequest(`tournaments/${this.tournamentUrl(tournament_url)}/start`, params).then(res => {
                console.log(res.data);
                let { data, status } = res;
                resolve({ data, status });
            }).catch(err => reject(err.response));
        });
    }
    finalizeTournamentCheckin(tournament_url) {
    }
    resetTournament(tournament_url) {
    }
    openTournamentForPredictions(tournament_url) {
    }
    participantsBulkAdd(tournament_url, participants) {
        return new Promise((resolve, reject) => {
            this.postRequest(`tournaments/${this.tournamentUrl(tournament_url)}/participants/bulk_add`, { participants }).then(res => {
                let { data, status } = res;
                resolve({ data, status });
            }).catch(err => reject(err.response));
        });
    }
    tournamentUrl(tournament) {
        return this.group !== undefined && this.group !== '' ? `${this.group + "-" + tournament}` : tournament;
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
exports.default = Challonge;
