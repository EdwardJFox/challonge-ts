import { Tournament } from '../src';

var fs = require('fs');
import { setupRecorder } from "nock-record";

const challonge_api_key = fs.readFileSync('./tests/api_key.txt', 'utf8');
const record = setupRecorder({ fixturePath: 'tests/adapter/__nock-fixtures__'});

describe('Tournament class', () => {
  let tournament;

  beforeEach(() => {
    tournament = new Tournament(challonge_api_key, {
      "id": 4731515,
      "name": "testNameChallongeTs",
      "url": "testUrlChallongeTs",
      "description": "",
      "tournament_type": "double elimination",
      "started_at": null,
      "completed_at": null,
      "require_score_agreement": false,
      "notify_users_when_matches_open": true,
      "created_at": "2018-06-25T00:30:46.667+02:00",
      "updated_at": "2018-06-25T00:30:46.667+02:00",
      "state": "pending",
      "open_signup": false,
      "notify_users_when_the_tournament_ends": true,
      "progress_meter": 0,
      "quick_advance": false,
      "hold_third_place_match": false,
      "pts_for_game_win": "0.0",
      "pts_for_game_tie": "0.0",
      "pts_for_match_win": "1.0",
      "pts_for_match_tie": "0.5",
      "pts_for_bye": "1.0",
      "swiss_rounds": 0,
      "private": false,
      "ranked_by": null,
      "show_rounds": false,
      "hide_forum": false,
      "sequential_pairings": false,
      "accept_attachments": false,
      "rr_pts_for_game_win": "0.0",
      "rr_pts_for_game_tie": "0.0",
      "rr_pts_for_match_win": "1.0",
      "rr_pts_for_match_tie": "0.5",
      "created_by_api": true,
      "credit_capped": false,
      "category": null,
      "hide_seeds": false,
      "prediction_method": 0,
      "predictions_opened_at": null,
      "anonymous_voting": false,
      "max_predictions_per_user": 1,
      "signup_cap": null,
      "game_id": null,
      "participants_count": 0,
      "group_stages_enabled": false,
      "allow_participant_match_reporting": true,
      "teams": null,
      "check_in_duration": null,
      "start_at": null,
      "started_checking_in_at": null,
      "tie_breaks": null,
      "locked_at": null,
      "event_id": null,
      "public_predictions_before_start_time": null,
      "ranked": false,
      "grand_finals_modifier": null,
      "predict_the_losers_bracket": null,
      "spam": null,
      "ham": null,
      "rr_iterations": null,
      "tournament_registration_id": null,
      "donation_contest_enabled": null,
      "mandatory_donation": null,
      "description_source": "",
      "subdomain": null,
      "full_challonge_url": "https://challonge.com/testUrlChallongeTs",
      "live_image_url": "https://challonge.com/testUrlChallongeTs.svg",
      "sign_up_url": null,
      "review_before_finalizing": true,
      "accepting_predictions": false,
      "participants_locked": false,
      "game_name": null,
      "participants_swappable": true,
      "team_convertable": false,
      "group_stages_were_started": false
    });
  });

  describe('get method', () => {
    it('Retrieves the tournament from the API', async () => {
      const { completeRecording } = await record("tournaments/show_200");

      await tournament.get();
    
      completeRecording();

      expect(tournament.tournament_type).toBe('single elimination')
    });
  });

  describe('update method', () => {
    it('Updates the tournament and updates the data from the API response', async () => {
      const { completeRecording } = await record("tournaments/update_200");

      await tournament.update({
        name: 'newTournamentName'
      });
    
      completeRecording();

      expect(tournament.name).toBe('newTournamentName')
    });
  });

  describe('delete method', () => {
    it('Deletes the tournament and removes the local data', async () => {
      const { completeRecording } = await record("tournaments/destroy_200");

      await tournament.delete();
    
      completeRecording();

      expect(tournament.api_key).toBeUndefined()
    });
  });

  describe('processCheckIns method', () => {
    it('Processes the tournaments check ins', async () => {
      const { completeRecording } = await record("tournaments/processCheckIns_200");

      await tournament.processCheckIns();
    
      completeRecording();

      expect(tournament.state).toBe('checked_in')
    });
  });

  describe('abortCheckIns method', () => {
    it('Aborts tournament check in', async () => {
      const { completeRecording } = await record("tournaments/abortCheckIns_200");

      await tournament.abortCheckIns();
    
      completeRecording();

      expect(tournament.state).toBe('pending')
    });
  });

  describe('startTournament method', () => {
    it('Starts the tournament', async () => {
      const { completeRecording } = await record("tournaments/start_200");

      await tournament.startTournament();
    
      completeRecording();

      expect(tournament.state).toBe('underway')
    });
  });

  describe('finalizeResults method', () => {
    it('Finalize the tournament', async () => {
      const { completeRecording } = await record("tournaments/finalize_200");

      await tournament.finalizeResults();
    
      completeRecording();

      expect(tournament.state).toBe('complete');
    });
  });

  describe('resetTournament method', () => {
    it('Resets the tournament', async () => {
      const { completeRecording } = await record("tournaments/reset_200");

      await tournament.resetTournament();
    
      completeRecording();

      expect(tournament.state).toBe('pending');
    });
  });

  describe('openForPredictions method', () => {
    it('Opens the tournament for predictions', async () => {
      const { completeRecording } = await record("tournaments/openForPredictions_200");

      await tournament.openForPredictions();
    
      completeRecording();

      expect(tournament.accepting_predictions).toBeTruthy();
    });
  });

  describe('getParticipants method', () => {
    it('Gets the tournaments participants, and creates objects for them all', async () => {
      const { completeRecording } = await record("participants/index_200");
      tournament.baseUrl = 'autototester'
      const participants = await tournament.getParticipants();
    
      completeRecording();

      expect(participants).toHaveLength(20);
      expect(participants[0].name).toBe('Delfina');
    });
  });

  describe('newParticipant method', () => {
    it('Creates new participant', async () => {
      const { completeRecording } = await record("participants/create_200");
      tournament.baseUrl = 'autototester'
      const participant = await tournament.newParticipant({
        name: 'newParticipant'
      });
    
      completeRecording();

      expect(participant.name).toBe("newParticipant");
    });
  });

  describe('bulkAddParticipants method', () => {
    it('Adds new participants matching the request', async () => {
      const { completeRecording } = await record("participants/bulkAdd_200");
      tournament.baseUrl = 'autototester'
      await tournament.bulkAddParticipants({
        participants: [{
          name: 'newParticipant1'
        },{
          name: 'newParticipant2'
        },{
          name: 'newParticipant3'
        }]
      });
    
      completeRecording();

      expect(tournament.participants).toHaveLength(3);
      expect(tournament.participants[0].name).toBe('newParticipant1');
      expect(tournament.participants[2].name).toBe('newParticipant3');
    });
  });

  describe('clearParticipants method', () => {
    it('Clears the participants of the tournament', async () => {
      const { completeRecording } = await record("participants/clear_200");
      tournament.baseUrl = 'autototester'
      const participants = await tournament.clearParticipants();
    
      completeRecording();

      expect(participants).toBe('Cleared all participants')
      expect(tournament.participants).toHaveLength(0);
    });
  });

  describe('randomizeParticipants method', () => {
    it('Randomizes the participants of the tournament', async () => {
      const { completeRecording } = await record("participants/randomize_200");
      tournament.baseUrl = 'autototester'

      const participants = await tournament.randomizeParticipants();
    
      completeRecording();

      expect(participants).toHaveLength(24);
      expect(participants[0].name).toBe('Charline');
    });
  });
});