import axios from 'axios';
import * as challongeInterfaces from './interfaces';

export default class Challonge {
  endpoint = "https://api.challonge.com/v1/";

  constructor(public api_key: string, public group?: string) {

  }

  public getTournaments(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRequest('tournaments').then(res => {
        let { data, status } = res;
        resolve({ tournaments: data, status });
      }).catch(err => reject(err.response));
    });
  }

  public createTournament(params?: challongeInterfaces.tournamentParameters): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments`, { tournament: {...params, subdomain: this.group } }).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  public getTournament(tournament_url: string, params?: challongeInterfaces.tournamentAction): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRequest(`tournaments/${this.tournamentUrl(tournament_url)}`, params).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  public updateTournament(tournament_url: string, params?: challongeInterfaces.tournamentParameters): Promise<any> {
    return new Promise((resolve, reject) => {
      this.putRequest(`tournaments/${this.tournamentUrl(tournament_url)}`, { tournament: {...params, subdomain: this.group } }).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  public destroyTournament(tournament_url: string) {
    return new Promise((resolve, reject) => {
      this.deleteRequest(`tournaments/${this.tournamentUrl(tournament_url)}`).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  public processTournamentCheckIn(tournament_url: string) {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.tournamentUrl(tournament_url)}/process_check_ins`).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  public abortTournamentCheckIn(tournament_url: string) {

  }

  public startTournament(tournament_url: string, params?: challongeInterfaces.tournamentAction): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.tournamentUrl(tournament_url)}/start`, params).then(res => {
        console.log(res.data);
        let { data, status } = res;
        resolve({ data, status });
      }).catch(err => reject(err.response));
    });
  }

  public finalizeTournamentCheckin(tournament_url: string) {

  }

  public resetTournament(tournament_url: string) {
    
  }

  public openTournamentForPredictions(tournament_url: string) {
    
  }

  public participantsBulkAdd(tournament_url: string, participants: Array<string>) {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.tournamentUrl(tournament_url)}/participants/bulk_add`, { participants }).then(res => {
        let { data, status } = res;
        resolve({ data, status });
      }).catch(err => reject(err.response));
    });

  }

  private tournamentUrl(tournament): string {
    return this.group !== undefined && this.group !== '' ? `${this.group + "-" + tournament}` : tournament
  }

  private getRequest(path: string, params?: any): Promise<any> {
    return axios.get(`${this.endpoint}${path}.json`, {
      params: {...{ "api_key": this.api_key }, ...params }
    });
  }

  private postRequest(path: string, data?: any): Promise<any> {
    return axios.post(`${this.endpoint}${path}.json`, {
      ...{ "api_key": this.api_key }, ...data
    });
  }

  private putRequest(path: string, data?: any): Promise<any> {
    return axios.put(`${this.endpoint}${path}.json`, {
      ...{ "api_key": this.api_key }, ...data
    });
  }

  private deleteRequest(path: string, params?: any): Promise<any> {
    return axios.delete(`${this.endpoint}${path}.json`, {
      params: {...{ "api_key": this.api_key }, ...params }
    });
  }

  private buildResponse(res) {
    let { data, status } = res;
    return { data, status }
  }
}