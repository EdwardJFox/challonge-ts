"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Attachment extends _1.ChallongeBase {
    constructor(api_key, baseUrl, match_id, id, data) {
        super(api_key);
        this.api_key = api_key;
        this.baseUrl = baseUrl;
        this.match_id = match_id;
        this.id = id;
        if (data) {
            Object.assign(this, data);
        }
    }
    /** Retrieve a single match attachment record. */
    get() {
        return new Promise((resolve, reject) => {
            _1.MatchAttachmentAdapter.show(this.api_key, this.baseUrl, this.match_id, this.id).then(res => {
                Object.assign(this, res.match_attachment);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Update the attributes of a match attachment. */
    update(params) {
        return new Promise((resolve, reject) => {
            _1.MatchAttachmentAdapter.update(this.api_key, this.baseUrl, this.match_id, this.id, { match_attachment: params }).then(res => {
                Object.assign(this, res.match_attachment);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Delete a match attachment. */
    delete() {
        return new Promise((resolve, reject) => {
            _1.MatchAttachmentAdapter.destroy(this.api_key, this.baseUrl, this.match_id, this.id).then(res => {
                if (res.status = 200) {
                    this.api_key = undefined;
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
        });
    }
}
exports.default = Attachment;
