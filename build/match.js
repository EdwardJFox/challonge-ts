"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Match extends base_1.default {
    constructor(api_key, tournament, match_id) {
        super(api_key);
        this.api_key = api_key;
        this.tournament = tournament;
        this.match_id = match_id;
    }
    /** Retrieve a single match record for a tournament. */
    show() {
    }
    /** Update/submit the score(s) for a match. */
    update() {
    }
    /** Reopens a match that was marked completed, automatically resetting
     * matches that follow it */
    reopen() {
    }
    /** Retrieve a match's attachments. */
    indexAttachments() {
    }
    /** Add a file, link, or text attachment to a match. NOTE: The associated
     * tournament's "accept_attachments" attribute must be true for this action
     * to succeed. */
    createAttachment() {
    }
}
exports.default = Match;
