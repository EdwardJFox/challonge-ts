"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Match = /** @class */ (function (_super) {
    __extends(Match, _super);
    function Match(api_key, baseUrl, id, data) {
        var _this = _super.call(this, api_key) || this;
        _this.api_key = api_key;
        _this.baseUrl = baseUrl;
        _this.id = id;
        _this.attachments = [];
        if (data) {
            Object.assign(_this, data);
        }
        return _this;
    }
    /** Retrieve a single match record for a tournament. */
    Match.prototype.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAdapter.show(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                Object.assign(_this, res.match);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Update/submit the score(s) for a match. */
    Match.prototype.update = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAdapter.update(_this.api_key, _this.baseUrl, _this.id, { match: params }).then(function (res) {
                Object.assign(_this, res.match);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Choose winner passing in a participant id and the scores in csv format */
    Match.prototype.selectWinner = function (winner_id, scores) {
        return this.update({ winner_id: winner_id, scores_csv: scores });
    };
    /** Reopens a match that was marked completed, automatically resetting
     * matches that follow it */
    Match.prototype.reopen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAdapter.reopen(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                Object.assign(_this, res.match);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Retrieve a matches attachments. */
    Match.prototype.getAllAttachments = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAttachmentAdapter.index(_this.api_key, _this.baseUrl, _this.id).then(function (res) {
                resolve(_this.processAttachments(res.attachments));
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Add a file, link, or text attachment to a match. NOTE: The associated
     * tournament's "accept_attachments" attribute must be true for this action
     * to succeed. */
    Match.prototype.createAttachment = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAttachmentAdapter.create(_this.api_key, _this.baseUrl, _this.id, { match_attachment: params }).then(function (res) {
                var attachment = _this.processAttachment(res.match_attachment);
                _this.attachments.push(attachment);
                resolve(attachment);
            }).catch(function (err) { return reject(err); });
        });
    };
    Match.prototype.processAttachments = function (attachments) {
        var _this = this;
        this.attachments = attachments.map(function (attachment) {
            return _this.processAttachment(attachment.match_attachment);
        });
        return this.attachments;
    };
    Match.prototype.processAttachment = function (attachment) {
        return new _1.Attachment(this.api_key, this.baseUrl, this.id, attachment.id, attachment);
    };
    return Match;
}(_1.ChallongeBase));
exports.default = Match;
