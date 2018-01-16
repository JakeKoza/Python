var express = require("express");
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var ttest = require('ttest');
var adminRouter = express.Router();
var frameworkurl = "mongodb://localhost:27017/submissions";
var router = function () {
    adminRouter.use(
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
	adminRouter.route('/GetAllData')
    .get(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            db.collection("submissions").find({}).toArray(function(err, result) {
              if (err) throw err;
              
              var clickdata = {}
                result.forEach(function(data,i){
                    var question1clicks = 0
                    var question2clicks = 0
                    var question3clicks = 0
                    var question4clicks = 0
                    var question5clicks = 0
                    var question6clicks = 0
                    var question7clicks = 0 
                    var question8clicks = 0
                    
                    actions = data.actions
                    //console.log(actions)
                    actions.forEach(function(click){
                        switch(click.taskId){
                            case '1':
                                question1clicks = question1clicks + 1;
                                break;
                            case '2':
                                question2clicks = question2clicks + 1;
                                break;
                            case '3':
                                question3clicks = question3clicks + 1;
                                break;    
                            case '4':
                                question4clicks = question4clicks + 1;
                                break;
                            case '5':
                                question5clicks = question5clicks + 1;
                                break;
                            case '6':
                                question6clicks = question6clicks + 1;
                                break;
                            case '7':
                                question7clicks = question7clicks + 1;
                                break;
                            case '8':
                                question8clicks = question8clicks + 1;
                                break;
                            default:
                                break;
                        }
                    })
                    clickdata[i] = {"question1": question1clicks,
                                    "question2": question2clicks,
                                    "question3": question3clicks,
                                    "question4": question4clicks,
                                    "question5": question5clicks,
                                    "question6": question6clicks,
                                    "question7": question7clicks,
                                    "question8": question8clicks,
                                    "framework": data.frameworkEnabled}
                })
                db.close();
              res.jsonp(clickdata);
              
            });
          });
    });
    adminRouter.route('/GetTTest/:id')
    .get(function(req, res){
        
        
        fakeArrayTrue = [2,3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        fakeArrayFalse = [2, 2, 2, 2, 4, 3, 4, 4, 4, 4, 4, 4]
        
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            
            db.collection("submissions").find({}).toArray(function(err, result) {
              if (err) throw err;
              //req.params.id
              var frameworkArray = []
              var nonFrameworkArray = []
              //console.log(result)
                result.forEach(function(data,i){
                    var questionclicks = 0
                    actions = data.actions
                    actions.forEach(function(click){
                        //console.log("click taskid" + click.taskId)
                        //console.log("id param" + req.params.id)
                        //console.log(click.taskId == req.params.id)
                        if(click.taskId == req.params.id){
                            questionclicks += 1;
                        }
                        //console.log(questionclicks)
                    })
                    console.log(i, questionclicks)
                    if(data.frameworkEnabled == "true"){
                        frameworkArray.push(questionclicks)
                        
                    }else{
                        nonFrameworkArray.push(questionclicks)
                    }
                })
                //console.log(typeof(frameworkArray), typeof(nonFrameworkArray))
                //console.log(frameworkArray, nonFrameworkArray)
                //stat = ttest(fakeArrayTrue, fakeArrayFalse)
                options ={
                    "varEqual": true
                }
                
                //const stat = ttest(fakeArrayTrue, fakeArrayFalse, options)
                try {
                    const stat = ttest(frameworkArray, nonFrameworkArray, options)
                    //console.log(stat)
                    values = {
                        "Statistic Value": stat.testValue(),
                        "P Value": stat.pValue(),
                        "Confidence": stat.confidence(),
                        "Valid": stat.valid(),
                        "Freedom": stat.freedom()
                    }
                }
                catch (e){
                    values = {
                        "Statistic Value": null,
                        "P Value": null,
                        "Confidence": null,
                        "Valid": null,
                        "Freedom": null
                    }
                }
                console.log(values)
                db.close()
                res.jsonp(values)
            })
        })   
        
    });
    
    
	return adminRouter;
};



module.exports = router;