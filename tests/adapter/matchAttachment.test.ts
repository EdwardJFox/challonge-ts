import { url } from '../../src/adapter/base';
import * as matchAttachmentAdapter from '../../src/adapter/matchAttachments';
import * as challongeInterfaces from '../../src/interfaces/matchAttachment.interface';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

let mainUrl = 'autototester';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Matches', () => {
  describe('index function', () => {
    it('Retrieves an array of all attachments for a match', async () => {
      const { completeRecording } = await record("matchAttachments/index_200");

      const data = await matchAttachmentAdapter.index(challonge_api_key, url(mainUrl), 125316886);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.attachments).toHaveLength(3);
      expect(data.attachments[0].match_attachment.id).toBe(345326);
      expect(data.attachments[0].match_attachment.description).toBe('Lorem Ipsum');
      expect(data.attachments[1].match_attachment.id).toBe(345324);
      expect(data.attachments[1].match_attachment.description).toBe('Google homepage');
      expect(data.attachments[2].match_attachment.id).toBe(345323);
      expect(data.attachments[2].match_attachment.description).toBe('Homer');
    });
  });

  describe('create function', () => {
    it('Creates a match', async () => {
      const { completeRecording } = await record("matchAttachments/create_200");

      const data = await matchAttachmentAdapter.create(challonge_api_key, url(mainUrl), 125316886, {
        match_attachment: {
          description: 'A new file attachment'
        }
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match_attachment.description).toBe('A new file attachment');
    });
  });

  describe('show function', () => {
    it('Gets a match attachment record', async () => {
      const { completeRecording } = await record("matchAttachments/show_200");

      const data = await matchAttachmentAdapter.show(challonge_api_key, url(mainUrl), 125316886, 345327);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match_attachment.description).toBe('A new file attachment');
    });
  });

  describe('update function', () => {
    it('Updates a match attachment record', async () => {
      const { completeRecording } = await record("matchAttachments/update_200");

      const data = await matchAttachmentAdapter.update(challonge_api_key, url(mainUrl), 125316886, 345327, {
        match_attachment: {
          description: 'Updated file attachment'
        }
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match_attachment.description).toBe('Updated file attachment');
    });
  });

  describe('destroy function', () => {
    it('Deletes a match attachment record', async () => {
      const { completeRecording } = await record("matchAttachments/destroy_200");

      const data = await matchAttachmentAdapter.destroy(challonge_api_key, url(mainUrl), 125316886, 345327);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.match_attachment.description).toBe('Updated file attachment');
    });
  });
});