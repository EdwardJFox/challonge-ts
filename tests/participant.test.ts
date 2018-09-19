import Participant from '../src/participant';

var fs = require('fs');
import { setupRecorder } from "jest-nock-record";

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder({ fixturePath: 'tests/adapter/__nock-fixtures__'});

describe('Participant class', () => {
  let participant;

  beforeEach(() => {
    participant = new Participant(challonge_api_key, 'autototester', 76885646);
  });
  
  describe('get method', () => {
    it('Retrieves the participant from the API', async () => {
      participant.id = 76885627;
      const { completeRecording } = await record("participants/show_200");

      await participant.get();
    
      completeRecording();

      expect(participant.display_name).toBe('Delfina');
    });
  });

  describe('update method', () => {
    it('Updates the participant', async () => {
      const { completeRecording } = await record("participants/update_200");

      await participant.update({
        participant: {
          name: 'NewName'
        }
      });
    
      completeRecording();

      expect(participant.name).toBe('NewName');
    });
  });

  describe('checkIn method', () => {
    it('Checks the participant in', async () => {
      const { completeRecording } = await record("participants/checkIn_200");

      await participant.checkIn();
    
      completeRecording();

      expect(participant.checked_in).toBeTruthy();
    });
  });

  describe('undoCheckIn method', () => {
    it('Sets the participants checked in state to false', async () => {
      const { completeRecording } = await record("participants/undoCheckIn_200");

      await participant.undoCheckIn();
    
      completeRecording();

      expect(participant.checked_in).toBeFalsy();
    });
  });

  describe('destroy method', () => {
    it('Removes the api key from the object', async () => {
      const { completeRecording } = await record("participants/destroy_200");

      await participant.destroy();
    
      completeRecording();

      expect(participant.api_key).toBeUndefined();
    });
  });
});