let request = require("supertest");
var download = require("download-file");
const config = require('config');
const minimist = require('minimist');

describe("API call to search the issue attachement", () => {

	let attachmentLink;
	let fileLink;

	before(async function () {
		    // fetching the command line arguments
				const args = minimist(process.argv.slice(2));

				// assiging  the environment globally
				const env = args.env;
				global.params = config.get(env);



	});

	it("Get the URL for the attachement", async () => {
		let response = await request(
				"https://shivajira.atlassian.net/rest/api/2/issue/"
			)
			.get("TES-2")
			.set("Content-Type", "application/json")
			.auth("prasadmudedla@gmail.com", "4aJ0HDFnTaFcStg3fvAc85E2")
			.retry(3);
		attachmentLink = await response.body.fields.attachment[0].content;
	});

	it("Get the data from attachement", async () => {
		let response = await request(attachmentLink)
			.get("")
			.set("Content-Type", "text/plain")
			.auth("prasadmudedla@gmail.com", "4aJ0HDFnTaFcStg3fvAc85E2")
			.retry(3);
		fileLink = response.headers.location;
	});

	it("Dowloads the file", async () => {
		fileName = fileLink
			.split("&name=")
			.slice(-1)
			.join();
		let options = {
			directory: "./cypress/integration",
			filename: fileName
		};
		download(fileLink, options, function (err) {
			if (err) throw err;
		});
	});

});