"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Tournament Interfaces */
var TournamentInterfaces;
(function (TournamentInterfaces) {
    /** Enums */
    /** Enum for the options for tournament_type */
    let tournamentTypeEnum;
    (function (tournamentTypeEnum) {
        /** Single elimination */
        tournamentTypeEnum["SINGLE_ELIMINATION"] = "single elimination";
        /** Double elimination */
        tournamentTypeEnum["DOUBLE_ELIMINATION"] = "double elimination";
        /** Round robin */
        tournamentTypeEnum["ROUND_ROBIN"] = "round robin";
        /** Swiss */
        tournamentTypeEnum["SWISS"] = "swiss";
    })(tournamentTypeEnum = TournamentInterfaces.tournamentTypeEnum || (TournamentInterfaces.tournamentTypeEnum = {}));
    /** Enum for tournaments state */
    let tournamentStateEnum;
    (function (tournamentStateEnum) {
        /** All tournaments */
        tournamentStateEnum["ALL"] = "all";
        /** Only pending tournaments */
        tournamentStateEnum["PENDING"] = "pending";
        /** Only in progress tournaments */
        tournamentStateEnum["IN_PROGRESS"] = "in_progress";
        /** Only ended tournaments */
        tournamentStateEnum["ENDED"] = "ended";
    })(tournamentStateEnum = TournamentInterfaces.tournamentStateEnum || (TournamentInterfaces.tournamentStateEnum = {}));
    /** Enum for the options for ranked_by */
    let tournamentRankedByEnum;
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
    })(tournamentRankedByEnum = TournamentInterfaces.tournamentRankedByEnum || (TournamentInterfaces.tournamentRankedByEnum = {}));
    /** Enum for the grand_finals_modifier parameter */
    let tournamentGrandFinalsModifierEnum;
    (function (tournamentGrandFinalsModifierEnum) {
        /** Give the winners bracket finalist two chances to beat the losers bracket finalist */
        tournamentGrandFinalsModifierEnum["DEFAULT"] = "";
        /** Create only one grand finals match */
        tournamentGrandFinalsModifierEnum["SINGLE_MATCH"] = "single match";
        /** Don't create a finals match between winners and losers bracket finalists */
        tournamentGrandFinalsModifierEnum["SKIP"] = "skip";
    })(tournamentGrandFinalsModifierEnum = TournamentInterfaces.tournamentGrandFinalsModifierEnum || (TournamentInterfaces.tournamentGrandFinalsModifierEnum = {}));
})(TournamentInterfaces = exports.TournamentInterfaces || (exports.TournamentInterfaces = {}));
