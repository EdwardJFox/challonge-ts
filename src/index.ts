import { tournamentParameters } from './tournament.interface';
import ChallongeBase from './base';

/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
export default class Challonge extends ChallongeBase {

  /** Retrieve a set of tournaments created with your account. */
  public getTournaments(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRequest('tournaments').then(res => {
        let { data, status } = res;
        resolve({ tournaments: data, status });
      }).catch(err => reject(err.response));
    });
  }

  /** Create a new tournament. */
  public createTournament(params?: tournamentParameters): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments`, { tournament: {...params, subdomain: this.group } }).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }
}