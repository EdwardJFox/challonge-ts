# Challonge Typescript API Interface
An overdone [Challonge](https://challonge.com/) API interface and adapter, written with Typescript but should work in ES6+ too.

## Using the adapter
The adapter is a direct stateless interface with Challonge, with no frills, you're calling the Challonge API directly.

### Example - Retrieving a list of tournaments with the TournamentAdapter
The following returns the direct raw response from the Challonge API
```
import { TournamentAdapter } from 'challonge-ts';

const test = async () => {
  const data = await TournamentAdapter.index('api_key');

  console.log(data);
}

test(); // Direct response from the API, array of tournament JSON objects
```

Due to the direct nature of these adapters, I recommend looking at both the [Challonge API](https://api.challonge.com/v1) documentation for the routes, and the [ChallongeTS documentation](https://edwardjfox.github.io/challonge-ts/) 

## Using the class
Devised as a nicer abstraction over the adapter, this is a set of classes which wrap the adapter in a more OO type way, if that's your thing.

### Example - Retrieving a list of tournaments with the Challonge class

```
import { Challonge } from 'challonge-ts';

const test = async () => {
  const challonge = new Challonge('api_key')
  const tournaments = await challonge.getTournaments();

  console.log(tournaments); // Array of Tournament objects
}

test();
```

## Running the tests
The tests for this are written using [Jest](https://jestjs.io/), and uses [Nock Record](https://www.npmjs.com/package/nock-record) to stub the API requests to Challonge. To run them do the following:

1. Create an `api_key.txt` file in the `tests` folder, containing an api key which matches the nock files if running offline, or your live api key if regenerating the nock files. In the case of the master branch, the file should just contain `test_api_key`
2. Run `npm test` in the console.

To regenerate the API nock files, delete the `tests/adapter/__nock-fixtures__` folder and re-run the tests. With a valid API key, the files should be regenerated. Once the tests pass and the files have been generated, remember to do a find and replace for your API key to `test_api_key` to ensure you don't push your public Challonge API key to a public repo!

## Building
Ensure you have `gulp-cli` installed locally, then run `npm run build`. Hopefully it goes all right with no errors! :)

## Merging with master
After you have run the tests, and built the project, your repo should be good to go for merging with master!