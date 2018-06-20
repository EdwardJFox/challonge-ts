import { Challonge } from '../src';
import * as challongeInterfaces from '../src/interfaces';

let challonge;
let mainName = Math.random().toString(36).substring(7);
let mainUrl = Math.random().toString(36).substring(7);
const challonge_api_key = 'i_am_an_api_key';

describe('Challonge', () => {

	beforeAll(async () => {
		challonge = new Challonge(challonge_api_key);
		await challonge.createTournament({
			name: mainName,
			url: mainUrl,
			tournament_type: challongeInterfaces.tournamentTypeEnum.DOUBLE_ELIMINATION
		});
	});
	
	describe('Tournaments', () => {
		describe('getTournaments', () => {
			it('should get a list of tournaments associated with the Challonge account', async () => {
				let res = await challonge.getTournaments();
	
				expect(res).toBeDefined();
				expect(res.status).toBe(200);
				expect(res.tournaments.length).toBeGreaterThan(0);
				expect(res.tournaments[0].tournament).toBeDefined();
			});
		});
	
		describe('createTournament', () => {
			it('should create a tournament', async () => {
				let name = Math.random().toString(36).substring(7);
				let url = Math.random().toString(36).substring(7);
	
				let res = await challonge.createTournament({
					name: name,
					url: url,
					tournament_type: challongeInterfaces.tournamentTypeEnum.DOUBLE_ELIMINATION
				});
	
				expect(res).toBeDefined();
				expect(res.status).toBe(200);
				expect(res.tournament).toBeDefined();
				expect(res.tournament.name).toBe(name);
				expect(res.tournament.url).toBe(url);
			});
		});
	
		describe('getTournament', () => {
			it('should get a named tournaments information', async () => {
				let res = await challonge.getTournament(mainUrl);
	
				expect(res).toBeDefined();
				expect(res.tournament).toBeDefined();
				expect(res.tournament).toHaveProperty('name')
			});
		});
	
		describe('updateTournament', () => {
			it('should create a tournament', async () => {
				let res = await challonge.updateTournament(mainUrl, {
					name: "updatedName"
				});
	
				expect(res).toBeDefined();
				expect(res.tournament).toBeDefined();
				expect(res.tournament.name).toBe("updatedName");
				expect(res.tournament.url).toBe(mainUrl);
			});
		});
	
		describe('destroyTournament', () => {
			it('should destroy a tournament', async () => {
				let name = Math.random().toString(36).substring(7);
				let url = Math.random().toString(36).substring(7);
	
				let createRes = await challonge.createTournament({
					name: name,
					url: url
				});
			});
		});
	
		describe('startTournament', () => {
			it.skip('should start a tournament', async () => {
				let name = Math.random().toString(36).substring(7);
				let url = Math.random().toString(36).substring(7);
	
				let createRes = await challonge.createTournament({
					name: name,
					url: url
				});
	
				challonge.startTournament(url, { include_participants: 1, include_matches: 1 }).catch(err => console.log(err));
			});
		});	
	});
});