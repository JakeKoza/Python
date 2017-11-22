//Framework for front end

function getWeeks(){
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
      }

    var today = new Date();
    var week = today.getWeek();

    var span = [week, week+1]
    return span
}


function updateLinks(element){
    //array.forEach(function(element) {
        var url = element["url"];
        if(element["selector"] == "prev"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#69acff","font-weight": "lighter"});
        }else if(element["selector"] == "next"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#398eff", "font-weight": "bold"});
        }else if(element["selector"] == "both"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#69acff","font-weight": "lighter"});
        }else{}
    //}, this);
}

function stripData(url){
    var strippedURL = url.split(/\//);
    return strippedURL[1];
}

function getWeekData(week) {
    var weeks = getWeeks();
    var weeknum = 0;
    if (week == "this"){
        weeknum = weeks[0];
    }else{
        weeknum =weeks[1];
    }
    apiurl = "https://localhost:8443/API/GetWeek/" + String(weeknum) 
    $.ajax({url: apiurl, 
    //$.getJSON({url: apiurl,
            success: function(data){
                //TO-DO: Figure how to return data or call another function
                //console.log(data)
                //var json = JSON.stringify(data)
                var topFive = data.slice(0,5)
                //updateLinks(topFive)
                topFive.forEach(element => {
                    var selector = ""
                    if(week ==="next"){
                        selector ="next"
                    }else if(week ==="this"){
                        selector = "prev"
                    }
                    var item = {url: stripData(element["url"]), selector: "next"}
                    updateLinks(item)
                    console.log(item)
                });
            }
        });
}

function compareData(thisweek, nextweek, direction){
     if(direction === "findNext"){
        var diff = $(nextweek).not(thisweek).get();
        return diff;
     }
     else if(direction === "both"){

     }
     else if(direction === "this"){
        var diff = $(thisweek).not(nextweek).get();
        return diff;
     }
     else {}
}

(function(){
    var thisWeek = getWeekData("this").slice(0,5);
    var nextWeek = getWeekData("next").slice(0,5);

    console.log(compareData(thisweek, nextweek, "findNext"))

}())

function returndata(data){
    console.log(data)
}