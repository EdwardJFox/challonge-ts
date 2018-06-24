import axios from 'axios';

/** Endpoint for Challonge API V1 */
export const endpoint = "https://api.challonge.com/v1/";

/** Base API calls for the challonge API */
export function getRequest(path: string, api_key: string, params?: any): Promise<any> {
  return axios.get(`${endpoint}${path}.json`, {
    params: {...{ "api_key": api_key }, ...params }
  });
}

export function postRequest(path: string, api_key: string, data?: any): Promise<any> {
  return axios.post(`${endpoint}${path}.json`, {
    ...{ "api_key": api_key }, ...data
  });
}

export function putRequest(path: string, api_key: string, data?: any): Promise<any> {
  return axios.put(`${endpoint}${path}.json`, {
    ...{ "api_key": api_key }, ...data
  });
}

export function deleteRequest(path: string, api_key: string, params?: any): Promise<any> {
  return axios.delete(`${endpoint}${path}.json`, {
    params: {...{ "api_key": api_key }, ...params }
  });
}

export function buildResponse(res) {
  let { data, status } = res;
  return { data, status }
}

export function url(tournament: string, group?: string): string {
  return group !== undefined && group !== '' ? `${group + "-" + tournament}` : tournament
}
