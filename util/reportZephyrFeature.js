let jwt = require('atlassian-jwt');
let moment = require('moment');
let request = require("supertest");
const config = require('config');
const minimist = require('minimist');
let fs = require("fs");
let path = require('path')
const now = moment().utc();

let token;

function generateJWT(method, url) {
	jwt.Request = jwt.fromMethodAndUrl(method, '/public/rest/api/1.0/' + url);
    jwt_payload = {
        'iat': now.unix(),
        'exp': now.add(10, 'minutes').unix(),
        'iss': params.accessKey,
        'qsh': jwt.createQueryStringHash(jwt.Request),
    }
    var token = jwt.encode(jwt_payload, params.secretKey);
    return token;
}

describe("Zephyr files", () => {

	before(async function () {

		const args = minimist(process.argv.slice(2));
		const env = args.env;
		global.params = config.get(env);

	});

	it('upload the report', async () => {
		token = generateJWT('POST', 'bdd/results/import')
		let response = await request(params.zephyrUrl)
			.post('bdd/results/import')
			.set("Authorization", "jwt " + token)
			.set("zapiAccessKey", params.accessKey)
			.attach('bddresult', path.resolve('__dirname', '../cypress/cucumber-json', 'TST2CP-3.cucumber.json'))
			.retry(3);
	});

});
