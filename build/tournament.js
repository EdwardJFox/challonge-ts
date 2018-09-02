"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const tournaments_1 = require("./adapter/tournaments");
const participants_1 = require("./adapter/participants");
class Tournament extends base_1.default {
    constructor(api_key, data) {
        super(api_key);
        this.data = data;
        this.baseUrl = this.generateUrl(data.url, data.subdomain);
    }
    get(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.show(this.api_key, this.baseUrl, params).then(result => {
                this.data = result.tournament;
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.update(this.api_key, this.baseUrl, params).then(result => {
                this.data = result.tournament;
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            tournaments_1.destroy(this.api_key, this.baseUrl).then(res => {
                if (res.status = 200) {
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    processCheckIns(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.processCheckIns(this.api_key, this.baseUrl, params).then(res => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    abortCheckIns(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.abortCheckIns(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    startTournament(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.start(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    finalizeResults(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.finalize(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    resetTournament(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.reset(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    openForPredictions(params) {
        return new Promise((resolve, reject) => {
            tournaments_1.openForPredictions(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    getParticipants() {
        return new Promise((resolve, reject) => {
            participants_1.index(this.api_key, this.baseUrl).then((res) => {
                if (res.status = 200) {
                    this.data = res.tournament;
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    newParticipant(params) {
        return new Promise((resolve, reject) => {
            participants_1.create(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processParticipants([res.participant]);
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    bulkAddParticipants(params) {
        return new Promise((resolve, reject) => {
            participants_1.bulkAdd(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processParticipants(res.participants);
                    resolve(this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    processTournamentData(data, params) {
        if (params.include_participants == 1) {
            this.processParticipants(data.participants);
        }
        if (params.include_matches == 1) {
            this.processParticipants(data.matches);
        }
    }
    processParticipants(participants) {
        participants.forEach(element => {
        });
    }
    processMatches(matches) {
    }
    /** Create a tournament url */
    generateUrl(url, subdomain) {
        if (subdomain) {
            return url;
        }
        else {
            return `${subdomain}-${url}`;
        }
    }
}
exports.default = Tournament;
