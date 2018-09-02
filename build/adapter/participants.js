"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChallongeAdapterBase = require("./base");
/** Retrieve a tournament's participant list. */
function index(api_key, tournament_url) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/participants`, api_key).then(res => {
            const { data, status } = res;
            resolve({ participants: data, status });
        }).catch(err => reject(err));
    });
}
exports.index = index;
/** Add a participant to a tournament (up until it is started). */
function create(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants`, api_key, params).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.create = create;
/** Bulk add participants to a tournament (up until it is started). If an
 * invalid participant is detected, bulk participant creation will halt and
 * any previously added participants (from this API request) will be rolled
 * back. */
function bulkAdd(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/bulk_add`, api_key, params).then(res => {
            let { data, status } = res;
            resolve({ participants: data, status });
        }).catch(err => reject(err));
    });
}
exports.bulkAdd = bulkAdd;
/** Retrieve a single participant record for a tournament. */
function show(api_key, tournament_url, participant_id) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.show = show;
/** Update the attributes of a tournament participant. */
function update(api_key, tournament_url, participant_id, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key, params).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.update = update;
/** Checks a participant in, setting checked_in_at to the current time. */
function checkIn(api_key, tournament_url, participant_id) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/${participant_id}/check_in`, api_key).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.checkIn = checkIn;
/** Marks a participant as having not checked in, setting checked_in_at to nil. */
function undoCheckIn(api_key, tournament_url, participant_id) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/${participant_id}/undo_check_in`, api_key).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.undoCheckIn = undoCheckIn;
/** If the tournament has not started, delete a participant, automatically
 * filling in the abandoned seed number. If tournament is underway, mark a
 * participant inactive, automatically forfeiting his/her remaining matches. */
function destroy(api_key, tournament_url, participant_id) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key).then(res => {
            const { data: { participant }, status } = res;
            resolve({ participant, status });
        }).catch(err => reject(err));
    });
}
exports.destroy = destroy;
/** Deletes all participants in a tournament. (Only allowed if tournament
 * hasn't started yet) */
function clear(api_key, tournament_url) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/participants/clear`, api_key).then(res => {
            const { data: { message }, status } = res;
            resolve({ message, status });
        }).catch(err => reject(err));
    });
}
exports.clear = clear;
/** Randomize seeds among participants. Only applicable before a tournament has started. */
function randomize(api_key, tournament_url) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/randomize`, api_key).then(res => {
            const { data, status } = res;
            resolve({ participants: data, status });
        }).catch(err => reject(err));
    });
}
exports.randomize = randomize;
