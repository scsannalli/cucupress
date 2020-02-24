var jwt = require('atlassian-jwt');
var moment =require('moment');
const now = moment().utc();
const config = require('config');

var token = generateJWT();
console.log(token);


function generateJWT(){
    global.params = config.get('test');
    var method = 'GET'
    var uri = '/public/rest/api/1.0/test/export/bdd/feature?issueId='+params.featureFile;
    var export_results_uri = '/public/rest/api/1.0/bdd/results/import' 
    var val1 = true; 
    if (val1==true){
        method='POST';
        uri = export_results_uri;
    }
    jwt.Request = jwt.fromMethodAndUrl(method, uri);
    jwt_payload = getPayLoad();
    console.log(jwt_payload)
    var token = jwt.encode(jwt_payload, params.secretKey);
    return token;
}

function getPayLoad() {  
    jwt_payload = {
        'sub': params.accountId,
        'iat': now.unix(),
        'exp': now.add(30, 'minutes').unix(),
        'iss': params.accessKey,
        'qsh': jwt.createQueryStringHash(jwt.Request),
    };
    return jwt_payload;
}

