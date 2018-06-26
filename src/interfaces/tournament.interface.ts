import { baseResponse } from './base.interface';

/** Tournament Interfaces */

/** Enums */
/** Enum for the options for tournament_type */
export enum tournamentTypeEnum {
  /** Single elimination */
  SINGLE_ELIMINATION = 'single elimination',
  /** Double elimination */
  DOUBLE_ELIMINATION = 'double elimination',
  /** Round robin */
  ROUND_ROBIN = 'round robin',
  /** Swiss */
  SWISS = 'swiss'
}

/** Enum for tournaments state */
export enum tournamentStateEnum {
  /** All tournaments */
  ALL = 'all',
  /** Only pending tournaments */
  PENDING = 'pending',
  /** Only in progress tournaments */
  IN_PROGRESS = 'in_progress',
  /** Only ended tournaments */
  ENDED = 'ended'
}

/** Enum for the options for ranked_by */
export enum tournamentRankedByEnum {
  /** Match wins */
  MATCH_WINS = 'match wins',
  /** Game wins */
  GAME_WINS = 'game wins',
  /** Points scored */
  POINTS_SCORED = 'points scored',
  /** Points difference */
  POINTS_DIFFERENCE = 'points difference',
  /** Custom */
  CUSTOM = 'custom'
}

/** Enum for the grand_finals_modifier parameter */
export enum tournamentGrandFinalsModifierEnum {
  /** Give the winners bracket finalist two chances to beat the losers bracket finalist */
  DEFAULT = '',
  /** Create only one grand finals match */
  SINGLE_MATCH = 'single match',
  /** Don't create a finals match between winners and losers bracket finalists */
  SKIP = 'skip'
}

/** API request interfaces */
/** List tournaments (index) interface */
export interface indexTournaments {
  /** What state of tournaments to index */
  state?: tournamentStateEnum
  /** Type of tournament to index */
  type?: tournamentTypeEnum
  /** Tournaments created after date; format YYYY-MM-DD */
  created_after?: string
  /** Tournaments created before date; format YYYY-MM-DD */
  created_before?: string
  /** A Challonge subdomain you've published tournaments to. NOTE: Until v2 of 
   * our API, the subdomain parameter is required to retrieve a list of your 
   * organization-hosted tournaments. */
  subdomain?: string
}

/** Parameter interface for the Create Tournament endpoint */
export interface createTournament {
  /** Tournament object */
  tournament: strictTournamentParameters
}

/** Parameter interface for the Show Tournament endpoint */
export interface showTournament extends tournamentAction {
}

/** Parameter interface for the Update Tournament endpoint */
export interface updateTournament extends tournamentParameters {
}

/** Parameter interface for the Process check-in endpoint  */
export interface processCheckIns extends tournamentAction {
}

/** Parameter interface for the abort check-in endpoint  */
export interface abortCheckIns extends tournamentAction {
}

/** Parameter interface for the start tournament endpoint  */
export interface start extends tournamentAction {
}

/** Parameter interface for finalizing a tournaments results endpoint  */
export interface finalize extends tournamentAction {
}

/** Parameter interface for restarting a tournament endpoint  */
export interface reset extends tournamentAction {
}

/** Parameter interface for opening a tournaments predictions endpoint */
export interface openForPredictions extends tournamentAction {
}

/** Parameters for creating a tournament */
export interface tournamentParameters {
  /** Your event's name/title (Max: 60 characters) */
  name?: string
  /** Single elimination (default), double elimination, round robin, swiss */
  tournament_type?: tournamentTypeEnum
  /** challonge.com/url (letters, numbers, and underscores only) */
  url?: string
  /** subdomain.challonge.com/url (Requires write access to the specified subdomain) */
  subdomain?: string
  /** Description/instructions to be displayed above the bracket */
  description?: string
  /** Have Challonge host a sign-up page (otherwise, you manually add all participants) */
  open_signup?: boolean
  /** Single Elimination only. Include a match between semifinal losers? (default: false) */
  hold_third_place_match?: boolean
  /** Decimal (to the nearest tenth) - Swiss only - default: 1.0 */
  pts_for_match_win?: number
  /** Decimal (to the nearest tenth) - Swiss only - default: 0.5 */
  pts_for_match_tie?: number
  /** Decimal (to the nearest tenth) - Swiss only - default: 0.0 */
  pts_for_game_win?: number
  /** Decimal (to the nearest tenth) - Swiss only - default: 0.0 */
  pts_for_game_tie?: number
  /** Decimal (to the nearest tenth) - Swiss only - default: 1.0 */
  pts_for_bye?: number
  /** Swiss only - We recommend limiting the number of rounds to less than two-thirds the number of players. Otherwise, an [impossible pairing situation](https://answers.yahoo.com/question/index?qid=20100618162115AA6L78m) can be reached and your tournament may end before the desired number of rounds are played. */
  swiss_rounds?: number
  /** Round robin ranking, [see more](http://feedback.challonge.com/knowledgebase/articles/448540-rank-tie-break-statistics) */
  ranked_by?: tournamentRankedByEnum
  /** Decimal (to the nearest tenth) - Round Robin "custom only" - default: 1.0 */
  rr_pts_for_match_win?: number
  /** Decimal (to the nearest tenth) - Round Robin "custom only" - default: 0.5 */
  rr_pts_for_match_tie?: number
  /** Decimal (to the nearest tenth) - Round Robin "custom only" - default: 0.0 */
  rr_pts_for_game_win?: number
  /** Decimal (to the nearest tenth) - Round Robin "custom only" - default: 0.0 */
  rr_pts_for_game_tie?: number
  /** Allow match attachment uploads (default: false) */
  accept_attachments?: boolean
  /** Hide the forum tab on your Challonge page (default: false) */
  hide_forum?: boolean
  /** Single & Double Elimination only - Label each round above the bracket (default: false) */
  show_rounds?: boolean
  /** ide this tournament from the public browsable index and your profile (default: false) */
  private?: boolean
  /** Email registered Challonge participants when matches open up for them (default: false) */
  notify_users_when_matches_open?: boolean
  /** Email registered Challonge participants the results when this tournament ends (default: false) */
  notify_users_when_the_tournament_ends?: boolean
  /** Instead of traditional seeding rules, make pairings by going straight down the list of participants. First round matches are filled in top to bottom, then qualifying matches (if applicable). (default: false) */
  sequential_pairings?: boolean
  /** Maximum number of participants in the bracket. A waiting list (attribute on Participant) will capture participants once the cap is reached. */
  signup_cap?: number
  /** The planned or anticipated start time for the tournament (Used with check_in_duration to determine participant check-in window). Timezone defaults to Eastern. */
  start_at?: Date
  /** Length of the participant check-in window in minutes. */
  check_in_duration?: number
  /** This option only affects double elimination */
  grand_finals_modifier?: tournamentGrandFinalsModifierEnum
}

