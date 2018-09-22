import Attachment from '../src/attachment';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder({ fixturePath: 'tests/adapter/__nock-fixtures__'});

describe('Match class', () => {
  let attachment;

  beforeEach(() => {
    attachment = new Attachment(challonge_api_key, 'autototester', 125316886, 345327);
  });
  
  describe('get method', () => {
    it('Retrieves the match from the API', async () => {
      const { completeRecording } = await record("matchAttachments/show_200");

      await attachment.get();
    
      completeRecording();

      expect(attachment.description).toBe("A new file attachment");
    });
  });
  
  describe('update method', () => {
    it('Updates the matches details', async () => {
      const { completeRecording } = await record("matchAttachments/update_200");

      await attachment.update({
				description: "Updated file attachment"
			});
    
      completeRecording();

      expect(attachment.description).toBe("Updated file attachment");
    });
  });
  
  describe('delete method', () => {
    it('Updates the matches details', async () => {
      const { completeRecording } = await record("matchAttachments/destroy_200");

      await attachment.delete();
    
      completeRecording();

      expect(attachment.api_key).toBeUndefined();
    });
  });
});