import * as tournamentAdapter from '../../src/adapter/tournaments';
import * as challongeInterfaces from '../../src/interfaces/tournament.interface';
var fs = require('fs');
var axiosVCR = require('axios-vcr');

let mainName = Math.random().toString(36).substring(7);
let mainUrl = Math.random().toString(36).substring(7);
const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');

describe('Challonge Adapter - Tournaments', () => {
  describe('index function', () => {
    it('Retrieves an array of all tournaments', async () => {
      axiosVCR.mountCassette('./tests/fixtures/tournaments/index_200.json');

      const tournaments = await tournamentAdapter.index(challonge_api_key, {
        state: challongeInterfaces.tournamentStateEnum.ALL
      });
      
      expect(tournaments.status).toBe(200);
      expect(tournaments.tournaments).toHaveLength(2);

      axiosVCR.ejectCassette('./tests/fixtures/tournaments/index_200.json');
    });
  });

  describe('create function', () => {
    it('Retrieves an array of all tournaments', async () => {
      axiosVCR.mountCassette('./tests/fixtures/tournaments/create_200.json');

      const tournaments = await tournamentAdapter.create(challonge_api_key, {
        tournament: {
          name: mainName,
          url: mainUrl
        }
      });
      
      expect(tournaments.status).toBe(200);
      expect(tournaments.tournament.name).toBe(mainName);
      expect(tournaments.tournament.url).toBe(mainUrl);

      axiosVCR.ejectCassette('./tests/fixtures/tournaments/create_200.json');
    });
  });
});