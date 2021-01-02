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
var Attachment = /** @class */ (function (_super) {
    __extends(Attachment, _super);
    function Attachment(api_key, baseUrl, match_id, id, data) {
        var _this = _super.call(this, api_key) || this;
        _this.api_key = api_key;
        _this.baseUrl = baseUrl;
        _this.match_id = match_id;
        _this.id = id;
        if (data) {
            Object.assign(_this, data);
        }
        return _this;
    }
    /** Retrieve a single match attachment record. */
    Attachment.prototype.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAttachmentAdapter.show(_this.api_key, _this.baseUrl, _this.match_id, _this.id).then(function (res) {
                Object.assign(_this, res.match_attachment);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Update the attributes of a match attachment. */
    Attachment.prototype.update = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAttachmentAdapter.update(_this.api_key, _this.baseUrl, _this.match_id, _this.id, { match_attachment: params }).then(function (res) {
                Object.assign(_this, res.match_attachment);
                resolve(_this);
            }).catch(function (err) { return reject(err); });
        });
    };
    /** Delete a match attachment. */
    Attachment.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _1.MatchAttachmentAdapter.destroy(_this.api_key, _this.baseUrl, _this.match_id, _this.id).then(function (res) {
                if (res.status = 200) {
                    _this.api_key = undefined;
                    resolve(true);
                }
                else {
                    reject({ error: 'Challonge did not return 200' });
                }
            }).catch(function (err) { return reject(err); });
        });
    };
    return Attachment;
}(_1.ChallongeBase));
exports.default = Attachment;
