"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
class Challonge extends _1.ChallongeBase {
    constructor(api_key) {
        super(api_key);
    }
    /** Retrieve a set of tournaments created with your account. */
    getTournaments(params) {
        return new Promise((resolve, reject) => {
            _1.TournamentAdapter.index(this.api_key, params).then(results => {
                const toReturn = results.tournaments.map(tournament => {
                    return new _1.Tournament(this.api_key, tournament);
                });
                this.tournaments = toReturn;
                resolve(toReturn);
            }).catch(err => {
                reject(err);
            });
        });
    }
    /** Create a new tournament. */
    createTournament(params) {
        return new Promise((resolve, reject) => {
            _1.TournamentAdapter.create(this.api_key, { tournament: params }).then(result => {
                resolve(new _1.Tournament(this.api_key, result.tournament));
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = Challonge;
