import { url } from '../../src/adapter/base';
import * as tournamentAdapter from '../../src/adapter/tournaments';
import * as challongeInterfaces from '../../src/interfaces/tournament.interface';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

let mainName = 'testNameChallongeTs';
let mainUrl = 'testUrlChallongeTs';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Tournaments', () => {
  describe('index function', () => {
    it('Retrieves an array of all tournaments', async () => {
      const { completeRecording } = await record("tournaments/index_200");

      const data = await tournamentAdapter.index(challonge_api_key, {
        state: challongeInterfaces.tournamentStateEnum.ALL
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournaments).toHaveLength(2);
    });
  });

  describe('create function', () => {
    it('Creates a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/create_200");

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

  describe('show function', () => {
    it('Gets a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/show_200");

      const data = await tournamentAdapter.show(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.name).toBe(mainName);
      expect(data.tournament.url).toBe(mainUrl);
    });
  });

  describe('update function', () => {
    it('Updates a tournament and returns as expected', async () => {
      const { completeRecording } = await record("tournaments/update_200");

      const data = await tournamentAdapter.update(challonge_api_key, url(mainUrl), {
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

      const data = await tournamentAdapter.destroy(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
    });
  });

  describe('processCheckIns function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/processCheckIns_200");

      const data = await tournamentAdapter.processCheckIns(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('checked_in');
    });
  });

  describe('abortheckIns function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/abortCheckIns_200");

      const data = await tournamentAdapter.abortCheckIns(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('pending');
    });
  });

  describe('start function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/start_200");

      const data = await tournamentAdapter.start(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('underway');
    });
  });

  describe('finalize function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/finalize_200");

      const data = await tournamentAdapter.finalize(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('complete');
    });
  });

  describe('reset function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/reset_200");

      const data = await tournamentAdapter.reset(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('pending');
    });
  });

  describe('openForPredictions function', () => {
    it('Changes a tournaments state to checked_in', async () => {
      const { completeRecording } = await record("tournaments/openForPredictions_200");

      const data = await tournamentAdapter.openForPredictions(challonge_api_key, url(mainUrl));

      completeRecording();

      expect(data.status).toBe(200);
      expect(data.tournament.state).toBe('accepting_predictions');
    });
  });
});