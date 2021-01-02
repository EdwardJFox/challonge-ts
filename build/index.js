"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = exports.Participant = exports.Match = exports.Challonge = exports.Attachment = exports.ChallongeBase = exports.ParticipantAdapter = exports.TournamentAdapter = exports.MatchAttachmentAdapter = exports.MatchAdapter = exports.TournamentInterfaces = void 0;
// Interfaces
var interfaces_1 = require("./interfaces");
Object.defineProperty(exports, "TournamentInterfaces", { enumerable: true, get: function () { return interfaces_1.TournamentInterfaces; } });
// Adapter
var adapter_1 = require("./adapter");
Object.defineProperty(exports, "MatchAdapter", { enumerable: true, get: function () { return adapter_1.MatchAdapter; } });
Object.defineProperty(exports, "MatchAttachmentAdapter", { enumerable: true, get: function () { return adapter_1.MatchAttachmentAdapter; } });
Object.defineProperty(exports, "TournamentAdapter", { enumerable: true, get: function () { return adapter_1.TournamentAdapter; } });
Object.defineProperty(exports, "ParticipantAdapter", { enumerable: true, get: function () { return adapter_1.ParticipantAdapter; } });
// Classes
var base_1 = require("./base");
Object.defineProperty(exports, "ChallongeBase", { enumerable: true, get: function () { return base_1.default; } });
var attachment_1 = require("./attachment");
Object.defineProperty(exports, "Attachment", { enumerable: true, get: function () { return attachment_1.default; } });
var challonge_1 = require("./challonge");
Object.defineProperty(exports, "Challonge", { enumerable: true, get: function () { return challonge_1.default; } });
var match_1 = require("./match");
Object.defineProperty(exports, "Match", { enumerable: true, get: function () { return match_1.default; } });
var participant_1 = require("./participant");
Object.defineProperty(exports, "Participant", { enumerable: true, get: function () { return participant_1.default; } });
var tournament_1 = require("./tournament");
Object.defineProperty(exports, "Tournament", { enumerable: true, get: function () { return tournament_1.default; } });
