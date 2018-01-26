var express = require("express");
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var ttest = require('ttest');
var json2csv = require("json2csv")
var fs = require("fs")
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
    adminRouter.route('/CreateCSV')
    .get(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            db.collection("submissions").find({}).toArray(function(err, result) {
              if (err) throw err;
              var titles = ["Task1Clicks",
                            "Task2Clicks",
                            "Task3Clicks",
                            "Task4Clicks",
                            "Task5Clicks",
                            "Task6Clicks",
                            "Task7Clicks",
                            "Task8Clicks",
                            "FrameworkEnabled",
                            "Age",
                            "Class",
                            "Experience",
                            "Browser",
                            "English",
                            "Previous",
                            "Frequency",
                            "Completion",
                            "Lost",
                            "Frustrated",
                            "LinkWasEasy",
                            "DidntScroll",
                            "EasyToUse",
                            "EasyToNavigate",
                            "ImportantLinks",
                            "Cluttered",
                            "FustratedExploring",
                            "TooManyClicks"
                        ]
              var clickdata = []
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
                    clickdata.push({"Task1Clicks": question1clicks,
                                    "Task2Clicks": question2clicks,
                                    "Task3Clicks": question3clicks,
                                    "Task4Clicks": question4clicks,
                                    "Task5Clicks": question5clicks,
                                    "Task6Clicks": question6clicks,
                                    "Task7Clicks": question7clicks,
                                    "Task8Clicks": question8clicks,
                                    "FrameworkEnabled": data.frameworkEnabled,
                                    "Age": data.answers[0]["answer"],
                                    "Class": data.answers[1]["answer"],
                                    "Experience": data.answers[2]["answer"],
                                    "Browser": data.answers[3]["answer"],
                                    "English": data.answers[4]["answer"],
                                    "Previous": data.answers[5]["answer"],
                                    "Frequency": data.answers[6]["answer"],
                                    "Completion": data.answers[7]["answer"],
                                    "Lost": data.answers[9]["answer"],
                                    "Frustrated": data.answers[11]["answer"],
                                    "LinkWasEasy": data.answers[13]["answer"],
                                    "DidntScroll": data.answers[14]["answer"],
                                    "EasyToUse": data.answers[15]["answer"],
                                    "EasyToNavigate": data.answers[16]["answer"],
                                    "ImportantLinks": data.answers[17]["answer"],
                                    "Cluttered": data.answers[18]["answer"],
                                    "FustratedExploring": data.answers[19]["answer"],
                                    "TooManyClicks": data.answers[20]["answer"]
                                })
                })
                db.close();
                var csvresult = json2csv({data: clickdata, fields: titles})
                //console.log(csvresult)
                var path = "data.csv"
                //var path = "C:\\Users\\Jake\\Desktop\\test.csv"
                fs.writeFile(path, csvresult +"\r\n", function(err){
                    if(err) throw err 
                    console.log("File was saved")
                })
              res.jsonp(csvresult);
              
            });
          });
    });
    adminRouter.route("/GetDataByQuestion/:surveyquestionID/Task/:taskID")
    .get(function(req, res){
        console.log(req.params.surveyquestionID, req.params.taskID)
        mongodb.connect(frameworkurl, function(err, db){
            if (err) throw err;
            clickArray = {}
            db.collection("submissions").find({}).toArray(function(err, result){
                if (err) throw err;
                surveyResponses = {}
                var answer = ""
                
                result.forEach(function(data,i){
                    var questionclicks = 0
                    actions = data.actions
                    
                    answer = data.answers[req.params.surveyquestionID].answer
                    console.log(answer)
                    actions.forEach(function(click){
                        if(click.taskId == req.params.taskID){
                            questionclicks += 1;
                        }
                    })
                    //surveyResponses[answer].push(questionclicks)
                    surveyResponses[i] = {"surveyquestionID": req.params.surveyquestionID, 
                                            "answer": answer, 
                                            "taskID": req.params.taskID,
                                            "clickCount": questionclicks,
                                            "framework": data.frameworkEnabled}
                    console.log(surveyResponses)
                    db.close()
                    
                })
                res.jsonp(surveyResponses)
            })
        })
    })
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
                        "P Value": stat.pValue() ? stat.pValue().toFixed(3) : null,
                        "Confidence": [stat.confidence()[0].toFixed(3), stat.confidence()[1].toFixed(3)],
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
                //console.log(values)
                db.close()
                res.jsonp(values)
            })
        })   
        
    });
    adminRouter.route('/GetPie/:questionID')
    .get(function(req, res){
        mongodb.connect(frameworkurl, function(err, db) {
            if (err) throw err;
            var payload = {}
            db.collection("submissions").find({}).toArray(function(err, result) {
              if (err) throw err;
                result.forEach(function(data){
                    answers = data.answers
                    console.log(answers)
                    answers.forEach(function(resp){
                        console.log(parseInt(resp.questionId) == parseInt(req.params.questionID))
                        if(parseInt(resp.questionId) == parseInt(req.params.questionID)){
                            console.log(payload[resp.answer])
                            if(payload[resp.answer]){
                                payload[resp.answer] +=  1;
                            }else{
                                payload[resp.answer] =  1;
                            }
                            
                        }
                    })
                })
                db.close()
                console.log(payload)
                res.jsonp(payload)
            })
        })
    })
    
	return adminRouter;
};



module.exports = router;