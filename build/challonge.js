"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const tournament_1 = require("./tournament");
const adapter_1 = require("./adapter");
/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
class Challonge extends base_1.default {
    constructor(api_key) {
        super(api_key);
    }
    /** Retrieve a set of tournaments created with your account. */
    getTournaments(params) {
        return new Promise((resolve, reject) => {
            adapter_1.TournamentAdapter.index(this.api_key, params).then(results => {
                const toReturn = results.tournaments.map(tournament => {
                    return new tournament_1.default(this.api_key, tournament);
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
            adapter_1.TournamentAdapter.create(this.api_key, { tournament: params }).then(result => {
                resolve(new tournament_1.default(this.api_key, result.tournament));
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.default = Challonge;
