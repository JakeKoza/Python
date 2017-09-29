//AJAX Call to return data

$.ajax({url: "https://localhost:8443/GetAll", success: function(data){console.log(data)}})

.ajax({url: "https://localhost:8443/API/GetWeek/03", success: function(data){console.log(data[1])}})