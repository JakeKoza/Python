document.getElementById("box").disabled = true;
document.getElementById("go").disabled = true;
if(document.getElementById("RssAlertsDesktopOnly")){
    document.getElementById("RssAlertsDesktopOnly").hidden = true;
}


function grabScripts (argument) {
    var host = "http://active-analytics.appspot.com";
    if(window.location.host.indexOf("localhost") >= 0){
        host = "http://localhost:8082";
    }
    window._AAHost = host;
    $("head").append("<link href='" + host + "/client/lib/activeanalytics.css' rel='stylesheet' />");
    $.getScript( host + "/client/lib/activeanalytics.js", function( data, textStatus, jqxhr ) {setTimeout(init, 1000);});
}
function updateData (date, disableCache, frameworkEnabled) {
    console.log("lets go");

    //Disable external links
    $("a[href^='http']").click(function(){
        alert("This link will take you to an external site, it has been disabled for this test.");
        return false;
    });
    //Disable search feature
    $(document).submit(function() {
        alert("The search feature has been disabled for this test. Please navigate using the search suggestions or links on the page.");
        return false;
    });

    if (!frameworkEnabled) {
        return;
    }

    //Default settings
    var apiDate = new Date(Date.parse(date + " " + new Date().toLocaleTimeString()));
    disableCache = disableCache === true ? true : false;
    var settings = {
        titleReplaceRegex: /(University of North Florida|UNF - |University of North Florida - |UNF Mobile - - |- |UNF)/g,
        //serviceURL: _AAHost,
        //date: apiDate,
        //disableCache: disableCache,
        //site: "ga:991324"
    };
	/*
    //Populate search suggestions
    $("#box").ActiveAnalytics("search", settings);
    $("a").each(function(i){
        $(this).attr("data-page-id", "page-" + i);
    });

    //Create hover suggestions
    $("#simple a, .audience a").ActiveAnalytics("hover", settings);

    //Rank links in homepage nav well
    $("#UNFbignav li a")
        //Rank with color range
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: "#EEEFF0",
                rangeEnd: "#86C3FF",
                rankBy: "hits",
                style: "background-color",
                distribution:"even"
            }
        }, settings))
        //Rank with font size
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: 11,
                rangeEnd: 13,
                rankBy: "hits",
                style: "font-size",
                unit: "px"
            }
        }, settings)).css({"color":"black"});
    $("#UNFbignav ul").css({"height": "auto"});

    //Rank links on audience page with color range
    $("#leftCol table li a, #TwoCol table li a")
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: "#FFFFFF",
                rangeEnd: "#FFFF24",
                rankBy: "hits",
                style: "background-color",
                distribution:"even"
            }
        }, settings))
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: 12,
                rangeEnd: 15,
                rankBy: "hits",
                style: "font-size",
                unit: "px"
            }
        }, settings))
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: 15,
                rangeEnd: 30,
                rankBy: "hits",
                style: "line-height",
                unit: "px"
            }
        }, settings));

    $(".UNFMenu li a")
        //Rank with color range
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: "#D1E8FF",
                rangeEnd: "#86C3FF",
                rankBy: "hits",
                style: "background-color"
            }
        }, settings))
        //Rank with font size
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: 11,
                rangeEnd: 13,
                rankBy: "hits",
                style: "font-size",
                unit: "px",
                distribution: "even"
            }
        }, settings));

    //Create popular links list
    $("#news, #aaPopular").attr("id", "aaPopular").html("<h2><span class='title'>Popular Links</span></h2>");
    $("#aaPopular").ActiveAnalytics("popular-global",$.extend({wrap: $("<h3>")}, settings));

    //Library menu
    $("#mainMenu .collapse a")
        //Rank with color range
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: "#dedede",
                rangeEnd: "#86C3FF",
                rankBy: "hits",
                style: "background-color"
            }
        }, settings))
        //Rank with font size
        .ActiveAnalytics("rankstyle", $.extend({
            rank: {
                rangeStart: 12,
                rangeEnd: 14,
                rankBy: "hits",
                style: "font-size",
                unit: "px"
            }
        }, settings)).css({"color":"black"});

    var $libCont = $("#ctl00_MainContentRegion_DZMain_uxColumnDisplay_ctl00_uxControlColumn_ctl00_uxWidgetHost_uxUpdatePanel");
    $libCont.html("<h3>Popular:</h3>");
    settings.callback = function() {
        $libCont.find("a").each(function(){
            $(this).text($(this).text().replace("Thomas G. Carpenter Library", ""));
        });
    };
    $libCont.ActiveAnalytics("popular",$.extend({wrap: $("<li style='font-weight: bold; padding-top:8px;'>")}, settings));
	*/
}
function init(){
    if(window.location.hash == "#admin"){
        //Control panel
        createModal('<h2><span class="title">Active Analytics</span></h2>Simulate Date:<div style="clear:both"><input type="text" placeholder="Date" id="txtDate"><input type="button" value="Set" id="btnDate"><img class="aaLoading" style="visibility: hidden;margin-top: -15px;" src="/image/loading.gif"></div>');
        $("#txtDate").val(new Date().toLocaleDateString());
        updateData($("#txtDate").val(), false);

        //Re-initialize when date button is clicked
        $("#btnDate").click(function () {
            updateData($("#txtDate").val(), true);
        });
    }
    else{
        var service = new TaskService();
    }

}
function createModal (content, full) {
    var $container = $("#UNFinfo");
    if($container.length === 0){
        $container = $("body");
    }
    if($("#aaMessage").length === 0){
        $container.append("<div id='aaMessage'></div>");
    }
    var $modal = $("#aaMessage");
    if (full) {
        $modal.addClass('full');
    }
    console.log(content);
    $modal.html(content);
    return $modal;
}

