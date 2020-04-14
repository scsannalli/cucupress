let options = {
  proxy: 'http://localhost:8080'
};

var address = 'http://localhost:3000';
const ZapClient = require('zaproxy');
var exec = require('child_process').exec;
var fs = require('fs');

 startApplication();

// startScan();




function startApplication() {
    var d =  new Date();
    exec("./zap.sh -daemon -config api.disablekey=true -newsession " + d.getTime(), 
    { cwd: '/Users/shivaling/Downloads/ZAP_D-2020-03-23' })
     
}

async function startScan() {

  // startApplication()
  var zaproxy = new ZapClient(options);
  var d = new Date();
  console.log("Starting ZAP...");

  console.log("Running Spider...");

  await zaproxy.spider.scan(address, 0, function (err, resp) {
    if (err) {
      throw new Error("Spider Start Failed." + err);
    } else {
      console.log(resp + "...done.");
      
    }
  });

  console.log("Running Active Scan...");

  await zaproxy.ascan.scan (address, 1, 1, "Default Policy", "", "", "", function (err, resp) {
    if (err) {
      console.log(err);
      throw new Error("Active Scan Start Failed." + err);
    } else {
      console.log(resp + "...done.");
      
    }
  });

 

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


module.exports.startScan = startScan;
