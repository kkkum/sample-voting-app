const express = require('express');
var Request = require('request');
var os = require("os");

module.exports = function (app) {
  const router = express.Router();
  var hostname = os.hostname();

  router.get('/', function (req, res, next) {
    res.json({
      status: 'GET SUCCESS'
    });
  });

  router.get('/:vid', function (req, res, next) {
    let vid = req.params.vid;
    console.log('voteId is:', vid)
    console.log('Processed by container ID ' + hostname);

    // If the Environment Variable NODEREDURL is set, use it to call a backing service like Node-RED
    if (basePath = process.env.NODEREDURL) {
      let path = basePath + vid;

      Request.get(path, (error, response, body) => {
        if (error) {
          res.json({
            status: JSON.stringify(error)
          });
        }

        // If no error, Parse the GET Response Body into a JSON object
        var responseBody4UI = JSON.parse(body);
        console.log("Get Response body is:", responseBody4UI);

        // Append the processed by Container ID information to the reply status
        responseBody4UI.status += ' Processed by Container ID ' + hostname;
        console.log("Modified Response body is:", responseBody4UI);

        res.json(
          //  JSON.parse(responseBody4UI)
          responseBody4UI
        );
      });
    } else {
      // If Environment Variable NODEREDURL is not set, return the status text to the client
      res.json({
        status: 'Vote for ' + vid + ' submitted. Processed by Container ID ' + hostname
      });
    }

  });

  // POST is Not Used
  router.post('/', function (req, res, next) {
    console.log('req.headers is: ', req.headers);
    console.log('req.method is: ', req.method);
    res.json({
      status: 'POST SUCCESS'
    });
  });

  app.use('/backend', router);
}