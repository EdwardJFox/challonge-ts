import { MatchAttachmentInterfaces, MatchInterfaces, ParticipantInterfaces, TournamentInterfaces } from './';

declare class Attachment {
	constructor(api_key: string, baseUrl: string, match_id: number, id: number, data?: MatchAttachmentInterfaces.matchAttachmentResponseObject);

	get(): Promise<Attachment>;

	update(params?: MatchAttachmentInterfaces.matchAttachmentRequestObject): Promise<Attachment>;

	delete(): Promise<boolean>;
}

export class Challonge {
	constructor(api_key: string);

	getTournaments(params?: TournamentInterfaces.indexTournamentsRequest): Promise<Array<Tournament>>;

	createTournament(params: TournamentInterfaces.strictTournamentParameters): Promise<Tournament>;
}

export class Match {
	constructor(api_key: string, baseUrl: string, id: number, data?: MatchInterfaces.matchResponseObject);

	get(): Promise<Match>;

	update(params?: MatchInterfaces.matchUpdateRequestObject): Promise<Match>;

	selectWinner(winner_id: number, scores: string): Promise<Match>;

	reopen(): Promise<Match>;

	getAllAttachments(): Promise<Array<Attachment>>;

	createAttachment(params?: MatchAttachmentInterfaces.matchAttachmentRequestObject): Promise<Attachment>;

	processAttachment(attachments): Array<Attachment>;

	processAttachments(attachment): Attachment;
}

export class Participant {
	constructor(api_key: string, baseUrl: string, id: number, data?: ParticipantInterfaces.participantResponseObject);

	get(): Promise<Participant>;

	update(params?: ParticipantInterfaces.updateParticipantRequest): Promise<Participant>;

	checkIn(): void;
	
	undoCheckIn(): void;

	destroy(): void;
}

export class Tournament {
	constructor(api_key: string, data: TournamentInterfaces.tournamentResponseObject);

	get(params?: TournamentInterfaces.showTournamentRequest): Promise<Tournament>;

	update(params?: TournamentInterfaces.updateTournamentRequest): Promise<Tournament>;

	delete(): Promise<Boolean>;

	processCheckIns(params?: TournamentInterfaces.processCheckInsRequest): Promise<Tournament>;

	abortCheckIns(params?: TournamentInterfaces.abortCheckInsRequest): Promise<Tournament>;

	startTournament(params?: TournamentInterfaces.startRequest): Promise<Tournament>;

	finalizeResults(params?: TournamentInterfaces.finalizeRequest): Promise<Tournament>;

	resetTournament(params?: TournamentInterfaces.resetRequest): Promise<Tournament>;

	openForPredictions(params: TournamentInterfaces.openForPredictionsRequest): Promise<Tournament>;

	getParticipants(): Promise<Array<Participant>>;

	newParticipant(params: ParticipantInterfaces.participantParameters): Promise<Participant>;

	bulkAddParticipants(params: ParticipantInterfaces.bulkAddParticipantsRequest): Promise<Array<Participant>>;

	clearParticipants(): Promise<string>;

	randomizeParticipants(): Promise<Array<Participant>>;

	getMatches(): Promise<Array<Match>>;

	generateUrl(...args: any[]): void;
	
	private processTournamentData(data: TournamentInterfaces.tournamentResponseObject, params?): void;

	private processMatch(match): void;

	private processMatches(matches): void;

	private processParticipants(participants): void;

	private processParticipant(participant): void;
}

export namespace MatchAdapter {
	function index(api_key: string, tournament_url: string): Promise<MatchInterfaces.indexMatchesResponse>;

	function show(api_key: string, tournament_url: string, match_id: number): Promise<MatchInterfaces.showMatchResponse>;

	function update(api_key: string, tournament_url: string, match_id: number, params: MatchInterfaces.updateMatchesRequest): Promise<MatchInterfaces.updateMatchResponse>;

	function reopen(api_key: string, tournament_url: string, match_id: number): Promise<MatchInterfaces.reopenMatchResponse>;
}

export namespace MatchAttachmentAdapter {
	function index(api_key: string, tournament_url: string, match_id: number): Promise<MatchAttachmentInterfaces.indexMatchAttachmentsResponse>;

