let request = require('supertest');
const config = require('config');
const minimist = require('minimist');
let fs = require("fs");
let path = require('path')
var parseString = require('xml2js').parseString;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function writeFeature(fileName, text) {
    fs.writeFile(path.resolve('__dirname', '../cypress/integration/examples', fileName), text, (err) => {
        if (err) throw err;
    });
}


describe('API call to search the issue attachement', () => {
    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });

    it('Get the data', async() => {
        let response = await request('')
        .get('')
        .set('Authorization', '')
        .retry(3);
        
        let body = await response.body.stepBeanCollection;
        let featureData = '';

        body.forEach(element => {
            featureData = featureData + element.step + '\n'
        });
        console.log(featureData)
        writeFeature('test.feature', featureData);
    }) 






});

