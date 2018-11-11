import { Match } from '../src';

var fs = require('fs');
import { setupRecorder } from "nock-record";

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder({ fixturePath: 'tests/adapter/__nock-fixtures__'});

describe('Match class', () => {
  let match;

  beforeEach(() => {
    match = new Match(challonge_api_key, 'autototester', 125316886);
  });
  
  describe('get method', () => {
    it('Retrieves the match from the API', async () => {
      const { completeRecording } = await record("matches/show_200");

      await match.get();
    
      completeRecording();

      expect(match.tournament_id).toBe(4731515);
    });
  });
  
  describe('update method', () => {
    it('Updates the matches details', async () => {
      const { completeRecording } = await record("matches/update_200");

      await match.update({
        scores_csv: "3-1,3-1,2-3,3-0",
        winner_id: 77048083
      });
    
      completeRecording();

      expect(match.winner_id).toBe(77048083);
    });
  });
  
  describe('selectWinner method', () => {
    it('Updates the matches score and winner', async () => {
      const { completeRecording } = await record("matches/update_200");

      await match.selectWinner(77048083, "3-1,3-1,2-3,3-0");
    
      completeRecording();

      expect(match.winner_id).toBe(77048083);
    });
  });
  
  describe('reopen method', () => {
    it('Reopens the match for scoring', async () => {
			match.state = 'closed'
      const { completeRecording } = await record("matches/reopen_200");

      await match.reopen();
    
      completeRecording();

      expect(match.state).toBe('open');
    });
  });
  
  describe('getAllAttachments method', () => {
    it('Retrieves all of the match attachments', async () => {
      const { completeRecording } = await record("matchAttachments/index_200");

      await match.getAllAttachments();
    
      completeRecording();

			expect(match.attachments).toHaveLength(3);
      expect(match.attachments[0].id).toBe(345326);
    });
  });
  
  describe('createAttachment method', () => {
    it('Retrieves all of the match attachments', async () => {
      const { completeRecording } = await record("matchAttachments/create_200");

			expect(match.attachments).toHaveLength(0);
      const attachment = await match.createAttachment({description: "A new file attachment"});
    
      completeRecording();

			expect(attachment.description).toBe('A new file attachment');
			expect(match.attachments).toHaveLength(1);
    });
  });
});