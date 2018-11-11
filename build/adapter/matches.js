"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChallongeAdapterBase = require("./base");
/** Namespace for all of the Match routes */
var MatchAdapter;
(function (MatchAdapter) {
    /** Retrieve a tournament's match list. */
    function index(api_key, tournament_url) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/matches`, api_key).then(res => {
                const { data, status } = res;
                resolve({ matches: data, status });
            }).catch(err => reject(err));
        });
    }
    MatchAdapter.index = index;
    /** Retrieve a single match record for a tournament. */
    function show(api_key, tournament_url, match_id) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/matches/${match_id}`, api_key).then(res => {
                const { data: { match }, status } = res;
                resolve({ match, status });
            }).catch(err => reject(err));
        });
    }
    MatchAdapter.show = show;
    /** Retrieve a single match record for a tournament. */
    function update(api_key, tournament_url, match_id, params) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/matches/${match_id}`, api_key, params).then(res => {
                const { data: { match }, status } = res;
                resolve({ match, status });
            }).catch(err => reject(err));
        });
    }
    MatchAdapter.update = update;
    /** Retrieve a single match record for a tournament. */
    function reopen(api_key, tournament_url, match_id) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/matches/${match_id}/reopen`, api_key).then(res => {
                const { data: { match }, status } = res;
                resolve({ match, status });
            }).catch(err => reject(err));
        });
    }
    MatchAdapter.reopen = reopen;
})(MatchAdapter = exports.MatchAdapter || (exports.MatchAdapter = {}));
