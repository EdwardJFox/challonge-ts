import { BaseInterfaces } from './';

export namespace MatchAttachmentInterfaces {
  /**
   * At least 1 of the 3 optional parameters must be provided.
   * Files up to 25MB are allowed for tournaments hosted by Premier badge 
   * Challonge Premier subscribers.
   */
  export interface matchAttachmentRequestObject {
    /**  A file upload (250KB max, no more than 4 attachments per match). If provided, the url parameter will be ignored.  */
    asset?: File;
    /**  A web URL  */
    url?: string;
    /**  Text to describe the file or URL attachment, or this can simply be standalone text.  */
    description?: string;
  }

  /** Requests */
  /** Body expected for the create match attachment endpoint */
  export interface createMatchAttachmentRequest {
    match_attachment: matchAttachmentRequestObject
  }

  /** Body expected for the update match attachment endpoint */
  export interface updateMatchAttachmentRequest {
    match_attachment: matchAttachmentRequestObject
  }

  /** Responses */
  /** Expected response from the index match attachments endpoint */
  export interface indexMatchAttachmentsResponse extends BaseInterfaces.baseResponse {
    attachments: Array<matchAttachmentResponseObject>
  }

  /** Expected response from the create match attachments endpoint */
  export interface createMatchAttachmentResponse extends BaseInterfaces.baseResponse {
    match_attachment: matchAttachmentResponseObjectFields
  }

  /** Expected response from the show match attachment endpoint */
  export interface showMatchAttachmentResponse extends BaseInterfaces.baseResponse {
    match_attachment: matchAttachmentResponseObjectFields
  }

  /** Expected response from the update match attachment endpoint */
  export interface updateMatchAttachmentResponse extends BaseInterfaces.baseResponse {
    match_attachment: matchAttachmentResponseObjectFields
  }

  /** Expected response from the destroy match attachment endpoint */
  export interface destroyMatchAttachmentResponse extends BaseInterfaces.baseResponse {
    match_attachment: matchAttachmentResponseObjectFields
  }


  /** Response wrapping a match attachment */
  export interface matchAttachmentResponseObject {
    match_attachment: matchAttachmentResponseObjectFields
  }

  /** Match attachment fields */
  export interface matchAttachmentResponseObjectFields {
    id: number,
    match_id: number,
    user_id: number,
    description?: string,
    url?: string,
    original_file_name?: string,
    created_at?: Date,
    updated_at?: Date,
    asset_file_name?: string,
    asset_content_type?: string,
    asset_file_size?: number,
    asset_url?: string
  }
}