import ChallongeBase from './base';
import * as attachmentInterfaces from './interfaces/matchAttachment.interface';
import { MatchAttachmentAdapter } from './adapter';

export default class Attachment extends ChallongeBase {
  user_id: number;
  description?: string;
  url?: string;
  original_file_name?: string;
  created_at?: Date;
  updated_at?: Date;
  asset_file_name?: string;
  asset_content_type?: string;
  asset_file_size?: number;
  asset_url?: string;

  constructor(public api_key: string, public baseUrl: string, public match_id: number, public id: number, data?: attachmentInterfaces.matchAttachmentResponseObject) {
    super(api_key);

    if(data){
      Object.assign(this, data);
    }
  }

  /** Retrieve a single match attachment record. */
  public get(): Promise<Attachment> {
    return new Promise((resolve, reject) => {
      MatchAttachmentAdapter.show(this.api_key, this.baseUrl, this.match_id, this.id).then(res => {
        Object.assign(this, res.match_attachment);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Update the attributes of a match attachment. */
  public update(params?: attachmentInterfaces.matchAttachmentRequestObject): Promise<Attachment> {
    return new Promise((resolve, reject) => {
      MatchAttachmentAdapter.update(this.api_key, this.baseUrl, this.match_id, this.id, { match_attachment: params }).then(res => {
        Object.assign(this, res.match_attachment);
        resolve(this);
      }).catch(err => reject(err));
    });
  }

  /** Delete a match attachment. */
  public delete(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MatchAttachmentAdapter.destroy(this.api_key, this.baseUrl, this.match_id, this.id).then(res => {
        if(res.status = 200) { this.api_key = undefined; resolve(true); }
        else { reject({error: 'Challonge did not return 200'}) }
      }).catch(err => reject(err));
    });
  }
}