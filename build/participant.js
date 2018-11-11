"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const adapter_1 = require("./adapter");
class Participant extends base_1.default {
    constructor(api_key, baseUrl, id, data) {
        super(api_key);
        this.api_key = api_key;
        this.baseUrl = baseUrl;
        this.id = id;
        if (data) {
            Object.assign(this, data);
        }
    }
    /** Retrieve a single participant data. */
    get() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.show(this.api_key, this.baseUrl, this.id).then(res => {
                Object.assign(this, res.participant);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Update the attributes of a tournament participant. */
    update(params) {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.update(this.api_key, this.baseUrl, this.id, params).then(res => {
                Object.assign(this, res.participant);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Checks a participant in, setting checked_in_at to the current time. */
    checkIn() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.checkIn(this.api_key, this.baseUrl, this.id).then(res => {
                Object.assign(this, res.participant);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** Marks a participant as having not checked in, setting checked_in_at to
     * nil. */
    undoCheckIn() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.undoCheckIn(this.api_key, this.baseUrl, this.id).then(res => {
                Object.assign(this, res.participant);
                resolve(this);
            }).catch(err => reject(err));
        });
    }
    /** If the tournament has not started, delete a participant, automatically
     * filling in the abandoned seed number. If tournament is underway, mark a
     * participant inactive, automatically forfeiting his/her remaining matches.
     */
    destroy() {
        return new Promise((resolve, reject) => {
            adapter_1.ParticipantAdapter.destroy(this.api_key, this.baseUrl, this.id).then(res => {
                if (res.status = 200) {
                    this.api_key = undefined;
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(err => reject(err));
            ;
        });
    }
}
exports.default = Participant;
