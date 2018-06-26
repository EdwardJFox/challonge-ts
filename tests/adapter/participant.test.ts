import { url } from '../../src/adapter/base';
import * as participantAdapter from '../../src/adapter/participants';
import * as challongeInterfaces from '../../src/interfaces/participant.interface';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

let mainUrl = 'autototester';

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder();

describe('Challonge Adapter - Participants', () => {
  describe('index function', () => {
    it('Retrieves an array of all participants', async () => {
      const { completeRecording } = await record("participants/index_200");

      const data = await participantAdapter.index(challonge_api_key, url(mainUrl));
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participants).toHaveLength(20);
    });
  });
  
  describe('create function', () => {
    it('Creates a participant and returns the same participant', async () => {
      const { completeRecording } = await record("participants/create_200");

      const data = await participantAdapter.create(challonge_api_key, url(mainUrl), {
        participant: {
          name: 'newParticipant'
        }
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.name).toBe('newParticipant');
    });
  });
  
  describe('bulkAdd function', () => {
    it('Creates a participant and returns the same participant', async () => {
      const { completeRecording } = await record("participants/bulkAdd_200");

      const data = await participantAdapter.bulkAdd(challonge_api_key, url(mainUrl), {
        participants: [{
          name: 'newParticipant1'
        },{
          name: 'newParticipant2'
        },{
          name: 'newParticipant3'
        }]
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participants[0].participant.name).toBe('newParticipant1');
      expect(data.participants[1].participant.name).toBe('newParticipant2');
      expect(data.participants[2].participant.name).toBe('newParticipant3');
    });
  });
  
  describe('show function', () => {
    it('Returns the participant with the matching id participant', async () => {
      const { completeRecording } = await record("participants/show_200");

      const data = await participantAdapter.show(challonge_api_key, url(mainUrl), 76885627);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.name).toBe('Delfina');
      expect(data.participant.id).toBe(76885627);
    });
  });
  
  describe('update function', () => {
    it('Updates the participants details', async () => {
      const { completeRecording } = await record("participants/update_200");

      const data = await participantAdapter.update(challonge_api_key, url(mainUrl), 76885646, {
        participant: {
          name: 'NewName'
        }
      });
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.name).toBe('NewName');
      expect(data.participant.id).toBe(76885646);
    });
  });
  
  describe('checkIn function', () => {
    it('Updates a participants state to be checked in', async () => {
      const { completeRecording } = await record("participants/checkIn_200");

      const data = await participantAdapter.checkIn(challonge_api_key, url(mainUrl), 76885646);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.checked_in).toBeTruthy();
      expect(data.participant.id).toBe(76885646);
    });
  });
  
  describe('undoCheckIn function', () => {
    it('Undoes checking for participant', async () => {
      const { completeRecording } = await record("participants/undoCheckIn_200");

      const data = await participantAdapter.undoCheckIn(challonge_api_key, url(mainUrl), 76885646);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.checked_in).toBeFalsy();
      expect(data.participant.id).toBe(76885646);
    });
  });
  
  describe('destroy function', () => {
    it('Updates the participants details', async () => {
      const { completeRecording } = await record("participants/destroy_200");

      const data = await participantAdapter.destroy(challonge_api_key, url(mainUrl), 76885646);
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participant.name).toBe('NewName');
      expect(data.participant.id).toBe(76885646);
    });
  });
  
  describe('clear function', () => {
    it('Removes all participants from a tournament', async () => {
      const { completeRecording } = await record("participants/clear_200");

      const data = await participantAdapter.clear(challonge_api_key, url(mainUrl));
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.message).toBe('Cleared all participants');
    });
  });
  
  describe('randomize function', () => {
    it('Calls the randomize endpoint and returns participants', async () => {
      const { completeRecording } = await record("participants/randomize_200");

      const data = await participantAdapter.randomize(challonge_api_key, url(mainUrl));
    
      completeRecording();

      expect(data.status).toBe(200);
      expect(data.participants).toHaveLength(24);
    });
  });
});