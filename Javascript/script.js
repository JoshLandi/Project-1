//Function for looking up a different zip
function zipLookUp () {
    return $("#zip-input").val().trim();
}

//Connecting HTML Look Up button to JS function
$("#add-zip").on("click", function(evt) {
    evt.preventDefault();

    localStorage.setItem('zip', zipLookUp());
    window.location = "API-Page/results.html";
});

var currentZip = localStorage.getItem('zip');

if(currentZip && currentZip.length === 5 && parseInt(currentZip)) {
    //Variables for OWM AJAX call (converted Kelvin to Imperial units)
    var wQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + currentZip + 
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

    //Showing weather description
    var weatherDescription = response.weather[0].description;
    var showResults4 = $("#weatherD");
    showResults4.append(" " + weatherDescription);
        
    //Showing temp
        var currentTemp = response.main.temp;
        var showResults1 = $("#tempH");
        showResults1.append(" " + currentTemp + " degrees");

    //Showing Humidity
        var currentHumidity = response.main.humidity;
        var showResults2 = $("#humidityH");
        showResults2.append(" " + currentHumidity + " %");


    //Advice Conditionals Object
        var advice = $("#adviceP");
        var weatherStatus = response.weather[0].main;

        var adviceObject = {
            hotSunnyHumid : {
                m: "<br /> It's hot and humid!",
                do: "<br /> Bring water! (and maybe deodorant)",
                dont: "<br /> Don't dress heavy!"
            },

            hotSunnyNotHumid : {
                m: "<br /> It's hot and dry!",
                do: "<br /> Bring water and use sunscreen.",
                dont: "<br /> Don't stay too long in the sun."
            },

            hotRainy : {
                m: "<br /> It's hot but rainy!",
                do: "<br /> Bring an umbrella!",
                dont: "<br /> Dress light but waterproof!"
            },

            temperateSunnyHumid : {
                m: "<br /> It's nice out but humid.",
                do: "<br /> Wear what you want but stay hydrated.",
                dont: "<br /> It's a perfect day to go outside!"
            },

            temperateSunnyNotHumid : {
                m: "<br /> It's nice and dry out!",
                do: "<br /> Enjoy the day, but always bring water.",
                dont: "<br /> Don't forget sunscreen!"
            },

            temperateRainy : {
                m: "<br /> It's temperate but rainy.",
                do: "<br /> Bring an umbrella!",
                dont: "<br /> Don't get too wet!"
            },

            coldSunny : {
                m: "<br /> It's Cold!",
                do: "<br /> Wear a jacket!",
                dont: "<br /> Don't dress too lightly."
            },

            coldRainy : {
                m: "<br /> It's cold and wet!",
                do: "<br /> Wear a coat!",
                dont: "<br /> Don't forget your umbrella!"
            }
        }
        if (currentTemp > 90 && weatherStatus !== "Rain" && currentHumidity > 50) {
            advice.append(adviceObject.hotSunnyHumid.m);
            advice.append(adviceObject.hotSunnyHumid.do);
            advice.append(adviceObject.hotSunnyHumid.dont);
        }

        else if (currentTemp > 90 && weatherStatus !== "Rain" && currentHumidity < 50) {
            advice.append(adviceObject.hotSunnyNotHumid.m);
            advice.append(adviceObject.hotSunnyNotHumid.do);
            advice.append(adviceObject.hotSunnyNotHumid.dont);
        }

        else if (currentTemp > 90 && weatherStatus === "Rain") {
            advice.append(adviceObject.hotRainy.m);
            advice.append(adviceObject.hotRainy.do);
            advice.append(adviceObject.hotRainy.dont);
        }

        else if (currentTemp < 90 && currentTemp > 50 && weatherStatus !== "Rain" && currentHumidity > 50) {
            advice.append(adviceObject.temperateSunnyHumid.m);
            advice.append(adviceObject.temperateSunnyHumid.do);
            advice.append(adviceObject.temperateSunnyHumid.dont);
        }

        else if (currentTemp < 90 && currentTemp > 50 && weatherStatus !== "Rain" && currentHumidity < 50) {
            advice.append(adviceObject.temperateSunnyNotHumid.m);
            advice.append(adviceObject.temperateSunnyNotHumid.do);
            advice.append(adviceObject.temperateSunnyNotHumid.dont);
        }

        else if (currentTemp < 90 && currentTemp > 50 && weatherStatus === "Rain") {
            advice.append(adviceObject.temperateRainy.m);
            advice.append(adviceObject.temperateRainy.do);
            advice.append(adviceObject.temperateRainy.dont);
        }

        else if (currentTemp < 50 && weatherStatus !== "Rain") {
            advice.append(adviceObject.coldSunny.m);
            advice.append(adviceObject.coldSunny.do);
            advice.append(adviceObject.coldSunny.dont);
        }

        else if (currentTemp < 50 && weatherStatus === "Rain") {
            advice.append(adviceObject.coldRainy.m);
            advice.append(adviceObject.coldRainy.do);
            advice.append(adviceObject.coldRainy.dont);
        };
    


        //UV index code
        //curl -X GET 
var lat = response.coord.lat;
var lon = response.coord.lon;
var uvQueryURL = "https://api.openuv.io/api/v1/uv?lat=" + lat + "&lng=" + lon + " ";


console.log(uvQueryURL);

//AJAX call to OPENUV
$.ajax({
    url: uvQueryURL,
    method: "GET",
    headers: {
        "x-access-token": "04e75b1fc50974e76213991b7d259dec"
    }
  })

  .then(function(response2) {

    
    console.log(response2); 

    //Showing UV Index
    var uv = response2.result.uv;
    var showResults3 = $("#uv");
    showResults3.append(uv);

    var safeExposure1 = response2.result.safe_exposure_time.st1;
    var safeExposure2 = response2.result.safe_exposure_time.st2;
    var safeExposure3 = response2.result.safe_exposure_time.st3;
    var safeExposure4 = response2.result.safe_exposure_time.st4;
    var safeExposure5 = response2.result.safe_exposure_time.st5;
    var safeExposure6 = response2.result.safe_exposure_time.st6;

    var sunResults1 = $("#time1");
    var sunResults2 = $("#time2");
    var sunResults3 = $("#time3");
    var sunResults4 = $("#time4");
    var sunResults5 = $("#time5");
    var sunResults6 = $("#time6");

    sunResults1.append(safeExposure1);
    sunResults2.append(safeExposure2);
    sunResults3.append(safeExposure3);
    sunResults4.append(safeExposure4);
    sunResults5.append(safeExposure5);
    sunResults6.append(safeExposure6);
    
    //Show 
    

}); 

    });

}
else {
    //display "not zip"
    advice.append("Not a valid zip code.")
}
