import * as tournamentAdapter from '../../src/adapter/tournaments';
import * as challongeInterfaces from '../../src/interfaces/tournament.interface';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

let mainName = Math.random().toString(36).substring(7);
let mainUrl = Math.random().toString(36).substring(7);

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Tournaments', () => {
  describe('index function', () => {
    it('Retrieves an array of all tournaments', async () => {
      const { completeRecording } = await record("tournaments/index_200.json");

      const data = await tournamentAdapter.index(challonge_api_key, {
        state: challongeInterfaces.tournamentStateEnum.ALL
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournaments).toHaveLength(2);
    });
  });

  describe('create function', () => {
    it('Creates a tournament', async () => {
      const { completeRecording } = await record("tournaments/create_200.json");

      const data = await tournamentAdapter.create(challonge_api_key, {
        tournament: {
          name: mainName,
          url: mainUrl
        }
      });

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.name).toBe(mainName);
      expect(data.tournament.url).toBe(mainUrl);
    });
  });
});