function TaskService() {
    this.tasks = [
        {
            id: 1,
            title: "Task #1 Colleges And Programs",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "infoacademicsindex.html" || document.title === "UNF - Colleges and Programs";
            },
            start: "/",
            desc: "A prospective student, Bob, is interested in attending UNF beginning in the summer semester. He is undecided in what he wants to study, so help Bob see a list of Colleges and Programs available at UNF. Please navigate to the \"Colleges and Programs\" page.",
            date: null
        },
        {
            id: 2,
            title: "Task #2 Course Catalog",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "catalogindex.html" || document.title === "UNF - Catalog Homepage";
            },
            start: "/",
            desc: "Bob, after deciding on two possible schools he is interested in, would like to know more about the classes offered to students. Please navigate to the \"Course Catalog for Undergraduate Students\" page",
            date: null
        },
        {
            id: 3,
            title: "Task #3 Graduate School Programs",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "gradudateschoolacademicsgradudate_programs.html" || document.title === "UNF - The Graduate School - Graduate Programs";
            },
            start: "/",
            desc: "Bob has also considered pursuing a Masters degree following his undergraduate degree. He would like to know more about the programs offered to see if any exist in the two schools he is considering. Please navigate to the \"Graduate Programs at UNF\" page.",
            date: null
        },
        {
            id: 4,
            title: "Task #4 Tuition",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "tuition" || document.title === "UNF - Controller - Tuition and Fees";
            },
            start: "/",
            desc: "Bob will likely be paying his way through school and would like to obtain information on tuition and fees for UNF students. Help Bob by navigating to controller page that displays tuition and fees details. Please navigate to the \"Tuition\" page with the breakdown of tuition and fees for students.",
            date: null
        },
        {
            id: 5,
            title: "Task #5 Admissions Deadlines",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "admissionsapplyadmission_deadlines_form.aspx" || document.title === "UNF - Admissions - Admission Deadlines Form";
            },
            start: "/",
            desc: "Bob wants to begin school in the Summer and would like to know information regarding application deadlines. Help Bob by navigating to UNF admissions page that displays deadlines information. Hopefully he won't need help applying too. Please navigate to the UNF Admissions \"Deadlines\" page",
            date: null
        },
        {
            id: 6,
            title: "Task #6 Apply",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "admissionspplynowindex.html" || document.title === "UNF - Admissions - Apply Now";
            },
            start: "/",
            desc: "Bob believes he has decided on a major to persue and wants to know more about the Application process and possibly apply today. Help Bob by navitagation to the UNF admissions page that displays the steps for applying. Please nvaigate to the \"Apply Now\" page",
            date: null
        },
        {
            id: 7,
            title: "Task #7 HR Employment",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "hremploymentstudent_employment_resources.html" || document.title === "UNF - Human Resources - Student Employment Resources";
            },
            start: "/",
            desc: "Bob, an enterprising young man, wants to work his way through school. He is interested in learning about student employment opportunites. Pleas help Bob find the Human Resources page that lists the types of student employement at UNF. Please navigate to the \"UNF Student Employment\" page",
            date: null
        },
        {
            id: 8,
            title: "Task #8 HR Benefits",
            complete: function(){
                return window.location.pathname.replace(/\//g, "").toLowerCase() === "hrbenefitsbenefits.html" || document.title === "UNF - Human Resources - Benefits";
            },
            start: "/",
            desc: "Bob has some questions on benefits offered to UNF employees. Help Bob by navigating to human resource page that displays benefits information. Please navigate to the Human Resources \"Benefits\" page",
            date: null
        }
        
    ];
    this.questions = [
        {
            id: 1,
            question: "Please select your age",
            answers: ["18-25","26-35","36-45","46-55","56-65","65+"]
        },
        {
            id: 21,
            question: "What is your current class standing?",
            answers: ["Non-matriculated","Freshman","Sophomore ","Junior", "Senior", "Graduate", "Other"]
        },
        {
            id: 2,
            question: "How experienced are you in using the internet?",
            answers: ["Very Experienced","Some Experience","Limited Experience","No Experience"]
        },
        {
            id: 3,
            question: "Which browser did you use to view the site?",
            answers: ["Internet Explorer","Google Chrome","Safari","Firefox"]
        },
        {
            id: 4,
            question: "Is English your primary language?",
            answers: ["Yes","No"]
        },
        {
            id: 5,
            question: "Have you visited the UNF website before?",
            answers: ["Yes","No"]
        },
        {
            id: 6,
            question: "If yes how often do you visit the UNF website?",
            answers: ["A few times a year","A few times per month","Once a week","Multiple times a week", "Daily", "Multiple times a day"]
        },
        {
            id: 7,
            question: "Were you able to complete all the tasks?",
            answers: ["Yes","No"]
        },
        {
            id: 8,
            question: "If not, why were you not able to complete the tasks?",
            answers: "text"
        },
        {
            id: 9,
            question: "Did you get lost at any point while trying to complete a task?",
            answers: ["Yes","No"]
        },
        {
            id: 10,
            question: "If yes please describe what happened",
            answers: "text"
        },
        {
            id: 11,
            question: "Were you frustrated at any point when trying to complete a task?",
            answers: ["Yes","No"]
        },
        {
            id: 12,
            question: "If yes please describe what caused the frustration",
            answers: "text"
        },
        {
            id: 13,
            question: "The link I was looking for on the page was easy to find",
            answers: "rate"
        },
        {
            id: 14,
            question: "I didn't have to scroll too far to find the link I wanted",
            answers: "rate"
        },
        {
            id: 15,
            question: "The site was easy to use",
            answers: "rate"
        },
        {
            id: 16,
            question: "It was easy to navigate to the requested destination",
            answers: "rate"
        },
        {
            id: 17,
            question: "Important links were presented prominently",
            answers: "rate"
        },
        {
            id: 18,
            question: "The site was too cluttered",
            answers: "rate"
        },
        {
            id: 19,
            question: "Exploring the site was frustrating",
            answers: "rate"
        },
        {
            id: 20,
            question: "It took too many clicks to find what I was looking for",
            answers: "rate"
        }
    ];
    this.finish = function(){
        var html = "<h2><span class='title'>You're Done!</span></h2><p>Thanks for helping me out!</p><p><a href='/' class='btn btn-primary'>Close</a></p>";
        createModal(html);
    };
    this._guid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    this.submitData = function(){
		console.log(JSON.stringify(this._data))
         $.ajax({
            //url: "http://73.224.158.224:500/Submit/SubmitData",
            url: "http://api.jacobkoza.com:8080/Submit/SubmitData",
            method: 'POST',
            data: {
                stat: this._data,
                user: JSON.parse(window.sessionStorage['user'])
            }
         });
    };
    this.updateTask = function(currentTask){
        var html = "<h2><span class='title'>" + currentTask.title + "</span></h2><p>" + currentTask.desc + "</p><br/><button type='button' id='btnSkip' class='btn btn-primary'>Skip</button>";
        return createModal(html);
    };
    this.clearData = function(){
        console.log("clearingdata");
        sessionStorage["aaTasksTracking"] = "";
    };
    this.saveData = function () {
        sessionStorage["aaTasksTracking"] = JSON.stringify(this._data);
    };
    this.getData = function(){
        var _data = sessionStorage["aaTasksTracking"];
        if(_data === undefined || _data === ""){
            this._data = null;
        }
        else{
            this._data = JSON.parse(_data);
        }
        return this._data;
    };
    this.survey = function(){
        var service = this;
        $preSurveyContent = $("<h2><span class='title'>Tasks Complete!</span></h2><p>Now that you have completed the tasks please fill out the following short survey on your experience, all questions are optional.</p><button class='btn btn-primary btnBeginSurvey'>Begin Survey</button>");
        createModal($preSurveyContent);
        $('.btnBeginSurvey').click(function(){
            $content = $("<div>");
            $content.append("<h2><span class='title'>Final Survey</span></h2><p>Thank you for completing the tasks, please fill out this short survey about your experience.</p>");
            $.each(service.questions, function (i, question) {
                $q = $("<div data-question-id='" + question.id + "' class='form-group'>");
                $q.append("<label class='question' for='q" + question.id + "'>" + question.question + "</label>");
                $a = $("<div class='answer'>");
                $q.append($a);
                if (question.answers === "text") {
                    $q.data("type", "text");
                    $a.append("<textarea class='form-control' name='q" + question.id + "' type='text'></textarea>");
                }
                else if (question.answers === "rate") {
                    $q.data("type", "rate");
                    for (n = 1; n <= 5; n++) {
                        $a.append("<label><input name='q" + question.id + "' type='radio'></input>" + n + "</label>");
                    }
                    $a.prepend("Disagree ");
                    $a.append(" Agree");
                }
                else {
                    $q.data("type", "mult");
                    $.each(question.answers, function (j, answer) {
                        $a.append("<label><input name='q" + question.id + "' type='radio'></input>" + answer + "</label>");
                    });
                }
                $content.append($q);
                $content.append("<hr/>");
            });
            $content.append("<button class='btn btn-primary submit-btn'>Submit</button>");
            $content.find(".submit-btn").click(function(){
                var data = service.getData();
                $content.find(".form-group").each(function(){
                    var answer = {};
                    if ($(this).find("textarea").length > 0) {
                        answer.answer = $(this).find("textarea").val();
                    }
                    else {
                        answer.answer = $(this).find("input:checked").parent().text();
                    }
                    answer.questionId = parseInt($(this).data("question-id"));
                    answer.question = $(this).find(".question").text();
                    data.answers.push(answer);
                });
                service.complete();
            });
            createModal($content, true);
        });
    };
    this.complete = function(){
        console.log("Pushing Data:");
        this.submitData();
        console.log(this._data);
        this.clearData();
        this.finish();
        setTimeout(function () {
            window.location = "/";
        }, 10000);
    };
    this.resume = function () {
        var currentTask = this.tasks[this._data.currentTask];
        var finished = false;
        var frameworkEnabled = this._data.frameworkEnabled;
        var svc = this;
        if(currentTask === undefined) {
            this.survey();
            return;
        }
        if(currentTask.complete()){
            var nextTask = this.tasks[this._data.currentTask + 1];
            console.log("next");
            console.log(nextTask);
            if(!nextTask){
                finished = true;
            }
            else{
                $modal = createModal("<h2><span class='title'>Task Complete!</span></h2><p>Click the next button to start the next task.</p><br/><a class='btn btn-primary' href='" + nextTask.start + "'>Next</a></h2>");
            }
            this._data.currentTask = this._data.currentTask + 1;
        }
        else{
            var $modal = this.updateTask(currentTask);
            var $skip = $modal.find("#btnSkip");
            if ($skip.length > 0) {
                $skip.click(function(){
                    var r = confirm("Are you sure you want to skip this task?");
                    if (!r) {
                        return false;
                    }
                    var clickData = { task: currentTask.title, taskId: currentTask.id, url: window.location.pathname + window.location.search, href: "#skip", aaid: "none", timestamp: new Date().toISOString() };
                    var d = svc.getData();
                    d.clicks.push(clickData);
                    d.actions.push({ task: currentTask.title, taskId: currentTask.id, url: window.location.pathname + window.location.search + "#skip", timestamp: new Date().toISOString()});
                    var nextTask = svc.tasks[svc._data.currentTask + 1];
                    svc._data.currentTask = svc._data.currentTask + 1;
                    svc.saveData();
                    if(!nextTask){
                        svc.survey();
                    }
                    else{
                        window.location = "/";
                    }
                });
            }
            if(currentTask.date === null){
                updateData(new Date().toLocaleDateString(), false, frameworkEnabled);
            }
            else{
                updateData(currentTask.date, true, frameworkEnabled);
            }
        }
        if(this._data.actions === undefined){
            this._data.actions = [];
        }
        this._data.actions.push({ task: currentTask.title, taskId: currentTask.id, url: window.location.pathname + window.location.search, timestamp: new Date().toISOString()});
        if(finished){
            this.survey();
        }
        this.saveData();

        $(document).click(function(e){
            try {
                var d = svc.getData();
                if(d.clicks === undefined) {
                    d.clicks = [];
                }
                aaId = $(e.toElement).attr("data-aa-id");
                href = $(e.toElement).attr("href");
				console.log("aaid" + aaId + " href " + href);
                if(!href) {
                    return;
                }
                var clickData = { task: currentTask.title, taskId: currentTask.id, url: window.location.pathname + window.location.search, href: href, aaid: "none", timestamp: new Date().toISOString() };
				console.log("click data " + clickData)
                if(aaId) {
					console.log("got to if(aaid)")
                    clickData.aaid = aaId;
                }
				console.log("Trying to push " + clickData)
                d.clicks.push(clickData);
                svc.saveData();
            }
            catch(e) {
                console.log("error tracking click" + e);
            }
        });
    };
    this.consent = function() {
        var self = this;
        var html = "<h2><span class='title'>Active Analytics Testing</span></h2><p>Thank you for participating in our study, we will ask you to complete some simple navigation tasks. We will display task scenario, the name of a page, and we ask that you navigate to this page using links on the page.  It may take several clicks before you reach the destination page. We have enabled search suggestions for the search box on each page (which you can use to navigate) but have disabled the search results page because we are trying to improve navigation not search results with our study.</p><p>Please review the following study consent document by clicking “Begin” below you acknowledge that you have given consent to be a subject of this research and you are at least 18 years of age. If you do not want to participate in this study you may close this browser window.</p><p><a target='_blank' href='" + window._AAHost + "/img/consent.pdf'>Consent Form (opens in a new tab/window)</a></p><br/><button type='button' id='btnBegin' class='btn btn-success'>Yes, I Want to Participate (Begin)</button>";
        $modal = createModal(html);
        $modal.find("#btnBegin").click(function(){
            self.nameForm();
        });
        this.saveData();
    };
    this.nameForm = function() {
        var self = this;
        var html = "<h2><span class='title'>Active Analytics Testing</span></h2><p>Please enter your name and N-Number.  This information will NOT be tied to your survey responses and is only used to ensure you are only completing the survey once.  This information will be destroyed as soon as the study is complete.</p><p><table><tr><td>First Name: </td><td><input id='txtFname' type='text'/></td></tr><tr><td>Last Name: </td><td><input id='txtLname' type='text'/></td></tr><tr><td>N Number: </td><td><input id='txtNnum' type='text'/></td></tr></table><br/><button type='button' id='btnBegin' class='btn btn-primary'>Begin</button></p>";
        $modal = createModal(html);
        $modal.find("#btnBegin").click(function(){
            var usr = {first_name: $modal.find('#txtFname').val(), last_name: $modal.find('#txtLname').val(), nnumber: $modal.find('#txtNnum').val()};
            if (usr.first_name == '' || usr.last_name == '' || usr.nnumber == '') {
                alert('Please fill in your information');
            }
            else if(!(new RegExp(/^[n,N]\d{8}$/).test(usr.nnumber))) {
                alert('Please enter a valid N Number');
            }
            else {
                window.sessionStorage['user'] = JSON.stringify(usr);
				//console.log(JSON.parse(window.sessionStorage["user"])['nnumber'])
                $.ajax({
                    //TODO: Change the URL to Post to My Endpoint
                    //url: "http://73.224.158.224:500/Submit/CheckUser",
                    url: "http://api.jacobkoza.com:8080/Submit/CheckUser",
                    method: 'POST',
                    data: {
                        userID: JSON.parse(window.sessionStorage["user"])['nnumber']
                    },
                    success: function (data) {
						console.log(data)
                        if (data == 'no user') {
                            self.resume();
                        }
                        else {
                            alert('It looks like you\'ve already completed this study');
                        }
                    },
                    error: function (){
                        alert('There was an error please contact n00431448@ospreys.unf.edu');
                    }
                });
            }
        });
        this.saveData();
    };
    this.initialize = function () {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        if (check) {
            alert("Sorry this test will not work with mobile devices, please use a desktop browser.");
            return;
        }
        this._data = {};
        this._data.id = this._guid();
        this._data.frameworkEnabled = Math.floor((Math.random() * 2)) === 1;
        if (location.hash === "#on" || location.hash === "#off") {
            this._data.frameworkEnabled = location.hash === "#on";
        }
        this._data.currentTask = 0;
        this._data.actions = [];
        this._data.answers = [];
        this._data.clicks  = [];
        this._data.userAgent = navigator.userAgent;
        this._data.windowSize = $(document).width() + 'x' + $(document).height();
        this.consent();
        this.saveData();
    };

    this._data = null;
    this.getData();
    console.log(this._data);
    if(this._data === null || window.sessionStorage['user'] == undefined){
        this.initialize();
    }
    else{
        this.resume();
    }
}

TaskService()