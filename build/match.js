"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const adapter_1 = require("./adapter");
const adapter_2 = require("./adapter");
const attachment_1 = require("./attachment");
class Match extends base_1.default {
    constructor(api_key, baseUrl, id, data) {
        super(api_key);
        this.api_key = api_key;
        this.baseUrl = baseUrl;
        this.id = id;
        this.attachments = [];
        if (data) {
            Object.assign(this, data);
        }
    }
    /** Retrieve a single match record for a tournament. */
    get() {
        return new Promise((resolve, reject) => {
            adapter_1.MatchAdapter.show(this.api_key, this.baseUrl, this.id).then(res => {
                Object.assign(this, res.match);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Update/submit the score(s) for a match. */
    update(params) {
        return new Promise((resolve, reject) => {
            adapter_1.MatchAdapter.update(this.api_key, this.baseUrl, this.id, { match: params }).then(res => {
                Object.assign(this, res.match);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Choose winner passing in a participant id and the scores in csv format */
    selectWinner(winner_id, scores) {
        return this.update({ winner_id, scores_csv: scores });
    }
    /** Reopens a match that was marked completed, automatically resetting
     * matches that follow it */
    reopen() {
        return new Promise((resolve, reject) => {
            adapter_1.MatchAdapter.reopen(this.api_key, this.baseUrl, this.id).then(res => {
                Object.assign(this, res.match);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Retrieve a matches attachments. */
    getAllAttachments() {
        return new Promise((resolve, reject) => {
            adapter_2.MatchAttachmentAdapter.index(this.api_key, this.baseUrl, this.id).then(res => {
                resolve(this.processAttachments(res.attachments));
            }).catch(err => reject(err));
        });
    }
    /** Add a file, link, or text attachment to a match. NOTE: The associated
     * tournament's "accept_attachments" attribute must be true for this action
     * to succeed. */
    createAttachment(params) {
        return new Promise((resolve, reject) => {
            adapter_2.MatchAttachmentAdapter.create(this.api_key, this.baseUrl, this.id, { match_attachment: params }).then(res => {
                const attachment = this.processAttachment(res.match_attachment);
                this.attachments.push(attachment);
                resolve(attachment);
            }).catch(err => reject(err));
        });
    }
    processAttachments(attachments) {
        this.attachments = attachments.map(attachment => {
            return this.processAttachment(attachment.match_attachment);
        });
        return this.attachments;
    }
    processAttachment(attachment) {
        return new attachment_1.default(this.api_key, this.baseUrl, this.id, attachment.id, attachment);
    }
}
exports.default = Match;
