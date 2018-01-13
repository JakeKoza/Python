var express = require("express");
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var apiRouter = express.Router();
var frameworkurl = "mongodb://localhost:27017/Thesis";
var preurl = "mongodb://localhost:27017/PreQuestionResponses";
var posturl = "mongodb://localhost:27017/PostQuestionResponses";
var router = function () {
    apiRouter.use(
        function (req, res, next) {
            
                // Website you wish to allow to connect
                res.setHeader('Access-Control-Allow-Origin', '*');
            
                // Request methods you wish to allow
                res.setHeader('Access-Control-Allow-Methods', 'GET');
            
                // Request headers you wish to allow
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            
                res.setHeader('Content-Type', 'application/json');
                // Set to true if you need the website to include cookies in the requests sent
                // to the API (e.g. in case you use sessions)
                //res.setHeader('Access-Control-Allow-Credentials', true);
            
                // Pass to next layer of middleware
                next();
        });
	apiRouter.route('/GetAll')
    .get(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            var mysort = {"pageviews": 1}
            db.collection("01").find({}).sort(mysort).toArray(function(err, result) {
              if (err) throw err;
              //res.writeHead(200, {"Access-Control-Allow-Origin": "localhost"});
              res.jsonp(result);
              db.close();
            });
          });
    });
    apiRouter.route('/GetWeek/:id')
    .get(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            db.collection(String(req.params.id)).find({}).toArray(function(err, result) {
              if (err) throw err;
              //res.writeHead(200, {"Access-Control-Allow-Origin": "localhost"});
              res.jsonp(result);
              db.close();
            });
          });
    });
    apiRouter.route('/PreQuestions')
    .post(function(req, res){
        console.log(req.body)
        var body = req.body;
        console.log(body.ip)
        mongodb.connect(preurl, function(err, db) {
            if (err) throw err;
            var myobj = { firstName: body.firstName, age: body.age, familiarity: body.familiarity, usage: body.usage};
            db.collection(String(body.ip)).insertOne(myobj, function(err, result) {
              if (err) throw err;
              console.log("1 document inserted")
              //res.writeHead(200, {"Access-Control-Allow-Origin": "localhost"});
              res.jsonp(result);
              db.close();
            });
          });
    });
    
	return apiRouter;
};

module.exports = router;