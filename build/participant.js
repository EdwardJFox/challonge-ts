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
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Participant = /** @class */ (function (_super) {
    __extends(Participant, _super);
    function Participant(api_key, baseUrl, id, data) {
        var _this = _super.call(this, api_key) || this;
        _this.api_key = api_key;
        _this.baseUrl = baseUrl;
        _this.id = id;
        if (data) {
            Object.assign(_this, data);
        }
        return _this;
    }
    /** Retrieve a single participant data. */
    Participant.prototype.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.show(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                Object.assign(_this, res.participant);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Update the attributes of a tournament participant. */
    Participant.prototype.update = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.update(_this.api_key, _this.baseUrl, _this.id, params).then(function (res) {
                Object.assign(_this, res.participant);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Checks a participant in, setting checked_in_at to the current time. */
    Participant.prototype.checkIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.checkIn(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                Object.assign(_this, res.participant);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Marks a participant as having not checked in, setting checked_in_at to
     * nil. */
    Participant.prototype.undoCheckIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.undoCheckIn(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                Object.assign(_this, res.participant);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** If the tournament has not started, delete a participant, automatically
     * filling in the abandoned seed number. If tournament is underway, mark a
     * participant inactive, automatically forfeiting his/her remaining matches.
     */
    Participant.prototype.destroy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.ParticipantAdapter.destroy(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                if (res.status = 200) {
                    _this.api_key = undefined;
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
            ;
        });
    };
    return Participant;
}(_1.ChallongeBase));
exports.default = Participant;
