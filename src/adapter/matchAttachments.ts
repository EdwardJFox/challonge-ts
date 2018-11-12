import * as ChallongeAdapterBase from './base';
import { MatchAttachmentInterfaces } from '../';

/** Namespace for all of the Match Attachment routes */
export namespace MatchAttachmentAdapter {
  /** Retrieve a match's attachments. */
  export function index(api_key: string, tournament_url: string, match_id: number): Promise<MatchAttachmentInterfaces.indexMatchAttachmentsResponse> {
    return new Promise((resolve, reject) => {
      ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments`, api_key).then(res => {
        const { data, status } = res;

        resolve({ attachments: data, status });
      }).catch(err => reject(err));
    });
  }

  /** Add a file, link, or text attachment to a match. NOTE: The associated 
   * tournament's "accept_attachments" attribute must be true for this action 
   * to succeed. */
  export function create(api_key: string, tournament_url: string, match_id: number, params: MatchAttachmentInterfaces.createMatchAttachmentRequest): Promise<MatchAttachmentInterfaces.createMatchAttachmentResponse> {
    return new Promise((resolve, reject) => {
      ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments`, api_key, params).then(res => {
        const { data: { match_attachment }, status } = res;

        resolve({ match_attachment, status });
      }).catch(err => reject(err));
    });
  }

  /** Retrieve a single match attachment record. */
  export function show(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<MatchAttachmentInterfaces.showMatchAttachmentResponse> {
    return new Promise((resolve, reject) => {
      ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key).then(res => {
        const { data: { match_attachment }, status } = res;

        resolve({ match_attachment, status });
      }).catch(err => reject(err));
    });
  }

  /** Update the attributes of a match attachment. */
  export function update(api_key: string, tournament_url: string, match_id: number, attachment_id: number, params: MatchAttachmentInterfaces.updateMatchAttachmentRequest): Promise<MatchAttachmentInterfaces.updateMatchAttachmentResponse> {
    return new Promise((resolve, reject) => {
      ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key, params).then(res => {
        const { data: { match_attachment }, status } = res;

        resolve({ match_attachment, status });
      }).catch(err => reject(err));
    });
  }

  /** Delete a match attachment. */
  export function destroy(api_key: string, tournament_url: string, match_id: number, attachment_id: number): Promise<MatchAttachmentInterfaces.destroyMatchAttachmentResponse> {
    return new Promise((resolve, reject) => {
      ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/matches/${match_id}/attachments/${attachment_id}`, api_key).then(res => {
        const { data: { match_attachment }, status } = res;

        resolve({ match_attachment, status });
      }).catch(err => reject(err));
    });
  }
}