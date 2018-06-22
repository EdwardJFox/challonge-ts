"use strict";
/** Tournament Interfaces */
Object.defineProperty(exports, "__esModule", { value: true });
/** Enum for the options for tournament_type */
var tournamentTypeEnum;
(function (tournamentTypeEnum) {
    /** Single elimination */
    tournamentTypeEnum["SINGLE_ELIMINATION"] = "single elimination";
    /** Double elimination */
    tournamentTypeEnum["DOUBLE_ELIMINATION"] = "double elimination";
    /** Round robin */
    tournamentTypeEnum["ROUND_ROBIN"] = "round robin";
    /** Swiss */
    tournamentTypeEnum["SWISS"] = "swiss";
})(tournamentTypeEnum = exports.tournamentTypeEnum || (exports.tournamentTypeEnum = {}));
/** Enum for the options for ranked_by */
var tournamentRankedByEnum;
(function (tournamentRankedByEnum) {
    /** Match wins */
    tournamentRankedByEnum["MATCH_WINS"] = "match wins";
    /** Game wins */
    tournamentRankedByEnum["GAME_WINS"] = "game wins";
    /** Points scored */
    tournamentRankedByEnum["POINTS_SCORED"] = "points scored";
    /** Points difference */
    tournamentRankedByEnum["POINTS_DIFFERENCE"] = "points difference";
    /** Custom */
    tournamentRankedByEnum["CUSTOM"] = "custom";
})(tournamentRankedByEnum = exports.tournamentRankedByEnum || (exports.tournamentRankedByEnum = {}));
/** Enum for the grand_finals_modifier parameter */
var tournamentGrandFinalsModifierEnum;
(function (tournamentGrandFinalsModifierEnum) {
    /** Give the winners bracket finalist two chances to beat the losers bracket finalist */
    tournamentGrandFinalsModifierEnum["DEFAULT"] = "";
    /** Create only one grand finals match */
    tournamentGrandFinalsModifierEnum["SINGLE_MATCH"] = "single match";
    /** Don't create a finals match between winners and losers bracket finalists */
    tournamentGrandFinalsModifierEnum["SKIP"] = "skip";
})(tournamentGrandFinalsModifierEnum = exports.tournamentGrandFinalsModifierEnum || (exports.tournamentGrandFinalsModifierEnum = {}));