	function create(api_key: string, tournament_url: string, match_id: number, params: MatchAttachmentInterfaces.createMatchAttachmentRequest): Promise<MatchAttachmentInterfaces.createMatchAttachmentResponse>;
	
	function show(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<MatchAttachmentInterfaces.showMatchAttachmentResponse>;

	function update(api_key: string, tournament_url: string, match_id: number, attachment_id: number, params: MatchAttachmentInterfaces.updateMatchAttachmentRequest): Promise<MatchAttachmentInterfaces.updateMatchAttachmentResponse>;
	
	function destroy(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<MatchAttachmentInterfaces.destroyMatchAttachmentResponse>;
}

export namespace ParticipantAdapter {
	function index(api_key: string, tournament_url: string): Promise<ParticipantInterfaces.indexParticipantsResponse>;

	function create(api_key: string, tournament_url: string, params: ParticipantInterfaces.createParticipantRequest): Promise<ParticipantInterfaces.createParticipantResponse>;

	function bulkAdd(api_key: string, tournament_url: string, params: ParticipantInterfaces.bulkAddParticipantsRequest): Promise<ParticipantInterfaces.bulkAddParticipantsResposne>;

	function show(api_key: string, tournament_url: string, participant_id: number): Promise<ParticipantInterfaces.showParticipantResponse>;

	function update(api_key: string, tournament_url: string, participant_id: number, params: ParticipantInterfaces.updateParticipantRequest): Promise<ParticipantInterfaces.updateParticipantResponse>;

	function checkIn(api_key: string, tournament_url: string, participant_id: number): Promise<ParticipantInterfaces.checkInParticipantResponse>;

	function undoCheckIn(api_key: string, tournament_url: string, participant_id: number): Promise<ParticipantInterfaces.checkInParticipantResponse>;

	function destroy(api_key: string, tournament_url: string, participant_id: number): Promise<ParticipantInterfaces.destroyParticipantResponse>;

	function clear(api_key: string, tournament_url: string): Promise<ParticipantInterfaces.clearParticipantsResponse>;

	function randomize(api_key: string, tournament_url: string): Promise<ParticipantInterfaces.randomizeParticipantsResponse>;

}

declare namespace TournamentAdapter {
	function abortCheckIns(api_key: string, tournament_url: string, params?: TournamentInterfaces.abortCheckInsRequest): Promise<TournamentInterfaces.abortCheckInsTournamentResponse>

	function create(api_key: string, params: TournamentInterfaces.createTournamentRequest): Promise<TournamentInterfaces.createTournamentResponse>;
	
	function destroy(api_key: string, tournament_url: string): Promise<TournamentInterfaces.destroyTournamentResponse>
	
	function finalize(api_key: string, tournament_url: string, params?: TournamentInterfaces.finalizeRequest): Promise<TournamentInterfaces.finalizeTournamentResponse>
	
	function index(api_key: string, params?: TournamentInterfaces.indexTournamentsRequest): Promise<TournamentInterfaces.indexTournamentsResponse>;

	function openForPredictions(api_key: string, tournament_url: string, params?: TournamentInterfaces.openForPredictionsRequest): Promise<TournamentInterfaces.openForPredictionsTournamentResponse>

	function processCheckIns(api_key: string, tournament_url: string, params?: TournamentInterfaces.processCheckInsRequest): Promise<TournamentInterfaces.processCheckInsTournamentResponse>

	function reset(api_key: string, tournament_url: string, params?: TournamentInterfaces.resetRequest): Promise<TournamentInterfaces.resetTournamentResponse>

	function show(api_key: string, tournament_url: string, params?: TournamentInterfaces.showTournamentRequest): Promise<TournamentInterfaces.showTournamentResponse>

	function start(api_key: string, tournament_url: string, params?: TournamentInterfaces.startRequest): Promise<TournamentInterfaces.startTournamentResponse>

	function update(api_key: string, tournament_url: string, params?: TournamentInterfaces.updateTournamentRequest): Promise<TournamentInterfaces.updateTournamentResponse>
}