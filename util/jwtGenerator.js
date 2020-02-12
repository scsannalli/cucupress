var jwt = require('atlassian-jwt');
var moment =require('moment');
const now = moment().utc();

var ACCESS_KEY = 'NGU5M2MzNTQtZTI0ZC0zYTBiLTk5NzAtZDMyNjJkZjhiYmEwIDVlMzkxZWRlYjM0MTUzMGU2MmFjZjMzMCBVU0VSX0RFRkFVTFRfTkFNRQ'
var SECRET_KEY = '85UMRj81unCxNL0b9w3yVnEvno2TNrrCQ2Ax_y5Mz_o'
var ACCOUNT_ID = ''

console.log(ACCOUNT_ID);

var token = generateJWT();
console.log(token);


function generateJWT(){

var method = 'GET'
var uri = '/public/rest/api/1.0/test/export/bdd/feature?issueId=TST2CP-3'
//var import_features_uri = ''
var export_results_uri = '/public/rest/api/1.0/bdd/results/import' 
var val1 = true; 
if (val1==true){
    method='POST';
    uri = export_results_uri;
}


jwt.Request = jwt.fromMethodAndUrl(method, uri);

    console.log(jwt.Request);

    jwt_payload = {
        'accountId' : '123456:1234abcd-1234-abcd-1234-1234abcd1234',
        'iat': now.unix(),
        'exp': now.add(30, 'minutes').unix(),
        'iss': ACCESS_KEY,
        'qsh': jwt.createQueryStringHash(jwt.Request),
        
    }

    console.log(jwt_payload)

    var token = jwt.encode(jwt_payload, SECRET_KEY);

    return token;
}
