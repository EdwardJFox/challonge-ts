import ChallongeBase from './base';
import Participant from './participant';
import Match from './match';
import * as tournamentInterfaces from './interfaces/tournament.interface';
import { show, update, destroy, processCheckIns, abortCheckIns, start, finalize, reset, openForPredictions } from './adapter/tournaments';
import * as participantInterfaces from './interfaces/participant.interface';
import { index, create, bulkAdd } from './adapter/participants';

export default class Tournament extends ChallongeBase {
  baseUrl: string;
  participants: Array<Participant>;
  matches: Array<Match>

  constructor(api_key: string, public data: tournamentInterfaces.tournamentResponseObject) {
    super(api_key);

    this.baseUrl = this.generateUrl(data.url, data.subdomain);
  }

  public get(params?: tournamentInterfaces.showTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      show(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  public update(params?: tournamentInterfaces.updateTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      update(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  public delete(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      destroy(this.api_key, this.baseUrl).then(res => {
        if(res.status = 200) { resolve(true); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public processCheckIns(params?: tournamentInterfaces.processCheckInsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      processCheckIns(this.api_key, this.baseUrl, params).then(res => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public abortCheckIns(params?: tournamentInterfaces.abortCheckInsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      abortCheckIns(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public startTournament(params?: tournamentInterfaces.startRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      start(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public finalizeResults(params?: tournamentInterfaces.finalizeRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      finalize(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public resetTournament(params?: tournamentInterfaces.resetRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      reset(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public openForPredictions(params: tournamentInterfaces.openForPredictionsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      openForPredictions(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public getParticipants(): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      index(this.api_key, this.baseUrl).then((res) => {
        if(res.status = 200) { this.data = res.tournament; resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public newParticipant(params: participantInterfaces.createParticipantRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      create(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processParticipants([res.participant]); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }

  public bulkAddParticipants(params: participantInterfaces.bulkAddParticipantsRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      bulkAdd(this.api_key, this.baseUrl, params).then((res) => {
        if(res.status = 200) { this.processParticipants(res.participants); resolve(this); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
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