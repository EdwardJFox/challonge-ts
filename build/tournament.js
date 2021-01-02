"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Tournament = /** @class */ (function (_super) {
    __extends(Tournament, _super);
    function Tournament(api_key, data) {
        var _this = _super.call(this, api_key) || this;
        _this.data = data;
        _this.baseUrl = _this.generateUrl(data.url, data.subdomain);
        _this.processTournamentData(data, {});
        return _this;
    }
    Tournament.prototype.get = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.show(_this.api_key, _this.baseUrl, params).then(function (res) {
                _this.processTournamentData(res.tournament, params);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.update = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.update(_this.api_key, _this.baseUrl, params).then(function (res) {
                _this.processTournamentData(res.tournament, params);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.destroy(_this.api_key, _this.baseUrl).then(function (res) {
                if (res.status = 200) {
                    _this.api_key = undefined;
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.processCheckIns = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.processCheckIns(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.abortCheckIns = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.abortCheckIns(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.startTournament = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.start(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.finalizeResults = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.finalize(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.resetTournament = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.reset(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.openForPredictions = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.openForPredictions(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    _this.processTournamentData(res.tournament, params);
                    resolve(_this);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.getParticipants = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.index(_this.api_key, _this.baseUrl).then(function (res) {
                if (res.status = 200) {
                    resolve(_this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.newParticipant = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.create(_this.api_key, _this.baseUrl, { participant: params }).then(function (res) {
                if (res.status = 200) {
                    resolve(_this.processParticipant(res.participant));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.bulkAddParticipants = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.bulkAdd(_this.api_key, _this.baseUrl, params).then(function (res) {
                if (res.status = 200) {
                    resolve(_this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.clearParticipants = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.clear(_this.api_key, _this.baseUrl).then(function (res) {
                if (res.status = 200) {
                    _this.participants = [];
                    resolve(res.message);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.randomizeParticipants = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.randomize(_this.api_key, _this.baseUrl).then(function (res) {
                if (res.status = 200) {
                    resolve(_this.processParticipants(res.participants));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.getMatches = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAdapter.index(_this.api_key, _this.baseUrl).then(function (res) {
                if (res.status = 200) {
                    resolve(_this.processMatches(res.matches));
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    Tournament.prototype.processTournamentData = function (data, params) {
        var participants = data.participants, matches = data.matches, values = __rest(data, ["participants", "matches"]);
        if (params) {
            if (params.include_participants == 1 && participants) {
                this.processParticipants(participants);
            }
            if (params.include_matches == 1 && matches) {
                this.processParticipants(matches);
            }
        }
        Object.assign(this, values);
    };
    Tournament.prototype.processParticipants = function (participants) {
        var _this = this;
        this.participants = participants.map(function (participant) {
            return _this.processParticipant(participant.participant);
        });
        return this.participants;
    };
    Tournament.prototype.processParticipant = function (participant) {
        return new _1.Participant(this.api_key, this.baseUrl, participant.id, participant);
    };
    Tournament.prototype.processMatches = function (matches) {
        var _this = this;
        this.matches = matches.map(function (match) {
            return _this.processMatch(match.match);
        });
        return this.matches;
    };
    Tournament.prototype.processMatch = function (match) {
        return new _1.Match(this.api_key, this.baseUrl, match.id, match);
    };
    /** Create a tournament url */
    Tournament.prototype.generateUrl = function (url, subdomain) {
        if (!subdomain) {
            return url;
        }
        else {
            return subdomain + "-" + url;
        }
    };
    return Tournament;
}(_1.ChallongeBase));
exports.default = Tournament;
