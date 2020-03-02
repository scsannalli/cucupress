const request = require('supertest');
const testData = require('../test_data/products.json');
const minimist = require('minimist');
const config = require('config');
let fs = require("fs");
const expect = require('chai').expect;
let path = require('path')
var parseString = require('xml2js').parseString;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function writeFeature(fileName, text) {
    fs.writeFile(path.resolve('__dirname', '../cypress/integration/examples', fileName), text, (err) => {
        if (err) throw err;
    });
}

describe('Products API Test', () => {
    
    let post_id;
    let post_request = testData.product_post_request;
    let patch_request = testData.product_post_request;

    
    before(async function() {
        // fetching the command line arguments
        const args = minimist(process.argv.slice(2));
        // assiging  the environment globally
        const env = args.env;
        global.params = config.get(env);
    });

    it('Get the feature', async() => {
        let response = await request('https://jira2.sgp.dbs.com:8443/dcifjira/rest/zapi/latest/teststep/2010854/')
        .get('')
        .set('Authorization', 'Basic auth')
        .retry(3);
        
        let body = await response.body.stepBeanCollection;
        let featureData = '';

        body.forEach(element => {
            featureData = featureData + element.step + '\n'
        });
        console.log(featureData)
        writeFeature('test.feature', featureData);
    })
    
    it('Get all the products', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .get('products')
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(await response.statusCode).to.equal(200);
    });

    it('Get a product by existing Id', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .get('products/' + testData.product_data.id)
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(response.statusCode).to.equal(200);
    });

    it('Get a product by non-existing Id', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .get('products/' + testData.no_record_id)
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(await response.statusCode).to.equal(404);
    });

    it('Post a product to the service', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .post('products')
            .set('Content-Type', 'application/json')
            .send(post_request)
            .retry(3);
        post_id = await response.body.id;
        expect(await response.statusCode).to.equal(201);
    });

    it('Verify the post request data', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .get('products/' + post_id)
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(await response.statusCode).to.equal(200);
        expect(await response.body.name).to.equal(post_request.name);
        expect(await response.body.type).to.equal(post_request.type);
        expect(await response.body.price).to.equal(post_request.price);
        expect(await response.body.shipping).to.equal(post_request.shipping);
        expect(await response.body.upc).to.equal(post_request.upc);
        expect(await response.body.description).to.equal(
            post_request.description
        );
        expect(await response.body.manufacturer).to.equal(
            post_request.manufacturer
        );
        expect(await response.body.model).to.equal(post_request.model);
        expect(await response.body.url).to.equal(post_request.url);
        expect(await response.body.image).to.equal(post_request.image);
    });

    it('Post with a bad request should Fail', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .post('products')
            .set('Content-Type', 'application/json')
            .send(testData.product_bad_request)
            .retry(3);
        expect(await response.statusCode).to.equal(400);
    });

    it('Post with a empty body should Fail', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .post('products')
            .set('Content-Type', 'application/json')
            .send('{}')
            .retry(3);
        expect(await response.statusCode).to.equal(400);
    });

    it('Patch a product to the service', async () => {
        patch_request.upc = '123456789';
        const response = await request(params.serviceJSONbaseUrl)
            .patch('products/' + post_id)
            .set('Content-Type', 'application/json')
            .send(patch_request)
            .retry(3);
        expect(await response.statusCode).to.equal(200);
    });

    it('Patch request to a non-exisiting product Id should fail', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .patch('products/' + testData.no_record_id)
            .set('Content-Type', 'application/json')
            .send(patch_request)
            .retry(3);
        expect(await response.statusCode).to.equal(404);
    });

    it('Patch request with empty body should not update anything', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .patch('products/' + post_id)
            .set('Content-Type', 'application/json')
            .send('{}')
            .retry(3);
        expect(await response.statusCode).to.equal(200);
        expect(response.body.name).to.equal(patch_request.name);
        expect(await response.body.type).to.equal(patch_request.type);
        expect(await response.body.price).to.equal(patch_request.price);
        expect(await response.body.shipping).to.equal(patch_request.shipping);
        expect(await response.body.upc).to.equal(patch_request.upc);
        expect(await response.body.description).to.equal(
            patch_request.description
        );
        expect(await response.body.manufacturer).to.equal(
            patch_request.manufacturer
        );
        expect(await response.body.model).to.equal(patch_request.model);
        expect(await response.body.url).to.equal(patch_request.url);
        expect(await response.body.image).to.equal(patch_request.image);
    });

    it('Delete a product by product id', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .delete('products/' + post_id)
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(await response.statusCode).to.equal(200);
    });

    it('Verify the deletion of product', async () => {
        const response = await request(params.serviceJSONbaseUrl)
            .get('products/' + post_id)
            .set('Content-Type', 'application/json')
            .retry(3);
        expect(await response.statusCode).to.equal(404);
    });
    
    
    
});
