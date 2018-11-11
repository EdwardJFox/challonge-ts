"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChallongeAdapterBase = require("./base");
/** Namespace for all of the Match Attachment routes */
var MatchAttachmentAdapter;
(function (MatchAttachmentAdapter) {
    /** Retrieve a match's attachments. */
    function index(api_key, tournament_url, match_id) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments`, api_key).then(res => {
                const { data, status } = res;
                resolve({ attachments: data, status });
            }).catch(err => reject(err));
        });
    }
    MatchAttachmentAdapter.index = index;
    /** Add a file, link, or text attachment to a match. NOTE: The associated
     * tournament's "accept_attachments" attribute must be true for this action
     * to succeed. */
    function create(api_key, tournament_url, match_id, params) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments`, api_key, params).then(res => {
                const { data: { match_attachment }, status } = res;
                resolve({ match_attachment, status });
            }).catch(err => reject(err));
        });
    }
    MatchAttachmentAdapter.create = create;
    /** Retrieve a single match attachment record. */
    function show(api_key, tournament_url, match_id, attachment_id) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key).then(res => {
                const { data: { match_attachment }, status } = res;
                resolve({ match_attachment, status });
            }).catch(err => reject(err));
        });
    }
    MatchAttachmentAdapter.show = show;
    /** Update the attributes of a match attachment. */
    function update(api_key, tournament_url, match_id, attachment_id, params) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key, params).then(res => {
                const { data: { match_attachment }, status } = res;
                resolve({ match_attachment, status });
            }).catch(err => reject(err));
        });
    }
    MatchAttachmentAdapter.update = update;
    /** Delete a match attachment. */
    function destroy(api_key, tournament_url, match_id, attachment_id) {
        return new Promise((resolve, reject) => {
            ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key).then(res => {
                const { data: { match_attachment }, status } = res;
                resolve({ match_attachment, status });
            }).catch(err => reject(err));
        });
    }
    MatchAttachmentAdapter.destroy = destroy;
})(MatchAttachmentAdapter = exports.MatchAttachmentAdapter || (exports.MatchAttachmentAdapter = {}));
