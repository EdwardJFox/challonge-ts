"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Base class for challonge objects, holds at its core the api key */
class ChallongeBase {
    constructor(api_key) {
        this.api_key = api_key;
    }
}
exports.default = ChallongeBase;
