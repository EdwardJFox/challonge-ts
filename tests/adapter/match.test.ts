import { url } from '../../src/adapter/base';
import { MatchAdapter } from '../../src';

var fs = require('fs');
import { setupRecorder } from "nock-record";

let mainUrl = 'autototester';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Matches', () => {
  describe('index function', () => {
    it('Retrieves an array of all matches in a tournament', async () => {
      const { completeRecording } = await record("matches/index_200");

      const data = await MatchAdapter.index(challonge_api_key, url(mainUrl));
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.matches).toHaveLength(39);
    });
  });

  describe('show function', () => {
    it('Retrieves a specific match', async () => {
      const { completeRecording } = await record("matches/show_200");

      const data = await MatchAdapter.show(challonge_api_key, url(mainUrl), 125316886);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match.id).toBe(125316886);
    });
  });

  describe('update function', () => {
    it('Updates the match details', async () => {
      const { completeRecording } = await record("matches/update_200");

      const data = await MatchAdapter.update(challonge_api_key, url(mainUrl), 125316886, {
        match: {
          scores_csv: "3-1,3-1,2-3,3-0",
          winner_id: 77048083
        }
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match.id).toBe(125316886);
      expect(data.match.state).toBe("complete");
    });
  });

  describe('reopen function', () => {
    it('Reopens the match for score', async () => {
      const { completeRecording } = await record("matches/reopen_200");

      const data = await MatchAdapter.reopen(challonge_api_key, url(mainUrl), 125316886);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match.id).toBe(125316886);
      expect(data.match.state).toBe("open");
    });
  });
});