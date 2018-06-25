/** Retrieve a tournament's participant list. */
export function indexParticipants(tournament_url: string) {

}

/** Add a participant to a tournament (up until it is started).. */
export function createParticipant(tournament_url: string) {

}

/** Add a participant to a tournament (up until it is started).. */
export function clearParticipants(tournament_url: string) {

}

/** Add a participant to a tournament (up until it is started).. */
export function randomizeParticipants(tournament_url: string) {

}

/** Bulk add participants to a tournament (up until it is started). If an 
 * invalid participant is detected, bulk participant creation will halt and 
 * any previously added participants (from this API request) will be rolled 
 * back. */
export function participantsBulkAdd(tournament_url: string, participants: Array<string>) {
  return new Promise((resolve, reject) => {
    this.postRequest(`tournaments/${this.baseUrl}/participants/bulk_add`, { participants }).then(res => {
      let { data, status } = res;
      resolve({ data, status });
    }).catch(err => reject(err));
  });
}