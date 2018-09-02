"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChallongeAdapterBase = require("./base");
/** Retrieve a set of tournaments created with your account. */
function index(api_key, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.getRequest('tournaments', api_key, params).then(res => {
            const { data, status } = res;
            resolve({ tournaments: data, status });
        }).catch(err => reject(err));
    });
}
exports.index = index;
/** Create a new tournament. */
function create(api_key, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.create = create;
/** Retrieve a single tournament record created with your account. */
function show(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.show = show;
/** Update a tournament's attributes. */
function update(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.update = update;
/** Deletes a tournament along with all its associated records. There is no undo, so use with care! */
function destroy(api_key, tournament_url) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}`, api_key).then(res => {
            const { status } = res;
            resolve({ status });
        }).catch(err => reject(err));
    });
}
exports.destroy = destroy;
/**
 * This should be invoked after a tournament's check-in window closes before
 * the tournament is started.
 *
 * 1. Marks participants who have not checked in as inactive.
 * 2. Moves inactive participants to bottom seeds (ordered by original seed).
 * 3. Transitions the tournament state from 'checking_in' to 'checked_in'
 *
 * NOTE: Checked in participants on the waiting list will be promoted if slots
 *  become available.
 */
function processCheckIns(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/process_check_ins`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.processCheckIns = processCheckIns;
/** When your tournament is in a 'checking_in' or 'checked_in' state, there's
 * no way to edit the tournament's start time (start_at) or check-in duration
 * (check_in_duration). You must first abort check-in, then you may edit
 * those attributes.
 *
 * 1. Makes all participants active and clears their checked_in_at times.
 * 2. Transitions the tournament state from 'checking_in' or 'checked_in' to
 * 'pending'
 */
function abortCheckIns(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/abort_check_in`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.abortCheckIns = abortCheckIns;
/** Start a tournament, opening up first round matches for score reporting.
 * The tournament must have at least 2 participants. */
function start(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/start`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.start = start;
/** Finalize a tournament that has had all match scores submitted, rendering
 * its results permanent. */
function finalize(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/finalize`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.finalize = finalize;
/** Reset a tournament, clearing all of its scores and attachments. You can
 * then add/remove/edit participants before starting the tournament again. */
function reset(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/reset`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.reset = reset;
/** Sets the state of the tournament to start accepting predictions. Your
 * tournament's 'prediction_method' attribute must be set to 1 (exponential
 * scoring) or 2 (linear scoring) to use this option. Note: Once open for
 * predictions, match records will be persisted, so participant additions and
 * removals will no longer be permitted. */
function openForPredictions(api_key, tournament_url, params) {
    return new Promise((resolve, reject) => {
        ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/open_for_predictions`, api_key, params).then(res => {
            let { data: { tournament }, status } = res;
            resolve({ tournament, status });
        }).catch(err => reject(err));
    });
}
exports.openForPredictions = openForPredictions;
