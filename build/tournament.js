"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const participant_1 = require("./participant");
const match_1 = require("./match");
const adapter_1 = require("./adapter");
class Tournament extends base_1.default {
    constructor(api_key, data) {
        super(api_key);
        this.data = data;
        this.baseUrl = this.generateUrl(data.url, data.subdomain);
        this.processTournamentData(data, {});
    }
    get(params) {
        return new Promise((resolve, reject) => {
            adapter_1.TournamentAdapter.show(this.api_key, this.baseUrl, params).then(res => {
                this.processTournamentData(res.tournament, params);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    update(params) {
        return new Promise((resolve, reject) => {
            adapter_1.TournamentAdapter.update(this.api_key, this.baseUrl, params).then(res => {
                this.processTournamentData(res.tournament, params);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            adapter_1.TournamentAdapter.destroy(this.api_key, this.baseUrl).then(res => {
                if (res.status = 200) {
                    this.api_key = undefined;
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
            adapter_1.TournamentAdapter.processCheckIns(this.api_key, this.baseUrl, params).then(res => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.TournamentAdapter.abortCheckIns(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.TournamentAdapter.start(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.TournamentAdapter.finalize(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.TournamentAdapter.reset(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.TournamentAdapter.openForPredictions(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    this.processTournamentData(res.tournament, params);
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
            adapter_1.ParticipantAdapter.index(this.api_key, this.baseUrl).then((res) => {
                if (res.status = 200) {
                    resolve(this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    newParticipant(params) {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.create(this.api_key, this.baseUrl, { participant: params }).then((res) => {
                if (res.status = 200) {
                    resolve(this.processParticipant(res.participant));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    bulkAddParticipants(params) {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.bulkAdd(this.api_key, this.baseUrl, params).then((res) => {
                if (res.status = 200) {
                    resolve(this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    clearParticipants() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.clear(this.api_key, this.baseUrl).then((res) => {
                if (res.status = 200) {
                    this.participants = [];
                    resolve(res.message);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    randomizeParticipants() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.randomize(this.api_key, this.baseUrl).then((res) => {
                if (res.status = 200) {
                    resolve(this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    getMatches() {
        return new Promise((resolve, reject) => {
            adapter_1.MatchAdapter.index(this.api_key, this.baseUrl).then((res) => {
                if (res.status = 200) {
                    resolve(this.processMatches(res.matches));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
    processTournamentData(data, params) {
        const { participants, matches } = data, values = __rest(data, ["participants", "matches"]);
        if (params) {
            if (params.include_participants == 1 && participants) {
                this.processParticipants(participants);
            }
            if (params.include_matches == 1 && matches) {
                this.processParticipants(matches);
            }
        }
        Object.assign(this, values);
    }
    processParticipants(participants) {
        this.participants = participants.map(participant => {
            return this.processParticipant(participant.participant);
        });
        return this.participants;
    }
    processParticipant(participant) {
        return new participant_1.default(this.api_key, this.baseUrl, participant.id, participant);
    }
    processMatches(matches) {
        this.matches = matches.map(match => {
            return this.processMatch(match.match);
        });
        return this.matches;
    }
    processMatch(match) {
        return new match_1.default(this.api_key, this.baseUrl, match.id, match);
    }
    /** Create a tournament url */
    generateUrl(url, subdomain) {
        if (!subdomain) {
            return url;
        }
        else {
            return `${subdomain}-${url}`;
        }
    }
}
exports.default = Tournament;
