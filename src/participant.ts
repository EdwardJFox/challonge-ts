import ChallongeBase from './base';
import * as participantInterfaces from './interfaces/participant.interface';

export default class Participant extends ChallongeBase {
  constructor(public api_key: string, public tournament: string, public id: number, public group?: string) {
    super(api_key, group);
  }

  /** Retrieve a tournament's participant list. */
  public get() {

  }

  /** Update the attributes of a tournament participant. */
  public update() {

  }

  /** Checks a participant in, setting checked_in_at to the current time. */
  public checkIn() {

  }

  /** Marks a participant as having not checked in, setting checked_in_at to 
   * nil. */
  public undoCheckIn() {

  }

  /** If the tournament has not started, delete a participant, automatically 
   * filling in the abandoned seed number. If tournament is underway, mark a 
   * participant inactive, automatically forfeiting his/her remaining matches.
   */
  public destroy() {

  }
}