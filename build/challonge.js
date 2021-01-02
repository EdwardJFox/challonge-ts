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
/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
var Challonge = /** @class */ (function (_super) {
    __extends(Challonge, _super);
    function Challonge(api_key) {
        return _super.call(this, api_key) || this;
    }
    /** Retrieve a set of tournaments created with your account. */
    Challonge.prototype.getTournaments = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.index(_this.api_key, params).then(function (results) {
                var toReturn = results.tournaments.map(function (tournament) {
                    return new _1.Tournament(_this.api_key, tournament);
                });
                _this.tournaments = toReturn;
                resolve(toReturn);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /** Create a new tournament. */
    Challonge.prototype.createTournament = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.TournamentAdapter.create(_this.api_key, { tournament: params }).then(function (result) {
                resolve(new _1.Tournament(_this.api_key, result.tournament));
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return Challonge;
}(_1.ChallongeBase));
exports.default = Challonge;
