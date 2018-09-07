//Variables for OWM AJAX call (converted Kelvin to Imperial units)
var currentCity = "Tucson";
var wQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + 
                "&units=imperial&APPID=a13dc362eeacbccc63e8cbc432ab2eb5";

//AJAX call to OpenWeatherMap
$.ajax({
    url: wQueryURL,
    method: "GET"
  })

  .then(function(response) {

    console.log(wQueryURL);
    console.log(response);

//Getting Weather Icon
var wIconCode = response.weather[0].icon;
console.log(wIconCode);
var iconUrl = "http://openweathermap.org/img/w/" + wIconCode + ".png";

//Showing City Chosen and Weather Icon
$("#city").html(currentCity + "<img src='" + iconUrl  + "' alt='Icon Showing Current Weather'>");
    
//Showing temp
    var currentTemp = response.main.temp;
    var showResults1 = $("#tempH");
    showResults1.append(" " + currentTemp + " degrees");

//Showing Humidity
    var currentHumidity = response.main.humidity;
    var showResults2 = $("#humidityH");
    showResults2.append(" " + currentHumidity + " %");


});