import ChallongeBase from './base';
import * as matchInterfaces from './interfaces/match.interface';
import * as matchAttachmentInterfaces from './interfaces/matchAttachment.interface';
import { show, update, reopen } from './adapter/matches';
import { index, create } from './adapter/matchAttachments';
import Attachment from './attachment';

export default class Match extends ChallongeBase {
  attachment_count: number;
  created_at: Date;
  group_id: number;
  has_attachment: false;
  identifier: string;
  location: string;
  loser_id: number;
  player1_id: number;
  player1_is_prereq_match_loser: boolean;
  player1_prereq_match_id: number;
  player1_votes: number;
  player2_id: number;
  player2_is_prereq_match_loser: boolean;
  player2_prereq_match_id: number;
  player2_votes: number;
  round: number;
  scheduled_time: Date;
  started_at: Date;
  state: matchInterfaces.matchStateType;
  tournament_id: number;
  underway_at: Date;
  updated_at: Date;
  winner_id: number;
  prerequisite_match_ids_csv: string;
  scores_csv: string;
  attachments: Array<Attachment>;

  constructor(public api_key: string, public baseUrl: string, public id: number, data?: matchInterfaces.matchResponseObject) {
    super(api_key);

    this.attachments = [];
    if(data){
      Object.assign(this, data);
    }
  }

  /** Retrieve a single match record for a tournament. */
  public get(): Promise<Match> {
    return new Promise((resolve, reject) => {
      show(this.api_key, this.baseUrl, this.id).then(res => {
        Object.assign(this, res.match);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Update/submit the score(s) for a match. */
  public update(params?: matchInterfaces.matchUpdateRequestObject): Promise<Match> {
    return new Promise((resolve, reject) => {
      update(this.api_key, this.baseUrl, this.id, { match: params }).then(res => {
        Object.assign(this, res.match);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Choose winner passing in a participant id and the scores in csv format */
  public selectWinner(winner_id: number, scores: string): Promise<Match> {
    return this.update( { winner_id, scores_csv: scores });
  }

  /** Reopens a match that was marked completed, automatically resetting 
   * matches that follow it */
  public reopen(): Promise<Match> {
    return new Promise((resolve, reject) => {
      reopen(this.api_key, this.baseUrl, this.id).then(res => {
        Object.assign(this, res.match);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Retrieve a matches attachments. */
  public getAllAttachments(): Promise<Array<Attachment>> {
    return new Promise((resolve, reject) => {
      index(this.api_key, this.baseUrl, this.id).then(res => {
        resolve(this.processAttachments(res.attachments));
      }).catch(err => reject(err));
    });
  }

  /** Add a file, link, or text attachment to a match. NOTE: The associated 
   * tournament's "accept_attachments" attribute must be true for this action 
   * to succeed. */
  public createAttachment(params?: matchAttachmentInterfaces.matchAttachmentRequestObject) {
    return new Promise((resolve, reject) => {
      create(this.api_key, this.baseUrl, this.id, { match_attachment: params }).then(res => {
        const attachment = this.processAttachment(res.match_attachment);
        this.attachments.push(attachment); 
        resolve(attachment);
      }).catch(err => reject(err));
    });
  }

  private processAttachments(attachments) {
    this.attachments = attachments.map(attachment => {
      return this.processAttachment(attachment.match_attachment);
    });

    return this.attachments;
  }

  private processAttachment(attachment) {
    return new Attachment(this.api_key, this.baseUrl, this.id, attachment.id, attachment)
  }
}