import { BaseInterfaces } from './';

export namespace MatchInterfaces {
  export interface matchActions {
    /** Include an array of associated attachment records */
    include_attachments?: 0 | 1;
  }

  /** Requests */
  /** Parameter interface for a tournaments match index endpoint */
  export interface indexMatchesRequest {
    /** all (default), pending, open, complete */
    state?: matchStateType
    /** Only retrieve matches that include the specified participant. */
    participant_id?: number
  }

  /** Parameter interface for getting a single match endpoint */
  export interface showMatchesRequest extends matchActions {
  }

  /** Parameters for getting a single match endpoint */
  export interface updateMatchesRequest {
    match: matchUpdateRequestObject
  }

  export interface matchUpdateRequestObject {
    /** Comma separated set/game scores with player 1 score first
     * (e.g. "1-3,3-0,3-2") */
    scores_csv?: string
    /** The participant ID of the winner or "tie" if applicable (Round Robin and 
     * Swiss). NOTE: If you change the outcome of a completed match, all matches 
     * in the bracket that branch from the updated match will be reset. */
    winner_id?: number
    /** Overwrites the number of votes for player 1 */
    player1_votes?: number
    /** Overwrites the number of votes for player 2 */
    player2_votes?: number
  }


  /** Responses */
  /** Response expected from the index matches endpoint */
  export interface indexMatchesResponse extends BaseInterfaces.baseResponse {
    matches: Array<matchResponseObject>
  }

  /** Response expected from the show match endpoint */
  export interface showMatchResponse extends BaseInterfaces.baseResponse {
    match: matchResponseObject
  }

  /** Response expected from the update match endpoint */
  export interface updateMatchResponse extends BaseInterfaces.baseResponse {
    match: matchResponseObject
  }

  /** Response expected from the update match endpoint */
  export interface reopenMatchResponse extends BaseInterfaces.baseResponse {
    match: matchResponseObject
  }

  /** Match response object */
  export interface matchResponseObject {
    attachment_count: number,
    created_at: Date,
    group_id: number,
    has_attachment: false,
    id: number,
    identifier: string,
    location: string,
    loser_id: number,
    player1_id: number,
    player1_is_prereq_match_loser: boolean,
    player1_prereq_match_id: number,
    player1_votes: number,
    player2_id: number,
    player2_is_prereq_match_loser: boolean,
    player2_prereq_match_id: number,
    player2_votes: number,
    round: number,
    scheduled_time: Date,
    started_at: Date,
    state: matchStateType,
    tournament_id: number,
    underway_at: Date,
    updated_at: Date,
    winner_id: number,
    prerequisite_match_ids_csv: string,
    scores_csv: string
  }

  export type matchStateType = 'open' | 'pending' | 'complete';
}