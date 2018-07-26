import ChallongeBase from './base';
import * as tournamentInterfaces from './interfaces/tournament.interface';

export default class Tournament extends ChallongeBase {
  baseUrl: string;

  constructor(api_key: string, public data: tournamentInterfaces.tournamentResponseObject) {
    super(api_key);

    this.baseUrl = this.generateUrl(data.url, data.subdomain);
  }

  updateData() {
    
  }

  /** Create a tournament url */
  public generateUrl(url: string, subdomain: string) {
    if(subdomain) {
      return url;
    } else {
      return `${subdomain}-${url}`;
    }
  }
}