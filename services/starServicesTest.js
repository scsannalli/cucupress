let request = require('supertest');
const config = require('config');
const minimist = require('minimist');
var parseString = require('xml2js').parseString;

describe('API call to search the issue attachement', () => {
    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });

    it('Get the URL for the attachement', async () => {
        let response = await request(params.serviceUrl)
            .get('')
            .set('Content-Type', 'application/json')
            .retry(3);
        parseString(response.text, { trim: true }, function(err, result) {
            console.log(JSON.stringify(result));
        });
    });
});
