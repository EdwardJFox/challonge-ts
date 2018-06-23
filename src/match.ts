import ChallongeBase from './base';
import * as matchInterfaces from './interfaces/match.interface';

export default class Match extends ChallongeBase {
  constructor(public api_key: string, public tournament: string, public match_id: number) {
    super(api_key);
  }

  /** Retrieve a single match record for a tournament. */
  public show() {

  }

  /** Update/submit the score(s) for a match. */
  public update() {

  }

  /** Reopens a match that was marked completed, automatically resetting 
   * matches that follow it */
  public reopen() {

  }

  /** Retrieve a match's attachments. */
  public indexAttachments() {

  }

  /** Add a file, link, or text attachment to a match. NOTE: The associated 
   * tournament's "accept_attachments" attribute must be true for this action 
   * to succeed. */
  public createAttachment() {

  }
}