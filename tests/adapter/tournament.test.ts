import { url } from '../../src/adapter/base';
import { TournamentAdapter, TournamentInterfaces } from '../../src';

var fs = require('fs');
import { setupRecorder } from "nock-record";

let mainName = 'testNameChallongeTs';
let mainUrl = 'testUrlChallongeTs';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Tournaments', () => {
  describe('index function', () => {
    it('Retrieves an array of all tournaments', async () => {
      const { completeRecording } = await record("tournaments/index_200");

      const data = await TournamentAdapter.index(challonge_api_key, {
        state: TournamentInterfaces.tournamentStateEnum.ALL
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournaments).toHaveLength(2);
    });
  });

  describe('create function', () => {
    it('Creates a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/create_200");

      const data = await TournamentAdapter.create(challonge_api_key, {
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

  describe('show function', () => {
    it('Gets a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/show_200");

      const data = await TournamentAdapter.show(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.name).toBe(mainName);
      expect(data.tournament.url).toBe(mainUrl);
    });
  });

  describe('update function', () => {
    it('Updates a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/update_200");

      const data = await TournamentAdapter.update(challonge_api_key, url(mainUrl), {
        name: 'newTournamentName'
      });

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.name).toBe('newTournamentName');
    });
  });

  describe('destroy function', () => {
    it('Destroys a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/destroy_200");

      const data = await TournamentAdapter.destroy(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
    });
  });

  describe('processCheckIns function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/processCheckIns_200");

      const data = await TournamentAdapter.processCheckIns(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('checked_in');
    });
  });

  describe('abortheckIns function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/abortCheckIns_200");

      const data = await TournamentAdapter.abortCheckIns(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('pending');
    });
  });

  describe('start function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/start_200");

      const data = await TournamentAdapter.start(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('underway');
    });
  });

  describe('finalize function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/finalize_200");

      const data = await TournamentAdapter.finalize(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('complete');
    });
  });

  describe('reset function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/reset_200");

      const data = await TournamentAdapter.reset(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('pending');
    });
  });

  describe('openForPredictions function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/openForPredictions_200");

      const data = await TournamentAdapter.openForPredictions(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('accepting_predictions');
    });
  });
});