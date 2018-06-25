export interface participantActions {
  /** Include an array of associated match records */
  include_matches: 0 | 1;
}

export interface participantResponseObject {
  active: boolean,
  checked_in_at: null,
  created_at: Date,
  final_rank: number,
  group_id: number,
  icon: string,
  id: number,
  invitation_id: number,
  invite_email: null,
  misc: string,
  name: string,
  on_waiting_list: boolean,
  seed: number,
  tournament_id: number,
  updated_at: Date,
  challonge_username: string,
  challonge_email_address_verified: null,
  removable: boolean,
  participatable_or_invitation_attached: boolean,
  confirm_remove: boolean,
  invitation_pending: boolean,
  display_name_with_invitation_email_address: string,
  email_hash: string,
  username: string,
  attached_participatable_portrait_url: string,
  can_check_in: boolean,
  checked_in: boolean,
  reactivatable: boolean
}