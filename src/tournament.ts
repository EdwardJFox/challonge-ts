import ChallongeBase from './base';
import Participant from './participant';
import Match from './match';
import * as tournamentInterfaces from './interfaces/tournament.interface';
import { show, update, destroy, processCheckIns, abortCheckIns, start, finalize, reset, openForPredictions } from './adapter/tournaments';
import { index, create, bulkAdd } from './adapter/participants';

export default class Tournament extends ChallongeBase {
  baseUrl: string;
  participants: Array<Participant>;
  matches: Array<Match>

  constructor(api_key: string, public data: tournamentInterfaces.tournamentResponseObject) {
    super(api_key);

    this.baseUrl = this.generateUrl(data.url, data.subdomain);
  }

  get(params?: tournamentInterfaces.showTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      show(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  update(params?: tournamentInterfaces.updateTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      update(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  delete(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      destroy(this.api_key, this.baseUrl).then(res => {
        if(res.status = 200) { resolve(true); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  processCheckIns(params?: tournamentInterfaces.processCheckInsRequest) {
    return new Promise((resolve, reject) => {
      processCheckIns(this.api_key, this.baseUrl, params).then(res => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  abortCheckIns(params?: tournamentInterfaces.abortCheckInsRequest) {
    return new Promise((resolve, reject) => {
      abortCheckIns(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  startTournament(params?: tournamentInterfaces.startRequest) {
    return new Promise((resolve, reject) => {
      start(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  finalizeResults(params?: tournamentInterfaces.finalizeRequest) {
    return new Promise((resolve, reject) => {
      finalize(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  resetTournament(params?: tournamentInterfaces.resetRequest) {
    return new Promise((resolve, reject) => {
      reset(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  openForPredictions(params: tournamentInterfaces.openForPredictionsRequest) {
    return new Promise((resolve, reject) => {
      openForPredictions(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  getParticipants() {

  }

  newParticipant() {

  }

  bulkAddParticipants() {

  }

  private processTournamentData(data: tournamentInterfaces.tournamentResponseObject, params) {
    if(params.include_participants == 1) {
      this.processParticipants(data.participants)
    }
    if(params.include_matches == 1) {
      this.processParticipants(data.matches)
    }
  }
  
  private processParticipants(participants) {
    participants.forEach(element => {
      
    });
  }
  
  private processMatches(matches) {

  }

  /** Create a tournament url */
  public generateUrl(url: string, subdomain: string) {
    if(subdomain) {
      return url;
    } else {
      return `${subdomain}-${url}`;
    }
  }
}