/** Base class for challonge objects, holds at its core the api key */
export default class ChallongeBase {
  /** API key used to access challonge */
  api_key: string;

  constructor (api_key: string) {
    this.api_key = api_key;
  }
}