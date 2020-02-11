let request = require("supertest");
let fs = require("fs");
let path = require('path')

describe("API call to search the issue attachement", () => {

	let reportFiles;

	before(async () => {
		// fetching the command line arguments
		const args = minimist(process.argv.slice(2));
		// assiging  the environment globally
		const env = args.env;
		global.params = config.get(env);

		fs.readdir(path.resolve('__dirname', '../cypress/cucumber-json'), function (err, items) {
			if(err) throw err;
			reportFiles = items;
		});
	});

	it("Print the report files", async () => {
		await reportFiles.forEach(file => {console.log(file)})
	});

	it('reports each file to JIRA', async () => {



	});


});