import axios from 'axios';

export default class ChallongeBase {
  endpoint = "https://api.challonge.com/v1/";

  constructor(public api_key: string, public group?: string) {

  }

  protected getRequest(path: string, params?: any): Promise<any> {
    return axios.get(`${this.endpoint}${path}.json`, {
      params: {...{ "api_key": this.api_key }, ...params }
    });
  }

  protected postRequest(path: string, data?: any): Promise<any> {
    return axios.post(`${this.endpoint}${path}.json`, {
      ...{ "api_key": this.api_key }, ...data
    });
  }

  protected putRequest(path: string, data?: any): Promise<any> {
    return axios.put(`${this.endpoint}${path}.json`, {
      ...{ "api_key": this.api_key }, ...data
    });
  }

  protected deleteRequest(path: string, params?: any): Promise<any> {
    return axios.delete(`${this.endpoint}${path}.json`, {
      params: {...{ "api_key": this.api_key }, ...params }
    });
  }

  protected buildResponse(res) {
    let { data, status } = res;
    return { data, status }
  }
}