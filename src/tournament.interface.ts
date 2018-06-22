/** Tournament Interfaces */

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

/** Interface for the Create Tournament endpoint */
export interface createTournament {
  /** Tournament object */
  tournament: tournamentParameters
}

/** Interface for the Update Tournament endpoint */
export interface updateTournament {
  /** Tournament object */
  tournament: tournamentParameters
}

/** Interface for the Process check-in endpoint  */
export interface processCheckIns {
  /** Include an array of associated participant records in the response. Either 0 or 1 */
  include_participants: 0 | 1
  /** Include an array of associated match records in the response. Either 0 or 1 */
  include_matches: 0 | 1
}

/** Parameters for creating a tournament */
export interface tournamentParameters {
  /** Your event's name/title (Max: 60 characters) */
  name: string
  /** Single elimination (default), double elimination, round robin, swiss */
  tournament_type?: tournamentTypeEnum
  /** challonge.com/url (letters, numbers, and underscores only) */
  url: string
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

/** Start a tournament, opening up first round matches for score reporting. The tournament must have at least 2 participants. */
export interface tournamentAction {
  /** Include an array of associated participant records */
  include_participants: number;
  /** Include an array of associated match records */
  include_matches: number;
}

/** Tournament responses */

/** Response expected from getTournament */
export interface getTournamentsResponse {
  tournaments: Array<tournamentParameters>;
  status: number;
}