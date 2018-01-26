var express = require("express");
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var apiRouter = express.Router();
var frameworkurl = "mongodb://localhost:27017/Thesis";
var preurl = "mongodb://localhost:27017/PreQuestionResponses";
var posturl = "mongodb://localhost:27017/PostQuestionResponses";
var sortByProperty = function (property) {

    return function (x, y) {

        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? -1 : 1));

    };

};
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
    apiRouter.route('/GetSlidingWindow/:midweek')
    .get(function(req, res){
        var midweek = parseInt(req.params.midweek)
        var nextweek = midweek + 1
        var lastweek = midweek - 1
        if(midweek < 10){
            midweek = "0"+ String(midweek)
        }else{
            midweek = "0"+ String(midweek)
        }
        if(nextweek < 10){
            nextweek = "0"+ String(nextweek)
        }else{
            nextweek = "0"+ String(nextweek)
        }
        if(lastweek < 10){
            lastweek = "0"+ String(lastweek)
        }else{
            lastweek = "0"+ String(lastweek)
        }
        data = []
        var datastripped = []
        var selectdata = []
        //res.jsonp({"this week": midweek, "next week": nextweek, "last week": lastweek})
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            db.collection(midweek).find({}).toArray(function(err, result) {
                if (err) throw err;
                result.forEach(function(items){data.push({"url": items.url, "pageviews": items.pageviews})})
                db.collection(nextweek).find({}).toArray(function(err, result2){
                    if(err) throw err;
                    result2.forEach(function(items){data.push({"url": items.url, "pageviews": items.pageviews})})
                    db.collection(lastweek).find({}).toArray(function(err, result3){
                        if(err) throw err;
                        result3.forEach(function(items){data.push({"url": items.url, "pageviews": items.pageviews})})
                        data = data.sort(sortByProperty("pageviews"))
                        data.forEach(function(item, i){
                            datastripped.push(item.url)
                        })
                        datastripped.forEach(function(urls, i){
                        if(urls.match(/\/default.*/) || urls.match(/\/library*/) || urls == "/N/A" || urls.match(/\/mobile*/)){
                                    
                        }else{
                            //console.log(selectdata.indexOf(item))
                            urls = urls.replace(/aspx/, "html").slice(1)
                            urls = urls.slice(0, urls.indexOf("/"))
                           if(selectdata.indexOf(urls) == -1){
                               //console.log(item.url + " > -1")
                                selectdata.push(urls)
                           }else{
                                //console.log(item.url + " !> -1")
                           }
                        }
                        })
                        db.close();
                        res.jsonp(selectdata);
                    })
                })
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