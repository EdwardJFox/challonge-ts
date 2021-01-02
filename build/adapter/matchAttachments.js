"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchAttachmentAdapter = void 0;
var ChallongeAdapterBase = require("./base");
/** Namespace for all of the Match Attachment routes */
var MatchAttachmentAdapter;
(function (MatchAttachmentAdapter) {
    /** Retrieve a match's attachments. */
    function index(api_key, tournament_url, match_id) {
        return new Promise(function (resolve, reject) {
            ChallongeAdapterBase.getRequest("tournaments/" + tournament_url + "/matches/" + match_id + "/attachments", api_key).then(function (res) {
                var data = res.data, status = res.status;
                resolve({ attachments: data, status: status });
            }).catch(function (err) { return reject(err); });
        });
    }
    MatchAttachmentAdapter.index = index;
    /** Add a file, link, or text attachment to a match. NOTE: The associated
     * tournament's "accept_attachments" attribute must be true for this action
     * to succeed. */
    function create(api_key, tournament_url, match_id, params) {
        return new Promise(function (resolve, reject) {
            ChallongeAdapterBase.postRequest("tournaments/" + tournament_url + "/matches/" + match_id + "/attachments", api_key, params).then(function (res) {
                var match_attachment = res.data.match_attachment, status = res.status;
                resolve({ match_attachment: match_attachment, status: status });
            }).catch(function (err) { return reject(err); });
        });
    }
    MatchAttachmentAdapter.create = create;
    /** Retrieve a single match attachment record. */
    function show(api_key, tournament_url, match_id, attachment_id) {
        return new Promise(function (resolve, reject) {
            ChallongeAdapterBase.getRequest("tournaments/" + tournament_url + "/matches/" + match_id + "/attachments/" + attachment_id, api_key).then(function (res) {
                var match_attachment = res.data.match_attachment, status = res.status;
                resolve({ match_attachment: match_attachment, status: status });
            }).catch(function (err) { return reject(err); });
        });
    }
    MatchAttachmentAdapter.show = show;
    /** Update the attributes of a match attachment. */
    function update(api_key, tournament_url, match_id, attachment_id, params) {
        return new Promise(function (resolve, reject) {
            ChallongeAdapterBase.putRequest("tournaments/" + tournament_url + "/matches/" + match_id + "/attachments/" + attachment_id, api_key, params).then(function (res) {
                var match_attachment = res.data.match_attachment, status = res.status;
                resolve({ match_attachment: match_attachment, status: status });
            }).catch(function (err) { return reject(err); });
        });
    }
    MatchAttachmentAdapter.update = update;
    /** Delete a match attachment. */
    function destroy(api_key, tournament_url, match_id, attachment_id) {
        return new Promise(function (resolve, reject) {
            ChallongeAdapterBase.deleteRequest("tournaments/" + tournament_url + "/matches/" + match_id + "/attachments/" + attachment_id, api_key).then(function (res) {
                var match_attachment = res.data.match_attachment, status = res.status;
                resolve({ match_attachment: match_attachment, status: status });
            }).catch(function (err) { return reject(err); });
        });
    }
    MatchAttachmentAdapter.destroy = destroy;
})(MatchAttachmentAdapter = exports.MatchAttachmentAdapter || (exports.MatchAttachmentAdapter = {}));
