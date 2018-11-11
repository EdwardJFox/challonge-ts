import * as matchAttachmentInterfaces from './interfaces/matchAttachment.interface';
import * as tournamentInterfaces from './interfaces/tournament.interface';
import * as matchInterfaces from './interfaces/match.interface';
import * as participantInterfaces from './interfaces/participant.interface';

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