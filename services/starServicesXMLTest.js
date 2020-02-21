let request = require('supertest');
const config = require('config');
const minimist = require('minimist');
var parser = require('xml2json');

describe('API call to search the issue attachement', () => {
    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });

    it('Parse the XML response for Validation', async () => {
        let response = await request(params.serviceUrl)
            .get('')
            .set('Content-Type', 'application/json')
            .retry(3);
        console.log(parser.toJson(response.text, params.options));
    });
});
