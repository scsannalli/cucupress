let jwt = require('atlassian-jwt');
let moment = require('moment');
let request = require("supertest");
const config = require('config');
const minimist = require('minimist');
let fs = require("fs");
let path = require('path')
const now = moment().utc();

let token;
let fileName;

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

function writeFeature(fileName, text) {
	fs.writeFile(path.resolve('__dirname', '../cypress/integration', fileName), text, (err) => {
		if (err) throw err;
  	console.log('The file has been saved!');
	});
}

describe("Zephyr files", () => {

	before(async function () {

		const args = minimist(process.argv.slice(2));
		const env = args.env;
		global.params = config.get(env);

	});
	it("download the files", async () => {

		token = generateJWT('GET', 'test/export/bdd/feature?issueId=10010')
		let response = await request(params.zephyrUrl)
			.get("test/export/bdd/feature?issueId=10010")
			.set("Authorization", "jwt " + token)
			.set("zapiAccessKey", params.accessKey)
			.retry(3);
		fileName = (response.header['content-disposition']).split("=")[1];
		writeFeature(fileName, response.text);
	});

	it('upload the report', async () => {
		token = generateJWT('POST', 'bdd/results/import')
		let response = await request(params.zephyrUrl)
			.post('bdd/results/import')
			.set("Authorization", "jwt " + token)
			.set("zapiAccessKey", params.accessKey)
			.attach('bddresult', path.resolve('__dirname', '../cypress/cucumber-json', 'login.cucumber.json'))
			.retry(3);
	});

});
