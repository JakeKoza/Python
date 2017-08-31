//Framework for front end

function getWeeks(){
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
      }

    var today = new Date();
    var week = today.getWeek();

    var span = [week-1, week, week+1]
    return span
}


function updateLinks(array){
    array.forEach(function(element) {
        var url = element["url"];
        if(element["selector"] == "prev"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#69acff","font-weight": "lighter"});
        }else if(element["selector"] == "next"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#398eff", "font-weight": "bold"});
        }else if(element["selector"] == "both"){
            $('a[href^="'+url+'"]').css({"color": "white", "background-color": "#69acff","font-weight": "lighter"});
        }else{}
    }, this);
}
