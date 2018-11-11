import ChallongeBase from './base';
import * as participantInterfaces from './interfaces/participant.interface';
import { ParticipantAdapter } from './adapter';

export default class Participant extends ChallongeBase {
  active: boolean;
  checked_in_at: null;
  created_at: Date;
  final_rank: number;
  group_id: number;
  icon: string;
  invitation_id: number;
  invite_email: null;
  misc: string;
  name: string;
  on_waiting_list: boolean;
  seed: number;
  tournament_id: number;
  updated_at: Date;
  challonge_username: string;
  challonge_email_address_verified: null;
  removable: boolean;
  participatable_or_invitation_attached: boolean;
  confirm_remove: boolean;
  invitation_pending: boolean;
  display_name_with_invitation_email_address: string;
  email_hash: string;
  username: string;
  attached_participatable_portrait_url: string;
  can_check_in: boolean;
  checked_in: boolean;
  reactivatable: boolean;
  
  constructor(public api_key: string, public baseUrl: string, public id: number, data?: participantInterfaces.participantResponseObject) {
    super(api_key);

    if(data){
      Object.assign(this, data);
    }
  }

  /** Retrieve a single participant data. */
  public get(): Promise<Participant> {
    return new Promise((resolve, reject) => {
      ParticipantAdapter.show(this.api_key, this.baseUrl, this.id).then(res => {
        Object.assign(this, res.participant);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Update the attributes of a tournament participant. */
  public update(params?: participantInterfaces.updateParticipantRequest): Promise<Participant> {
    return new Promise((resolve, reject) => {
      ParticipantAdapter.update(this.api_key, this.baseUrl, this.id, params).then(res => {
        Object.assign(this, res.participant);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Checks a participant in, setting checked_in_at to the current time. */
  public checkIn() {
    return new Promise((resolve, reject) => {
      ParticipantAdapter.checkIn(this.api_key, this.baseUrl, this.id).then(res => {
        Object.assign(this, res.participant);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Marks a participant as having not checked in, setting checked_in_at to 
   * nil. */
  public undoCheckIn() {
    return new Promise((resolve, reject) => {
      ParticipantAdapter.undoCheckIn(this.api_key, this.baseUrl, this.id).then(res => {
        Object.assign(this, res.participant);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** If the tournament has not started, delete a participant, automatically 
   * filling in the abandoned seed number. If tournament is underway, mark a 
   * participant inactive, automatically forfeiting his/her remaining matches.
   */
  public destroy() {
    return new Promise((resolve, reject) => {
      ParticipantAdapter.destroy(this.api_key, this.baseUrl, this.id).then(res => {
        if(res.status = 200) { this.api_key = undefined; resolve(true); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));;
    });
  }
}