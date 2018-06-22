"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
class Challonge extends base_1.default {
    /** Retrieve a set of tournaments created with your account. */
    getTournaments() {
        return new Promise((resolve, reject) => {
            this.getRequest('tournaments').then(res => {
                let { data, status } = res;
                resolve({ tournaments: data, status });
            }).catch(err => reject(err.response));
        });
    }
    /** Create a new tournament. */
    createTournament(params) {
        return new Promise((resolve, reject) => {
            this.postRequest(`tournaments`, { tournament: Object.assign({}, params, { subdomain: this.group }) }).then(res => {
                let { data: { tournament }, status } = res;
                resolve({ tournament, status });
            }).catch(err => reject(err.response));
        });
    }
}
exports.default = Challonge;
