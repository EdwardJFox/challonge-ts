import ChallongeBase from './base';
import Participant from './participant';
import * as tournamentInterfaces from './interfaces/tournament.interface';
import { show, update, destroy, processCheckIns, abortCheckIns, start, finalize, reset, openForPredictions } from './adapter/tournaments';
import { index, create, bulkAdd } from './adapter/participants';

export default class Tournament extends ChallongeBase {
  baseUrl: string;
  participants: Array<Participant>;

  constructor(api_key: string, public data: tournamentInterfaces.tournamentResponseObject) {
    super(api_key);

    this.baseUrl = this.generateUrl(data.url, data.subdomain);
  }

  get(params: tournamentInterfaces.showTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      show(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(new Tournament(this.api_key, result.tournament));
      }).catch(err => reject(err));
    });
  }

  update(params: tournamentInterfaces.updateTournamentRequest): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      update(this.api_key, this.baseUrl, params).then(result => {
        this.data = result.tournament;
        resolve(new Tournament(this.api_key, result.tournament));
      }).catch(err => reject(err));
    });
  }

  delete(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      destroy(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  processCheckIns() {
    return new Promise((resolve, reject) => {
      processCheckIns(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  abortCheckIns() {
    return new Promise((resolve, reject) => {
      abortCheckIns(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  startTournament() {
    return new Promise((resolve, reject) => {
      start(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  finalizeResults() {
    return new Promise((resolve, reject) => {
      finalize(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  resetTournament() {
    return new Promise((resolve, reject) => {
      reset(this.api_key, this.baseUrl).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  openForPredictions(params: tournamentInterfaces.openForPredictions) {
    return new Promise((resolve, reject) => {
      openForPredictions(this.api_key, this.baseUrl, params).then(() => {
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  getParticipant() {

  }

  newParticipant() {

  }

  bulkAddParticipants() {

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