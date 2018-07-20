import { tournamentParameters } from './interfaces/tournament.interface';
import ChallongeBase from './base';
import Tournament from './tournament';

/** Wrapper class for the account based Challonge actions, such as list all
 * tournaments and create a new tournament */
export default class Challonge extends ChallongeBase {
  

  /** Retrieve a set of tournaments created with your account. */
  public getTournaments(force: boolean): Promise<Array<Tournament>> {

  }

  /** Create a new tournament. */
  public createTournament(params?: tournamentParameters): Promise<Tournament> {
    
  }
}