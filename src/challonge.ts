import { indexTournamentsRequest, strictTournamentParameters } from './interfaces/tournament.interface';
import ChallongeBase from './base';
import Tournament from './tournament';
import { index, create } from './adapter/tournaments';

/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
export default class Challonge extends ChallongeBase {
  tournaments: Array<Tournament>;
  
  constructor(api_key: string) {
    super(api_key);
  }

  /** Retrieve a set of tournaments created with your account. */
  public getTournaments(params: indexTournamentsRequest): Promise<Array<Tournament>> {
    return new Promise((resolve, reject) => {
      index(this.api_key, params).then(results => {
        const toReturn = results.tournaments.map(tournament => {
          return new Tournament(this.api_key, tournament)
        });

        this.tournaments = toReturn;
        resolve(toReturn);
      }).catch(err => {
        reject(err);
      });
    });
  }

  /** Create a new tournament. */
  public createTournament(params: strictTournamentParameters): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      create(this.api_key, { tournament: params }).then(result => {
        resolve(new Tournament(this.api_key, result.tournament));
      }).catch(err => {
        reject(err);
      });
    });
  }
}