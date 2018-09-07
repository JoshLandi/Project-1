//Variables for OWM AJAX call
var currentCity = "Tucson";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + 
                "&APPID=a13dc362eeacbccc63e8cbc432ab2eb5";

//AJAX call to OpenWeatherMap
$.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {

    console.log(queryURL);
    console.log(response);
    
//Working up to this point so far
    var results = response.data;
    var showResults = $("<p>");
    showResults.append(results);
    $("#weatherChartDiv").append(showResults);
});