import fetch from 'node-fetch';

/** Endpoint for Challonge API V1 */
export const endpoint = "https://api.challonge.com/v1/";

/** Base API calls for the challonge API */
export function getRequest(path: string, api_key: string, params?: any): Promise<any> {
  return fetch(`${endpoint}${path}.json`, {
    headers: {
      Authorization: api_key
    },
    body: params
  });
}

export function postRequest(path: string, api_key: string, params?: any): Promise<any> {
  return fetch(`${endpoint}${path}.json`, {
    headers: {
      Authorization: api_key
    },
    method: 'POST',
    body: params
  });
}

export function putRequest(path: string, api_key: string, params?: any): Promise<any> {
  return fetch(`${endpoint}${path}.json`, {
    headers: {
      Authorization: api_key
    },
    method: 'PUT',
    body: params
  });
}

export function deleteRequest(path: string, api_key: string, params?: any): Promise<any> {
  return fetch(`${endpoint}${path}.json`, {
    headers: {
      Authorization: api_key
    },
    method: 'DELETE',
    body: params
  });
}

export function buildResponse(res) {
  let { data, status } = res;
  return { data, status }
}

export function url(tournament, group): string {
  return group !== undefined && group !== '' ? `${group + "-" + tournament}` : tournament
}
