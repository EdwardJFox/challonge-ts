import Challonge from '../src/challonge';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

let mainName = 'testNameChallongeTs';
let mainUrl = 'testUrlChallongeTs';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder({ fixturePath: 'tests/adapter/__nock-fixtures__'});

describe('Challonge class', () => {
  let challonge;

  beforeEach(() => {
    challonge = new Challonge(challonge_api_key);
  });  

  describe('getTournaments method', () => {
    it('Retrieves all tournaments and returns an array of Tournament objects', async () => {
      const { completeRecording } = await record("tournaments/index_200");

      const tournaments = await challonge.getTournaments({ state: 'all' });
    
      completeRecording();

      expect(tournaments).toHaveLength(2);
      expect(tournaments[0].constructor.name).toBe('Tournament')
    });
  });

  describe('createTournament method', () => {
    it('Creates a tournament and returns a new Tournament object', async () => {
      const { completeRecording } = await record("tournaments/create_200");

      const tournament = await challonge.createTournament({
        name: mainName,
        url: mainUrl
      });
    
      completeRecording();

      expect(tournament.constructor.name).toBe('Tournament');
      expect(tournament.data.name).toBe(mainName);
      expect(tournament.data.url).toBe(mainUrl);
    });
  });

});