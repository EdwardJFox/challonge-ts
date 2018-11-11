
declare class Attachment {
	constructor(api_key: string, baseUrl: string, match_id: number, id: number, data?: matchAttachmentInterfaces.matchAttachmentResponseObject);

	get(): Promise<Attachment>;

	update(params?: matchAttachmentInterfaces.matchAttachmentRequestObject): Promise<Attachment>;

	delete(): Promise<boolean>;
}

export class Challonge {
	constructor(api_key: string);

	getTournaments(params?: tournamentInterfaces.indexTournamentsRequest): Promise<Array<Tournament>>;

	createTournament(params: tournamentInterfaces.strictTournamentParameters): Promise<Tournament>;
}

export class Match {
	constructor(api_key: string, baseUrl: string, id: number, data?: matchInterfaces.matchResponseObject);

	get(): Promise<Match>;

	update(params?: matchInterfaces.matchUpdateRequestObject): Promise<Match>;

	selectWinner(winner_id: number, scores: string): Promise<Match>;

	reopen(): Promise<Match>;

	getAllAttachments(): Promise<Array<Attachment>>;

	createAttachment(params?: matchAttachmentInterfaces.matchAttachmentRequestObject): Promise<Attachment>;

	processAttachment(attachments): Array<Attachment>;

	processAttachments(attachment): Attachment;
}

export class Participant {
	constructor(api_key: string, baseUrl: string, id: number, data?: participantInterfaces.participantResponseObject);

	get(): Promise<Participant>;

	update(params?: participantInterfaces.updateParticipantRequest): Promise<Participant>;

	checkIn(): void;
	
	undoCheckIn(): void;

	destroy(): void;
}

export class Tournament {
	constructor(api_key: string, data: tournamentInterfaces.tournamentResponseObject);

	get(params?: tournamentInterfaces.showTournamentRequest): Promise<Tournament>;

	update(params?: tournamentInterfaces.updateTournamentRequest): Promise<Tournament>;

	delete(): Promise<Boolean>;

	processCheckIns(params?: tournamentInterfaces.processCheckInsRequest): Promise<Tournament>;

	abortCheckIns(params?: tournamentInterfaces.abortCheckInsRequest): Promise<Tournament>;

	startTournament(params?: tournamentInterfaces.startRequest): Promise<Tournament>;

	finalizeResults(params?: tournamentInterfaces.finalizeRequest): Promise<Tournament>;

	resetTournament(params?: tournamentInterfaces.resetRequest): Promise<Tournament>;

	openForPredictions(params: tournamentInterfaces.openForPredictionsRequest): Promise<Tournament>;

	getParticipants(): Promise<Array<Participant>>;

	newParticipant(params: participantInterfaces.participantParameters): Promise<Participant>;

	bulkAddParticipants(params: participantInterfaces.bulkAddParticipantsRequest): Promise<Array<Participant>>;

	clearParticipants(): Promise<string>;

	randomizeParticipants(): Promise<Array<Participant>>;

	getMatches(): Promise<Array<Match>>;

	generateUrl(...args: any[]): void;
	
	private processTournamentData(data: tournamentInterfaces.tournamentResponseObject, params?): void;

	private processMatch(match): void;

	private processMatches(matches): void;

	private processParticipants(participants): void;

	private processParticipant(participant): void;
}

export namespace MatchAdapter {
	function index(api_key: string, tournament_url: string): Promise<matchInterfaces.indexMatchesResponse>;

	function show(api_key: string, tournament_url: string, match_id: number): Promise<matchInterfaces.showMatchResponse>;

	function update(api_key: string, tournament_url: string, match_id: number, params: matchInterfaces.updateMatchesRequest): Promise<matchInterfaces.updateMatchResponse>;

	function reopen(api_key: string, tournament_url: string, match_id: number): Promise<matchInterfaces.reopenMatchResponse>;
}

export namespace MatchAttachmentAdapter {
	function index(api_key: string, tournament_url: string, match_id: number): Promise<matchAttachmentInterfaces.indexMatchAttachmentsResponse>;

	function create(api_key: string, tournament_url: string, match_id: number, params: matchAttachmentInterfaces.createMatchAttachmentRequest): Promise<matchAttachmentInterfaces.createMatchAttachmentResponse>;
	
