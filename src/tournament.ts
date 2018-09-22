import ChallongeBase from './base';
import Participant from './participant';
import Match from './match';
import * as tournamentInterfaces from './interfaces/tournament.interface';
import { show, update, destroy, processCheckIns, abortCheckIns, start, finalize, reset, openForPredictions } from './adapter/tournaments';
import * as participantInterfaces from './interfaces/participant.interface';
import { index as participantIndex, create, bulkAdd, clear, randomize } from './adapter/participants';
import { index as matchIndex } from './adapter/matches';

export default class Tournament extends ChallongeBase {
  baseUrl: string;
  participants: Array<Participant>;
  matches: Array<Match>

  accept_attachments: boolean;
  allow_participant_match_reporting: boolean;
  anonymous_voting: boolean;
  category: string;
  check_in_duration: number;
  completed_at: string;
  created_at: string;
  created_by_api: boolean;
  credit_capped: boolean;
  description: "";
  game_id: number;
  group_stages_enabled: boolean;
  hide_forum: boolean;
  hide_seeds: boolean;
  hold_third_place_match: boolean;
  /** id of the tournament on Challonge */
  id: number;
  max_predictions_per_user: number;
  /** Public tournament name */
  name: string;
  notify_users_when_matches_open: boolean;
  notify_users_when_the_tournament_ends: boolean;
  open_signup: boolean;
  participants_count: number;
  prediction_method: number;
  predictions_opened_at: string;
  private: boolean;
  progress_meter: number;
  /** Number between 0 and 1 */
  pts_for_bye: string;
  /** Number between 0 and 1 */
  pts_for_game_tie: string;
  /** Number between 0 and 1 */
  pts_for_game_win: string;
  /** Number between 0 and 1 */
  pts_for_match_tie: string;
  /** Number between 0 and 1 */
  pts_for_match_win: string;
  quick_advance: boolean;
  ranked_by: tournamentInterfaces.tournamentRankedByType;
  require_score_agreement: boolean;
  /** Number between 0 and 1 */
  rr_pts_for_game_tie: string;
  /** Number between 0 and 1 */
  rr_pts_for_game_win: string;
  /** Number between 0 and 1 */
  rr_pts_for_match_tie: string;
  /** Number between 0 and 1 */
  rr_pts_for_match_win: string;
  sequential_pairings: boolean;
  show_rounds: boolean;
  signup_cap: number;
  start_at: string;
  started_at: string;
  started_checking_in_at: string;
  state: string;
  swiss_rounds: number;
  teams: boolean;
  tie_breaks: Array<tournamentInterfaces.tournamentTieBreakType>;
  locked_at: string;
  event_id: number;
  public_predictions_before_start_time: string;
  ranked: boolean;
  grand_finals_modifier: tournamentInterfaces.tournamentGrandFinalsModifier;
  spam: boolean;
  ham: string;
  rr_iterations: number;
  predict_the_losers_bracket: boolean;
  tournament_registration_id: number;
  donation_contest_enabled: boolean;
  mandatory_donation: boolean;
  tournament_type: tournamentInterfaces.tournamentTypeType;
  updated_at: string;
  url: string;
  description_source: string;
  subdomain: string;
  full_challonge_url: string;
  live_image_url: string;
  sign_up_url: string;
  review_before_finalizing: boolean;
  accepting_predictions: boolean;
  participants_locked: boolean;
  game_name: string;
  participants_swappable: boolean;
  team_convertable: boolean;
  group_stages_were_started: boolean;

  constructor(api_key: string, public data: tournamentInterfaces.tournamentResponseObject) {
    super(api_key);

    this.baseUrl = this.generateUrl(data.url, data.subdomain);
    this.processTournamentData(data, {});
  }

  public get(params?: tournamentInterfaces.showTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      show(this.api_key, this.baseUrl, params).then(res => {
        this.processTournamentData(res.tournament, params);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  public update(params?: tournamentInterfaces.updateTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      update(this.api_key, this.baseUrl, params).then(res => {
        this.processTournamentData(res.tournament, params);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  public delete(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      destroy(this.api_key, this.baseUrl).then(res => {
        if(res.status = 200) { this.api_key = undefined; resolve(true); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public processCheckIns(params?: tournamentInterfaces.processCheckInsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      processCheckIns(this.api_key, this.baseUrl, params).then(res => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public abortCheckIns(params?: tournamentInterfaces.abortCheckInsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      abortCheckIns(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public startTournament(params?: tournamentInterfaces.startRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      start(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public finalizeResults(params?: tournamentInterfaces.finalizeRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      finalize(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public resetTournament(params?: tournamentInterfaces.resetRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      reset(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public openForPredictions(params: tournamentInterfaces.openForPredictionsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      openForPredictions(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processTournamentData(res.tournament, params); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public getParticipants(): Promise<Array<Participant>> {
    return new Promise((resolve, reject) => {
      participantIndex(this.api_key, this.baseUrl).then((res) => {
        if(res.status = 200) { resolve(this.processParticipants(res.participants)); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public newParticipant(params: participantInterfaces.participantParameters): Promise<Participant> {
    return new Promise((resolve, reject) => {
      create(this.api_key, this.baseUrl, { participant: params }).then((res) => {
        if(res.status = 200) { resolve(this.processParticipant(res.participant)); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public bulkAddParticipants(params: participantInterfaces.bulkAddParticipantsRequest): Promise<Array<Participant>> {
    return new Promise((resolve, reject) => {
      bulkAdd(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this.processParticipants(res.participants)); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public clearParticipants(): Promise<string> {
    return new Promise((resolve, reject) => {
      clear(this.api_key, this.baseUrl).then((res) => {
        if(res.status = 200) { this.participants = []; resolve(res.message); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public randomizeParticipants(): Promise<Array<Participant>> {
    return new Promise((resolve, reject) => {
      randomize(this.api_key, this.baseUrl).then((res) => {
        if(res.status = 200) { resolve(this.processParticipants(res.participants)); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public getMatches(): Promise<Array<Match>> {
    return new Promise((resolve, reject) => {
      matchIndex(this.api_key, this.baseUrl).then((res) => {
        if(res.status = 200) { resolve(this.processMatches(res.matches)); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  private processTournamentData(data: tournamentInterfaces.tournamentResponseObject, params) {
    const { participants, matches, ...values } = data;

    if(params){
      if(params.include_participants == 1 && participants) {
        this.processParticipants(participants)
      }
      if(params.include_matches == 1 && matches) {
        this.processParticipants(matches)
      }  
    }

    Object.assign(this, values);
  }
  
  private processParticipants(participants) {
    this.participants = participants.map(participant => {
      return this.processParticipant(participant.participant);
    });

    return this.participants;
  }

  private processParticipant(participant) {
    return new Participant(this.api_key, this.baseUrl, participant.id, participant)
  }
  
  private processMatches(matches) {
    this.matches = matches.map(match => {
      return this.processMatch(match.match);
    });

    return this.matches;
  }

  private processMatch(match) {
    return new Match(this.api_key, this.baseUrl, match.id, match)
  }

  /** Create a tournament url */
  public generateUrl(url: string, subdomain: string) {
    if(!subdomain) {
      return url;
    } else {
      return `${subdomain}-${url}`;
    }
  }
}