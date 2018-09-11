var currentZip = "85756";
//Function for looking up a different zip
function zipLookUp () {
    currentZip = $("#zip-input").val().trim();
    
    console.log(currentZip);

}

//Connecting HTML Look Up button to JS function
$("#add-zip").on("click", function(){

    zipLookUp();
    console.log(currentZip);


    
});


//Variables for OWM AJAX call (converted Kelvin to Imperial units)
var wQueryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + currentZip + 
                ",us&units=imperial&APPID=a13dc362eeacbccc63e8cbc432ab2eb5";

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

var currentCity = response.name;

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


//Advice Conditionals
    var advice = $("#adviceP");

    var adviceObject = {
        hotSunny : {
            m: "It's hot!",
            do: "<br /> Bring water!",
            dont: "<br /> Don't dress heavy!"
        },
        hotRainy : {
            m: "It's hot but rainy!",
            do: "<br /> Bring an umbrella!",
            dont: "<br /> Dress light but waterproof!"
        }
    }
    if (currentTemp > 90 && response.weather[0].main !== "Rain") {
        advice.append(adviceObject.hotSunny.m);
        advice.append(adviceObject.hotSunny.do);
        advice.append(adviceObject.hotSunny.dont);
    }
    else {
        advice.append(adviceObject.hotRainy.m);
        advice.append(adviceObject.hotRainy.do);
        advice.append(adviceObject.hotRainy.dont);
    }

});
