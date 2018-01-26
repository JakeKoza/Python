var express = require("express");
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var submitRouter = express.Router();
var frameworkurl = "mongodb://localhost:27017/submissions";
var router = function () {
    submitRouter.use(
        function (req, res, next) {
            
                // Website you wish to allow to connect
                res.setHeader('Access-Control-Allow-Origin', '*');
            
                // Request methods you wish to allow
                res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
            
                // Request headers you wish to allow
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            
                res.setHeader('Content-Type', 'application/json');
                // Set to true if you need the website to include cookies in the requests sent
                // to the API (e.g. in case you use sessions)
                //res.setHeader('Access-Control-Allow-Credentials', true);
            
                // Pass to next layer of middleware
                next();
        });
	submitRouter.route('/CheckUser')
    .post(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            console.log(req.body.userID)
            var userID = req.body.userID
            db.collection("users").find({"user.nnumber": userID}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result)
              //res.writeHead(200, {"Access-Control-Allow-Origin": "localhost"});
              if (result.length == 0){
                    res.jsonp("no user")
              }else{
                  res.jsonp("user exists")
              }
              //res.jsonp(result);
              db.close();
            });
          });
    });
    submitRouter.route('/SubmitData')
    .post(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            var guid = req.body.stat.id;
            var user = req.body.user;
            console.log(req.body.stat)
            db.collection("submissions").insertOne(req.body.stat, function(err, result) {
              if (err) throw err;
              console.log(result)
            
              db.collection("users").insertOne(JSON.parse(user), function(err, result){
                if (err) throw err;
                res.jsonp("user submitted")
              });
              //res.writeHead(200, {"Access-Control-Allow-Origin": "localhost"});
              
              //res.jsonp(result);
              db.close();
            });
          });
    });
    
	return submitRouter;
};

module.exports = router;