import * as ChallongeAdapterBase from './base';
import * as participantInterfaces from '../interfaces/participant.interface';

/** Retrieve a tournament's participant list. */
export function index(api_key: string, tournament_url: string): Promise<participantInterfaces.indexParticipantsResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/participants`, api_key).then(res => {
      const { data, status } = res;

      resolve({ participants: data, status });
    }).catch(err => reject(err));
  });
}

/** Add a participant to a tournament (up until it is started). */
export function create(api_key: string, tournament_url: string, params: participantInterfaces.createParticipant): Promise<participantInterfaces.createParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants`, api_key, params).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** Bulk add participants to a tournament (up until it is started). If an 
 * invalid participant is detected, bulk participant creation will halt and 
 * any previously added participants (from this API request) will be rolled 
 * back. */
export function bulkAdd(api_key: string, tournament_url: string, params: participantInterfaces.bulkAddParticipantsRequest): Promise<participantInterfaces.bulkAddParticipantsResposne> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/bulk_add`, api_key, params).then(res => {
      let { data, status } = res;
      resolve({ participants: data, status });
    }).catch(err => reject(err));
  });
}

/** Retrieve a single participant record for a tournament. */
export function show(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.showParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.getRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** Update the attributes of a tournament participant. */
export function update(api_key: string, tournament_url: string, participant_id: number, params: participantInterfaces.updateParticipantRequest): Promise<participantInterfaces.updateParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.putRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key, params).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** Checks a participant in, setting checked_in_at to the current time. */
export function checkIn(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.checkInParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/${participant_id}/check_in`, api_key).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** Marks a participant as having not checked in, setting checked_in_at to nil. */
export function undoCheckIn(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.checkInParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/${participant_id}/undo_check_in`, api_key).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** If the tournament has not started, delete a participant, automatically 
 * filling in the abandoned seed number. If tournament is underway, mark a 
 * participant inactive, automatically forfeiting his/her remaining matches. */
export function destroy(api_key: string, tournament_url: string, participant_id: number): Promise<participantInterfaces.destroyParticipantResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/participants/${participant_id}`, api_key).then(res => {
      const { data: { participant }, status } = res;

      resolve({ participant, status });
    }).catch(err => reject(err));
  });
}

/** Deletes all participants in a tournament. (Only allowed if tournament 
 * hasn't started yet) */
export function clear(api_key: string, tournament_url: string): Promise<participantInterfaces.clearParticipantsResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.deleteRequest(`tournaments/${tournament_url}/participants/clear`, api_key).then(res => {
      const { data: { message }, status } = res;

      resolve({ message, status });
    }).catch(err => reject(err));
  });
}

/** Randomize seeds among participants. Only applicable before a tournament has started. */
export function randomize(api_key: string, tournament_url: string): Promise<participantInterfaces.randomizeParticipantsResponse> {
  return new Promise((resolve, reject) => {
    ChallongeAdapterBase.postRequest(`tournaments/${tournament_url}/participants/randomize`, api_key).then(res => {
      const { data, status } = res;

      resolve({ participants: data, status });
    }).catch(err => reject(err));
  });
}