let request = require('supertest');
var download = require('download-file');
const config = require('config');
const minimist = require('minimist');

describe('API call to search the issue attachement', () => {
    let attachmentLink;
    let fileLink;

    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });

    it('Get the URL for the attachement', async () => {
        let response = await request(params.serviceUrl)
            .get('TES-2')
            .set('Content-Type', 'application/json')
            .auth(params.username, params.password)
            .retry(3);
        attachmentLink = await response.body.fields.attachment[0].content;
    });
});