/** Same as tournamentParameters but with name and url being strictly required */
export interface strictTournamentParameters extends tournamentParameters {
  /** Your event's name/title (Max: 60 characters) */
  name: string
  /** challonge.com/url (letters, numbers, and underscores only) */
  url: string
}

/** Start a tournament, opening up first round matches for score reporting. The tournament must have at least 2 participants. */
export interface tournamentAction {
  /** Include an array of associated participant records */
  include_participants?: 0 | 1;
  /** Include an array of associated match records */
  include_matches?: 0 | 1;
}

/** Tournament responses */

/** Response expected from index on tournaments */
export interface indexTournamentsResponse extends baseResponse {
  tournaments: Array<tournamentResponseObject>;
}

/** Response expected from create tournaments */
export interface createTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected from show tournament */
export interface showTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected from update tournament */
export interface updateTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected from destroy tournament */
export interface destroyTournamentResponse extends baseResponse {
}

/** Response expected when processing check ins for tournament */
export interface processCheckInsTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected when aborting check ins for tournament */
export interface abortCheckInsTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected when aborting check ins for tournament */
export interface startTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected when finalising a tournaments results */
export interface finalizeTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected when restarting a tournament */
export interface resetTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Response expected when restarting a tournament */
export interface openForPredictionsTournamentResponse extends baseResponse {
  tournament: tournamentResponseObject;
}

/** Tournament response object */
export interface tournamentResponseObject {
  accept_attachments: boolean,
  allow_participant_match_reporting: boolean,
  anonymous_voting: boolean,
  category: null,
  check_in_duration: null,
  completed_at: null,
  created_at: Date,
  created_by_api: boolean,
  credit_capped: boolean,
  description: "",
  game_id: number,
  group_stages_enabled: boolean,
  hide_forum: boolean,
  hide_seeds: boolean,
  hold_third_place_match: boolean,
  id: number,
  max_predictions_per_user: number,
  name: string,
  notify_users_when_matches_open: boolean,
  notify_users_when_the_tournament_ends: boolean,
  open_signup: boolean,
  participants_count: number,
  prediction_method: number,
  predictions_opened_at: null,
  private: boolean,
  progress_meter: number,
  /** Number between 0 and 1 */
  pts_for_bye: number,
  /** Number between 0 and 1 */
  pts_for_game_tie: number,
  /** Number between 0 and 1 */
  pts_for_game_win: number,
  /** Number between 0 and 1 */
  pts_for_match_tie: number,
  /** Number between 0 and 1 */
  pts_for_match_win: number,
  quick_advance: boolean,
  ranked_by: tournamentRankedByType,
  require_score_agreement: boolean,
  /** Number between 0 and 1 */
  rr_pts_for_game_tie: number,
  /** Number between 0 and 1 */
  rr_pts_for_game_win: number,
  /** Number between 0 and 1 */
  rr_pts_for_match_tie: number,
  /** Number between 0 and 1 */
  rr_pts_for_match_win: number,
  sequential_pairings: boolean,
  show_rounds: boolean,
  signup_cap: null,
  start_at: null,
  started_at: Date,
  started_checking_in_at: null,
  state: string,
  swiss_rounds: number,
  teams: boolean,
  tie_breaks: Array<tournamentTieBreakType>,
  tournament_type: tournamentTypeType,
  updated_at: Date,
  url: string,
  description_source: string,
  subdomain: null,
  full_challonge_url: string,
  live_image_url: string,
  sign_up_url: null,
  review_before_finalizing: boolean,
  accepting_predictions: boolean,
  participants_locked: boolean,
  game_name: string,
  participants_swappable: boolean,
  team_convertable: boolean,
  group_stages_were_started: boolean
}

export type tournamentRankedByType = 'match wins' | 'game wins' | 'game win percentage' | 'points scored' | 'points difference' | 'custom';
export type tournamentTypeType = 'single elimination' | 'double elimination' | 'round robin';
export type tournamentTieBreakType = 'match wins vs tied' | 'game wins' | 'points scored';