const request = require('request');
const config = require('config');
const ZapClient = require('zaproxy');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

env = 'test'
global.params = config.get(env);
let options = {
  proxy: params.ZAP_PROXY_URL
};
const policyName = params.ZAP_ASCAN_POLICY_NAME;
const contextName = params.ZAP_CONTEXT;
var zaproxy = new ZapClient(options);
var address = '';


async function startZap() {
  var d = new Date();
  exec("./zap.sh -port 9090 -config api.disablekey=true -newsession " + d.getTime(), { cwd: params.ZAP_PROXY_LOCATION })
  console.log("Validating Zap")
  try {
    const response = await validateZapStatus()
    console.log("Response is " + response);
  }
  catch (err) {
    console.log('Response failed', err);
  }
  console.log("Validated Zap")
  await setAscanPolicy();
  await setContext();
}

function startScan(endpoint) {
  var d = new Date();
  console.log("Running Spider...");
  zaproxy.spider.scan(address + endpoint, 0, function (err, resp) {
    if (err) {
      throw new Error("Spider Start Failed." + err);
    } else {
      console.log(resp + "...done.");
    }
  });
};

async function setContext(){
  
  await zaproxy.context.removeContext(contextName)
    .then(
      respnse => console.log("removed context: " + contextName),
      err => {
        console.log("Failed to remove context:" + err.message);
      });

  let contextFilePath = path.resolve("config", "zapconfigs", contextName + ".context");
  await zaproxy.context.importContext(contextFilePath)
    .then(
      response => console.log("imported context"),
      err => {
        console.log("error while importing context: " + err.message);
        throw new Error("context importing Failed.");
      });

  await zaproxy.pscan.setScanOnlyInScope(true)
    .then(
      resp => console.log("PScan URLS Only InScope: " + JSON.stringify(resp)),
      err => console.log('Failed to set PScan URLS Only InScope: ' + err.message)
    );
}

async function setAscanPolicy(){
  
  await zaproxy.ascan.removeScanPolicy(policyName)
    .then(
    respnse => {console.log("removed scan policy: ")},
      err => {
        console.log("Failed to remove scan policy:" + err.message);
      });

  let policyFilePath = path.resolve("config", "zapconfigs", policyName + ".policy");
  await zaproxy.ascan.importScanPolicy(policyFilePath)
    .then(
      response => console.log("imported scan policy"),
      err => {
        console.log("error while importing policy: " + err.message);
        throw new Error("Policy importing Failed.");
      });
}

async function runActiveScan() {
  
  console.log("Running Active Scan...");
  let contextId = await zaproxy.context.context(contextName)
    .then(
        resp => { return resp.context.id },
        err => console.log(" error in getting contextID = "+err.message)
    );
  await zaproxy.ascan.scan("", 1, 1, policyName, "", "", contextId, function (err, resp) {
    if (err) {
      console.log(err);
      throw new Error("Active Scan Start Failed." + err);
    } else {
      console.log(resp + "...done.");

    }
  });
}

async function generateHTMLReport() {
  await zaproxy.core.htmlreport(function (err, resp) { // Generate report
    if (err) {
      throw new Error("ZAP Report Generation Failed." + err);
    } else {
      fs.writeFile('zap-test-report.html', resp, function (err) { // Print report to file
        if (!err) {
          console.log("...done.");
          console.log("Report has been generated to: zap-test-report.html");
        } else {
          throw new Error("Report Save Failed." + err);
        }
      });
    }
  });
}

async function generateJSONReport() {

  await zaproxy.core.jsonreport(function (err, resp) { // Generate report
    if (err) {
      throw new Error("ZAP Report Generation Failed." + err);
    } else {
      fs.writeFile('zap-test-report.json', JSON.stringify(resp), function (err) { // Print report to file
        if (!err) {
          console.log("...done.");
          console.log("Report has been generated to: zap-test-report.html");
        } else {
          throw new Error("Report Save Failed." + err);
        }
      });
    }
  });
}


function validateZapStatus() {

  return new Promise((resolve, reject) => {
    var respCode = '500'
    var timeout = 3000;
    let counter = 0;
    let timerId = setInterval(() => {
      var resp = zrequest()
      resp.then(function (result) {
        respCode = result;
      }, function (err) {
        console.log(err);
      })
      counter += 1;
      if (counter == 15 || respCode == '200') {
        clearInterval(timerId);
        if (respCode == '200') {
          resolve(respCode);
        }
        else
          reject(respCode)
      }
    }, timeout);
  });

};



async function zrequest() {
  var options = {
    url: params.ZAP_PROXY_URL,
    headers: {
      // 'User-Agent': 'request'
    }
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, response, body) {
      if (err) {
        reject(err);
      } else {
        console.log(response.statusCode)
        resolve(response.statusCode);
      }
    })
  })
};

module.exports.startScan = startScan;
module.exports.startZap = startZap;
module.exports.runActiveScan = runActiveScan;
module.exports.generateHTMLReport = generateHTMLReport;
module.exports.generateJSONReport = generateJSONReport;
module.exports.validateZapStatus = validateZapStatus;
module.exports.zrequest = zrequest;
