import ChallongeBase from './base';
import * as attachmentInterfaces from './interfaces/matchAttachment.interface';

export default class Attachment extends ChallongeBase {
  constructor(public api_key: string, public tournament: string,public match_id: number, public attachment_id: number) {
    super(api_key);
  }

  /** Retrieve a single match attachment record. */
  public show() {

  }

  /** Update the attributes of a match attachment. */
  public update() {

  }

  /** Delete a match attachment. */
  public destroy() {

  }
}