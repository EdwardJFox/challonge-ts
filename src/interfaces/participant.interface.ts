import { baseResponse } from './base.interface';

export interface participantActions {
  /** Include an array of associated match records */
  include_matches: 0 | 1;
}

/** Parameters */

/** Parameters for creating a participant */
export interface participantParameters {
  /**  The name displayed in the bracket/schedule - not required if email or 
   * challonge_username is provided. Must be unique per tournament.  */
  name?: string
  /**  Provide this if the participant has a Challonge account. He or she will 
   * be invited to the tournament.  */
  challonge_username?: string
  /**  Providing this will first search for a matching Challonge account. If 
   * one is found, this will have the same effect as the "challonge_username" 
   * attribute. If one is not found, the "new-user-email" attribute will be 
   * set, and the user will be invited via email to create an account.  */
  email?: string
  /**  integer - The participant's new seed. Must be between 1 and the current 
   * number of participants (including the new record). Overwriting an existing 
   * seed will automatically bump other participants as you would expect.  */
  seed?: number
  /**  string - Max: 255 characters. Multi-purpose field that is only visible 
   * via the API and handy for site integration (e.g. key to your users table)*/
  misc?: string
}

/** Parameters for creating a participant */
export interface bulkAddParticipantParameters {
  /**  The name displayed in the bracket/schedule - not required if email or 
   * challonge_username is provided. Must be unique per tournament.  */
  name?: string
  /**  Username can be provided if the participant has a Challonge account. 
   * Providing email will first search for a matching Challonge account. If one 
   * is found, the user will be invited. If not, the "new-user-email" attribute 
   * will be set, and the user will be invited via email to create an account. */
  invite_name_or_email?: string
  /**  integer - The participant's new seed. Must be between 1 and the current 
   * number of participants (including the new record). Overwriting an existing 
   * seed will automatically bump other participants as you would expect.  */
  seed?: number
  /**  string - Max: 255 characters. Multi-purpose field that is only visible 
   * via the API and handy for site integration (e.g. key to your users table)*/
  misc?: string
}

/** Requests */
/** Response expected from index on participants */

/** Parameter interface for the Create Participant endpoint */
export interface createParticipant {
  /** Tournament object */
  participant: participantParameters
}

/** Parameter interface for bulk adding multiple participants to a tournament */
export interface bulkAddParticipantsRequest {
  participants: Array<bulkAddParticipantParameters>
}

/** Parameter interface for the updating a Participant endpoint */
export interface updateParticipantRequest {
  /** Tournament object */
  participant: participantParameters
}

/** Responses */
/** Response expected from the index participant endpoint */
export interface indexParticipantsResponse extends baseResponse {
  participants: Array<participantResponseObject>
}

/** Response expected from the create participant endpoint */
export interface createParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from bulk adding participants endpoint */
export interface bulkAddParticipantsResposne extends baseResponse {
  participants: participantResponseObject
}

/** Response expected from the show participant endpoint */
export interface showParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the update participant endpoint */
export interface updateParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the check in participant endpoint */
export interface checkInParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the undo check in participant endpoint */
export interface undoCheckInParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the destroy participant endpoint */
export interface destroyParticipantResponse extends baseResponse {
  participant: participantResponseObject
}

/** Response expected from the clear participants endpoint */
export interface clearParticipantsResponse extends baseResponse {
  message: string
}

/** Response expected from the randomize participants endpoint */
export interface randomizeParticipantsResponse extends baseResponse {
  participants: Array<participantResponseObject>
}



/** Resposne objects */
/** Participant object used in responses which contain participants */
export interface participantResponseObject {
  active: boolean
  checked_in_at: null
  created_at: Date
  final_rank: number
  group_id: number
  icon: string
  id: number
  invitation_id: number
  invite_email: null
  misc: string
  name: string
  on_waiting_list: boolean
  seed: number
  tournament_id: number
  updated_at: Date
  challonge_username: string
  challonge_email_address_verified: null
  removable: boolean
  participatable_or_invitation_attached: boolean
  confirm_remove: boolean
  invitation_pending: boolean
  display_name_with_invitation_email_address: string
  email_hash: string
  username: string
  attached_participatable_portrait_url: string
  can_check_in: boolean
  checked_in: boolean
  reactivatable: boolean
}