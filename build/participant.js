"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Participant extends base_1.default {
    constructor(api_key, tournament, id, group) {
        super(api_key, group);
        this.api_key = api_key;
        this.tournament = tournament;
        this.id = id;
        this.group = group;
    }
    /** Retrieve a tournament's participant list. */
    get() {
    }
    /** Update the attributes of a tournament participant. */
    update() {
    }
    /** Checks a participant in, setting checked_in_at to the current time. */
    checkIn() {
    }
    /** Marks a participant as having not checked in, setting checked_in_at to
     * nil. */
    undoCheckIn() {
    }
    /** If the tournament has not started, delete a participant, automatically
     * filling in the abandoned seed number. If tournament is underway, mark a
     * participant inactive, automatically forfeiting his/her remaining matches.
     */
    destroy() {
    }
}
exports.default = Participant;
