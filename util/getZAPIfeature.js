const request = require('supertest');
const testData = require('../test_data/products.json');
const minimist = require('minimist');
const config = require('config');
let fs = require("fs");
const expect = require('chai').expect;
let path = require('path')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function writeFeature(fileName, text) {
    fs.writeFile(path.resolve('__dirname', '../cypress/integration/examples', fileName), text, (err) => {
        if (err) throw err;
    });
}

describe('Products API Test', () => {
    
    let issues;

    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });


    it('Get the Issues', async() => {
        let response = await request(params.zapiUrl)
            .get('api/2/search?jql=labels%20in%20(BDD_Scenario)%20AND%20project=CCAB')
            .query({
                fields : 'description'
            })
            .set('Authorization', 'Basic ')
            .retry(3);
        issues = await response.body.issues;
    }) 

    it('Read each issue and write to file', async() => {
        
        let featureData = 'Feature:' + ' \n\n';
        for(issue of issues) {
            featureData = featureData + '\n' + 'Scenario: ' + issue.fields.description + '\n';
            const featureResponse = await request(params.zapiUrl +'zapi/latest/teststep/' + issue.id)
                .get('')
                .set('Authorization', 'Basic c2hpdmFsaW5nOiFTaGl2MzkxMDM5MTA=')
                .retry(3);
            let steps = await featureResponse.body.stepBeanCollection;
            for(stepElement of steps) {
                featureData = featureData + '\t' +  await(stepElement.step) + '\n';
            }
        }
        writeFeature('test.feature', featureData);

    });
    
})
