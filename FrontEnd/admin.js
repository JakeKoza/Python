var url = ""
if(window.location.href.split("//")[0] === "file:"){
    url = "http://localhost:5000"
}else{
    url = "http://api.jacobkoza.com:8080"
}
function generateCSV(){
    $.ajax({
        //TODO: Change the URL to Post to My Endpoint
        //url: "http://73.224.158.224:500/Submit/CheckUser",
        url: url + "/Admin/CreateCSV",
        method: 'GET',
        success: function (data) {
            //console.log(Object.keys(data).length)
            console.log(data)
        },
        error: function (){
            alert('There was an error');
        }
    });
}
//var url = "http://api.jacobkoza.com:8080/Admin/GetAllData"
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    //url: "http://localhost:5000/Admin/GetAllData",
    url: url + "/Admin/GetAllData",
    method: 'GET',
    success: function (data) {
        //console.log(Object.keys(data).length)
        var fhtml = ""
        var nhtml = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data[i]["question1"] + "</td>")
            r += ("<td>"+ data[i]["question2"] + "</td>")
            r += ("<td>"+ data[i]["question3"] + "</td>")
            r += ("<td>"+ data[i]["question4"] + "</td>")
            r += ("<td>"+ data[i]["question5"] + "</td>")
            r += ("<td>"+ data[i]["question6"] + "</td>")
            r += ("<td>"+ data[i]["question7"] + "</td>")
            r += ("<td>"+ data[i]["question8"] + "</td></tr>")
            if(data[i]["framework"] == "true")
                fhtml += r
            else
                nhtml += r
        }
        document.getElementById("dataTableF").innerHTML = fhtml; 
        document.getElementById("dataTableN").innerHTML = nhtml; 
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});

//var urlT = "http://api.jacobkoza.com:8080/Admin/GetTTest/" 
$.ajax({
        //TODO: Change the URL to Post to My Endpoint
        //url: "http://73.224.158.224:500/Submit/CheckUser",
        url: url + "/Admin/GetTTest/1",
        method: 'GET',
        success: function (data) {
            //console.log(Object.keys(data).length)
            var html = ""
            for (var i=0; i<Object.keys(data).length; i++){
                var r = "";
                r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
                r += ("<td>"+ data["P Value"] + "</td>")
                r += ("<td>"+ data["Confidence"] + "</td>")
                r += ("<td>"+ data["Valid"] + "</td>")
                r += ("<td>"+ data["Freedom"] + "</td></tr>")
            }
            html += r
            document.getElementById("ttest1").innerHTML = html;
        },
        error: function (){
            alert('There was an error please contact n00431448@ospreys.unf.edu');
        }
});

$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/2",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest2").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/3",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest3").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/4",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest4").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/5",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest5").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/6",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest6").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetTTest/7",
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest7").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + '/Admin/GetTTest/8',
    method: 'GET',
    success: function (data) {
        console.log(data["Statistic Value"])
        //console.log(Object.keys(data).length)
        var html = ""
        for (var i=0; i<Object.keys(data).length; i++){
            var r = "";
            r += ("<tr><td>"+ data["Statistic Value"] + "</td>")
            r += ("<td>"+ data["P Value"] + "</td>")
            r += ("<td>"+ data["Confidence"] + "</td>")
            r += ("<td>"+ data["Valid"] + "</td>")
            r += ("<td>"+ data["Freedom"] + "</td></tr>")
        }
        html += r
        document.getElementById("ttest8").innerHTML = html;
    },
    error: function (){
        alert('There was an error please contact n00431448@ospreys.unf.edu');
    }
});

$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/1",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('age', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});

$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/2",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('class', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/3",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('experience', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/4",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('browser', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/5",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('language', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});
$.ajax({
    //TODO: Change the URL to Post to My Endpoint
    //url: "http://73.224.158.224:500/Submit/CheckUser",
    url: url + "/Admin/GetPie/6",
    method: 'GET',
    success: function (data) {
        console.log("hello")
        console.log(Object.values(data))
        console.log(Object.keys(data))
        var stats = [{
            values: Object.values(data),
            labels: Object.keys(data),
            type: 'pie'}]
        var layout = {
                height: 300,
                width: 400
              };
              
        Plotly.newPlot('visit', stats, layout);
    },
    error: function (){
        alert('There was an error');
    }
});