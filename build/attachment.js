"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Attachment extends base_1.default {
    constructor(api_key, tournament, match_id, attachment_id) {
        super(api_key);
        this.api_key = api_key;
        this.tournament = tournament;
        this.match_id = match_id;
        this.attachment_id = attachment_id;
    }
    /** Retrieve a single match attachment record. */
    show() {
    }
    /** Update the attributes of a match attachment. */
    update() {
    }
    /** Delete a match attachment. */
    destroy() {
    }
}
exports.default = Attachment;
