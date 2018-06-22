import ChallongeBase from './base';
import * as tournamentInterfaces from './tournament.interface';

export default class Tournament extends ChallongeBase {
  baseUrl: string;

  constructor(public api_key: string, tournament: string, group?: string) {
    super(api_key);

    this.baseUrl = this.url(tournament, group);
  }

  /** Retrieve a single tournament record created with your account. */
  public show(tournament_url: string, params?: tournamentInterfaces.tournamentAction): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRequest(`tournaments/${this.baseUrl}`, params).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  /** Update a tournament's attributes. */
  public update(tournament_url: string, params?: tournamentInterfaces.tournamentParameters): Promise<any> {
    return new Promise((resolve, reject) => {
      this.putRequest(`tournaments/${this.baseUrl}`, { tournament: {...params, subdomain: this.group } }).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  /** Deletes a tournament along with all its associated records. There is no undo, so use with care! */
  public destroyTournament(tournament_url: string) {
    return new Promise((resolve, reject) => {
      this.deleteRequest(`tournaments/${this.baseUrl}`).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  /**
   * This should be invoked after a tournament's check-in window closes before
   * the tournament is started.
   * 
   * 1. Marks participants who have not checked in as inactive.
   * 2. Moves inactive participants to bottom seeds (ordered by original seed).
   * 3. Transitions the tournament state from 'checking_in' to 'checked_in'
   * 
   * NOTE: Checked in participants on the waiting list will be promoted if slots
   *  become available.
   */
  public processTournamentCheckIn(tournament_url: string) {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.baseUrl}/process_check_ins`).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  /** When your tournament is in a 'checking_in' or 'checked_in' state, there's 
   * no way to edit the tournament's start time (start_at) or check-in duration 
   * (check_in_duration). You must first abort check-in, then you may edit 
   * those attributes.
   * 
   * 1. Makes all participants active and clears their checked_in_at times.
   * 2. Transitions the tournament state from 'checking_in' or 'checked_in' to 
   * 'pending'
   */
  public abortTournamentCheckIn(tournament_url: string, params?: tournamentInterfaces.tournamentAction) {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.baseUrl}/abort_check_in`).then(res => {
        let { data: { tournament } , status } = res;
        resolve({ tournament, status });
      }).catch(err => reject(err.response));
    });
  }

  /** Start a tournament, opening up first round matches for score reporting. 
   * The tournament must have at least 2 participants. */
  public start(tournament_url: string, params?: tournamentInterfaces.tournamentAction): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.baseUrl}/start`, params).then(res => {
        console.log(res.data);
        let { data, status } = res;
        resolve({ data, status });
      }).catch(err => reject(err.response));
    });
  }

  /** Finalize a tournament that has had all match scores submitted, rendering 
   * its results permanent. */
  public finalize(tournament_url: string) {

  }

  /** Reset a tournament, clearing all of its scores and attachments. You can 
   * then add/remove/edit participants before starting the tournament again. */
  public reset(tournament_url: string) {
    
  }

  /** Sets the state of the tournament to start accepting predictions. Your 
   * tournament's 'prediction_method' attribute must be set to 1 (exponential 
   * scoring) or 2 (linear scoring) to use this option. Note: Once open for 
   * predictions, match records will be persisted, so participant additions and 
   * removals will no longer be permitted. */
  public openForPredictions(tournament_url: string) {
    
  }

  /** Retrieve a tournament's participant list. */
  public indexParticipants(tournament_url: string) {

  }

  /** Add a participant to a tournament (up until it is started).. */
  public createParticipant(tournament_url: string) {

  }

  /** Add a participant to a tournament (up until it is started).. */
  public clearParticipants(tournament_url: string) {

  }

  /** Add a participant to a tournament (up until it is started).. */
  public randomizeParticipants(tournament_url: string) {

  }

  /** Bulk add participants to a tournament (up until it is started). If an 
   * invalid participant is detected, bulk participant creation will halt and 
   * any previously added participants (from this API request) will be rolled 
   * back. */
  public participantsBulkAdd(tournament_url: string, participants: Array<string>) {
    return new Promise((resolve, reject) => {
      this.postRequest(`tournaments/${this.baseUrl}/participants/bulk_add`, { participants }).then(res => {
        let { data, status } = res;
        resolve({ data, status });
      }).catch(err => reject(err.response));
    });

  }

  private url(tournament, group): string {
    return group !== undefined && group !== '' ? `${group + "-" + tournament}` : tournament
  }
}