var userZip = "85756"
var fQueryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + userZip + 
                ",us&units=imperial&APPID=a13dc362eeacbccc63e8cbc432ab2eb5";

$.ajax({
    url: fQueryURL,
    method: "GET"
    })
    .fail(function(jx, status, error){
        console.log(jx)

    })
    .then(function(response) {

    console.log(fQueryURL);
    console.log(response);

    });
                