	function show(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<matchAttachmentInterfaces.showMatchAttachmentResponse>;

	function update(api_key: string, tournament_url: string, match_id: number, attachment_id: number, params: matchAttachmentInterfaces.updateMatchAttachmentRequest): Promise<matchAttachmentInterfaces.updateMatchAttachmentResponse>;
	
	function destroy(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<matchAttachmentInterfaces.destroyMatchAttachmentResponse>;
}

export namespace ParticipantAdapter {
	function index(api_key: string, tournament_url: string): Promise<participantInterfaces.indexParticipantsResponse>;

	function create(api_key: string, tournament_url: string, params: participantInterfaces.createParticipantRequest): Promise<participantInterfaces.createParticipantResponse>;

	function bulkAdd(api_key: string, tournament_url: string, params: participantInterfaces.bulkAddParticipantsRequest): Promise<participantInterfaces.bulkAddParticipantsResposne>;

	function show(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.showParticipantResponse>;

	function update(api_key: string, tournament_url: string, participant_id: number, params: participantInterfaces.updateParticipantRequest): Promise<participantInterfaces.updateParticipantResponse>;

	function checkIn(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.checkInParticipantResponse>;

	function undoCheckIn(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.checkInParticipantResponse>;

	function destroy(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.destroyParticipantResponse>;

	function clear(api_key: string, tournament_url: string): Promise<participantInterfaces.clearParticipantsResponse>;

	function randomize(api_key: string, tournament_url: string): Promise<participantInterfaces.randomizeParticipantsResponse>;

}

declare namespace TournamentAdapter {
	function abortCheckIns(api_key: string, tournament_url: string, params?: tournamentInterfaces.abortCheckInsRequest): Promise<tournamentInterfaces.abortCheckInsTournamentResponse>

	function create(api_key: string, params: tournamentInterfaces.createTournamentRequest): Promise<tournamentInterfaces.createTournamentResponse>;
	
	function destroy(api_key: string, tournament_url: string): Promise<tournamentInterfaces.destroyTournamentResponse>
	
	function finalize(api_key: string, tournament_url: string, params?: tournamentInterfaces.finalizeRequest): Promise<tournamentInterfaces.finalizeTournamentResponse>
	
	function index(api_key: string, params: tournamentInterfaces.indexTournamentsRequest): Promise<tournamentInterfaces.indexTournamentsResponse>;

	function openForPredictions(api_key: string, tournament_url: string, params?: tournamentInterfaces.openForPredictionsRequest): Promise<tournamentInterfaces.openForPredictionsTournamentResponse>

	function processCheckIns(api_key: string, tournament_url: string, params?: tournamentInterfaces.processCheckInsRequest): Promise<tournamentInterfaces.processCheckInsTournamentResponse>

	function reset(api_key: string, tournament_url: string, params?: tournamentInterfaces.resetRequest): Promise<tournamentInterfaces.resetTournamentResponse>

	function show(api_key: string, tournament_url: string, params?: tournamentInterfaces.showTournamentRequest): Promise<tournamentInterfaces.showTournamentResponse>

	function start(api_key: string, tournament_url: string, params?: tournamentInterfaces.startRequest): Promise<tournamentInterfaces.startTournamentResponse>

	function update(api_key: string, tournament_url: string, params?: tournamentInterfaces.updateTournamentRequest): Promise<tournamentInterfaces.updateTournamentResponse>
}
export interface baseTournamentRequest {
  tournament_name: string;
  group?: string;
}

export interface baseResponse {
  status: number
}

export interface matchActions {
  /** Include an array of associated attachment records */
  include_attachments?: 0 | 1;
}

/** Requests */
/** Parameter interface for a tournaments match index endpoint */
export interface indexMatchesRequest {
  /** all (default), pending, open, complete */
  state?: matchStateType
  /** Only retrieve matches that include the specified participant. */
  participant_id?: number
}

/** Parameter interface for getting a single match endpoint */
export interface showMatchesRequest extends matchActions {
}

/** Parameters for getting a single match endpoint */
export interface updateMatchesRequest {
  match: matchUpdateRequestObject
}

export interface matchUpdateRequestObject {
  /** Comma separated set/game scores with player 1 score first
   * (e.g. "1-3,3-0,3-2") */
  scores_csv?: string
  /** The participant ID of the winner or "tie" if applicable (Round Robin and 
   * Swiss). NOTE: If you change the outcome of a completed match, all matches 
   * in the bracket that branch from the updated match will be reset. */
  winner_id?: number
  /** Overwrites the number of votes for player 1 */
  player1_votes?: number
  /** Overwrites the number of votes for player 2 */
  player2_votes?: number
}


/** Responses */
/** Response expected from the index matches endpoint */
export interface indexMatchesResponse extends baseResponse {
  matches: Array<matchResponseObject>
}

/** Response expected from the show match endpoint */
export interface showMatchResponse extends baseResponse {
  match: matchResponseObject
}

/** Response expected from the update match endpoint */
export interface updateMatchResponse extends baseResponse {
  match: matchResponseObject
}

/** Response expected from the update match endpoint */
export interface reopenMatchResponse extends baseResponse {
  match: matchResponseObject
}

/** Match response object */
export interface matchResponseObject {
  attachment_count: number,
  created_at: Date,
  group_id: number,
  has_attachment: false,
  id: number,
  identifier: string,
  location: string,
  loser_id: number,
  player1_id: number,
  player1_is_prereq_match_loser: boolean,
  player1_prereq_match_id: number,
  player1_votes: number,
  player2_id: number,
  player2_is_prereq_match_loser: boolean,
  player2_prereq_match_id: number,
  player2_votes: number,
  round: number,
  scheduled_time: Date,
  started_at: Date,
  state: matchStateType,
  tournament_id: number,
  underway_at: Date,
  updated_at: Date,
  winner_id: number,
  prerequisite_match_ids_csv: string,
  scores_csv: string
}

export type matchStateType = 'open' | 'pending' | 'complete';

/**
 * At least 1 of the 3 optional parameters must be provided.
 * Files up to 25MB are allowed for tournaments hosted by Premier badge 
 * Challonge Premier subscribers.
 */
export interface matchAttachmentRequestObject {
  /**  A file upload (250KB max, no more than 4 attachments per match). If provided, the url parameter will be ignored.  */
  asset?: File;
  /**  A web URL  */
  url?: string;
  /**  Text to describe the file or URL attachment, or this can simply be standalone text.  */
  description?: string;
}

/** Requests */
/** Body expected for the create match attachment endpoint */
export interface createMatchAttachmentRequest {
  match_attachment: matchAttachmentRequestObject
}

/** Body expected for the update match attachment endpoint */
export interface updateMatchAttachmentRequest {
  match_attachment: matchAttachmentRequestObject
}

/** Responses */
/** Expected response from the index match attachments endpoint */
export interface indexMatchAttachmentsResponse extends baseResponse {
  attachments: Array<matchAttachmentResponseObject>
}

/** Expected response from the create match attachments endpoint */
export interface createMatchAttachmentResponse extends baseResponse {
  match_attachment: matchAttachmentResponseObjectFields
}

/** Expected response from the show match attachment endpoint */
export interface showMatchAttachmentResponse extends baseResponse {
  match_attachment: matchAttachmentResponseObjectFields
}

/** Expected response from the update match attachment endpoint */
export interface updateMatchAttachmentResponse extends baseResponse {
  match_attachment: matchAttachmentResponseObjectFields
}

/** Expected response from the destroy match attachment endpoint */
export interface destroyMatchAttachmentResponse extends baseResponse {
  match_attachment: matchAttachmentResponseObjectFields
}


/** Response wrapping a match attachment */
export interface matchAttachmentResponseObject {
  match_attachment: matchAttachmentResponseObjectFields
}

/** Match attachment fields */
export interface matchAttachmentResponseObjectFields {
  id: number,
  match_id: number,
  user_id: number,
  description?: string,
  url?: string,
  original_file_name?: string,
  created_at?: Date,
  updated_at?: Date,
  asset_file_name?: string,
  asset_content_type?: string,
  asset_file_size?: number,
  asset_url?: string
}

export interface participantActions {
  /** Include an array of associated match records */
  include_matches: 0 | 1;
}

/** Parameters */

/** Parameters for creating a participant */
export interface participantParameters {
  /**  The name displayed in the bracket/schedule - not required if email or 
   * challonge_username is provided. Must be unique per tournament.  */
  name?: string
  /**  Provide this if the participant has a Challonge account. He or she will 
   * be invited to the tournament.  */
  challonge_username?: string
  /**  Providing this will first search for a matching Challonge account. If 
   * one is found, this will have the same effect as the "challonge_username" 
   * attribute. If one is not found, the "new-user-email" attribute will be 
   * set, and the user will be invited via email to create an account.  */
  email?: string
  /**  integer - The participant's new seed. Must be between 1 and the current 
   * number of participants (including the new record). Overwriting an existing 
   * seed will automatically bump other participants as you would expect.  */
  seed?: number
  /**  string - Max: 255 characters. Multi-purpose field that is only visible 
   * via the API and handy for site integration (e.g. key to your users table)*/
  misc?: string
}

/** Parameters for creating a participant */
export interface bulkAddParticipantParameters {
  /**  The name displayed in the bracket/schedule - not required if email or 
   * challonge_username is provided. Must be unique per tournament.  */
  name?: string
  /**  Username can be provided if the participant has a Challonge account. 
   * Providing email will first search for a matching Challonge account. If one 
   * is found, the user will be invited. If not, the "new-user-email" attribute 
   * will be set, and the user will be invited via email to create an account. */
  invite_name_or_email?: string
  /**  integer - The participant's new seed. Must be between 1 and the current 
   * number of participants (including the new record). Overwriting an existing 
   * seed will automatically bump other participants as you would expect.  */
  seed?: number
  /**  string - Max: 255 characters. Multi-purpose field that is only visible 
   * via the API and handy for site integration (e.g. key to your users table)*/
  misc?: string
}

/** Requests */
/** Response expected from index on participants */

/** Parameter interface for the Create Participant endpoint */
export interface createParticipantRequest {
  /** Tournament object */
  participant: participantParameters
}

/** Parameter interface for bulk adding multiple participants to a tournament */
export interface bulkAddParticipantsRequest {
  participants: Array<bulkAddParticipantParameters>
}

/** Parameter interface for the updating a Participant endpoint */
export interface updateParticipantRequest {
  /** Tournament object */
  participant: participantParameters
}

/** Responses */
/** Response expected from the index participant endpoint */
export interface indexParticipantsResponse extends baseResponse {
  participants: Array<participantResponseObject>
}

/** Response expected from the create participant endpoint */
export interface createParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from bulk adding participants endpoint */
export interface bulkAddParticipantsResposne extends baseResponse {
  participants: participantResponseObject
}

/** Response expected from the show participant endpoint */
export interface showParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the update participant endpoint */
export interface updateParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the check in participant endpoint */
export interface checkInParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the undo check in participant endpoint */
export interface undoCheckInParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the destroy participant endpoint */
export interface destroyParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the clear participants endpoint */
export interface clearParticipantsResponse extends baseResponse {
  message: string
}

/** Response expected from the randomize participants endpoint */
export interface randomizeParticipantsResponse extends baseResponse {
  participants: Array<participantResponseObject>
}

/** Resposne objects */
/** Participant object used in responses which contain participants */
export interface participantResponseObject {
  active: boolean
  checked_in_at: null
  created_at: string
  final_rank: number
  group_id: number
  icon: string
  id: number
  invitation_id: number
  invite_email: null
  misc: string
  name: string
  on_waiting_list: boolean
  seed: number
  tournament_id: number
  updated_at: string
  challonge_username: string
  challonge_email_address_verified: null
  removable: boolean
  participatable_or_invitation_attached: boolean
  confirm_remove: boolean
  invitation_pending: boolean
  display_name_with_invitation_email_address: string
  email_hash: string
  username: string
  attached_participatable_portrait_url: string
  can_check_in: boolean
  checked_in: boolean
  reactivatable: boolean
  ranked_member_id: number
  display_name: string
  check_in_open: boolean
  group_player_ids: Array<number>
  has_irrelevant_seed: boolean
}

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
export interface indexTournamentsRequest {
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
export interface createTournamentRequest {
  /** Tournament object */
  tournament: strictTournamentParameters
}

/** Parameter interface for the Show Tournament endpoint */
export interface showTournamentRequest extends tournamentAction {
}

/** Parameter interface for the Update Tournament endpoint */
export interface updateTournamentRequest extends tournamentParameters {
}

/** Parameter interface for the Process check-in endpoint  */
export interface processCheckInsRequest extends tournamentAction {
}

/** Parameter interface for the abort check-in endpoint  */
export interface abortCheckInsRequest extends tournamentAction {
}

/** Parameter interface for the start tournament endpoint  */
export interface startRequest extends tournamentAction {
}

/** Parameter interface for finalizing a tournaments results endpoint  */
export interface finalizeRequest extends tournamentAction {
}

/** Parameter interface for restarting a tournament endpoint  */
export interface resetRequest extends tournamentAction {
}

/** Parameter interface for opening a tournaments predictions endpoint */
export interface openForPredictionsRequest extends tournamentAction {
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
  category: string,
  check_in_duration: number,
  completed_at: string,
  created_at: string,
  created_by_api: boolean,
  credit_capped: boolean,
  description: "",
  game_id: number,
  group_stages_enabled: boolean,
  hide_forum: boolean,
  hide_seeds: boolean,
  hold_third_place_match: boolean,
  /** id of the tournament on Challonge */
  id: number,
  max_predictions_per_user: number,
  /** Public tournament name */
  name: string,
  notify_users_when_matches_open: boolean,
  notify_users_when_the_tournament_ends: boolean,
  open_signup: boolean,
  participants_count: number,
  prediction_method: number,
  predictions_opened_at: string,
  private: boolean,
  progress_meter: number,
  /** Number between 0 and 1 */
  pts_for_bye: string,
  /** Number between 0 and 1 */
  pts_for_game_tie: string,
  /** Number between 0 and 1 */
  pts_for_game_win: string,
  /** Number between 0 and 1 */
  pts_for_match_tie: string,
  /** Number between 0 and 1 */
  pts_for_match_win: string,
  quick_advance: boolean,
  ranked_by: tournamentRankedByType,
  require_score_agreement: boolean,
  /** Number between 0 and 1 */
  rr_pts_for_game_tie: string,
  /** Number between 0 and 1 */
  rr_pts_for_game_win: string,
  /** Number between 0 and 1 */
  rr_pts_for_match_tie: string,
  /** Number between 0 and 1 */
  rr_pts_for_match_win: string,
  sequential_pairings: boolean,
  show_rounds: boolean,
  signup_cap: number,
  start_at: string,
  started_at: string,
  started_checking_in_at: string,
  state: string,
  swiss_rounds: number,
  teams: boolean,
  tie_breaks: Array<tournamentTieBreakType>,
  locked_at: string,
  event_id: number,
  public_predictions_before_start_time: string,
  ranked: boolean,
  grand_finals_modifier: tournamentGrandFinalsModifier,
  spam: boolean,
  ham: string,
  rr_iterations: number,
  predict_the_losers_bracket: boolean,
  tournament_registration_id: number,
  donation_contest_enabled: boolean,
  mandatory_donation: boolean,
  tournament_type: tournamentTypeType,
  updated_at: string,
  url: string,
  description_source: string,
  subdomain: string,
  full_challonge_url: string,
  live_image_url: string,
  sign_up_url: string,
  review_before_finalizing: boolean,
  accepting_predictions: boolean,
  participants_locked: boolean,
  game_name: string,
  participants_swappable: boolean,
  team_convertable: boolean,
  group_stages_were_started: boolean,
  participants?: Array<participantResponseObject>,
  matches?: Array<matchResponseObject>
}

export type tournamentRankedByType = 'match wins' | 'game wins' | 'game win percentage' | 'points scored' | 'points difference' | 'custom';
export type tournamentTypeType = 'single elimination' | 'double elimination' | 'round robin';
export type tournamentTieBreakType = 'match wins vs tied' | 'game wins' | 'points scored';
export type tournamentGrandFinalsModifier = 'single match' | 'skip'