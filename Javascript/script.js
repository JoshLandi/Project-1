//Function for looking up a different zip
function zipLookUp () {
    return $("#zip-input").val().trim();
}

//Connecting HTML Look Up button to JS function
$("#add-zip").on("click", function(evt) {
    evt.preventDefault();

    localStorage.setItem('zip', zipLookUp());
    window.location = "/api-page/results.html";
});

var currentZip = localStorage.getItem('zip');

if(currentZip && currentZip.length === 5 && parseInt(currentZip)) {
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
        var weatherStatus = response.weather[0].main;

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
            },
            temperateSunny : {
                m: "It's nice out!",
                do: "<br /> Wear what you want!",
                dont: "<br /> Don't worry about it!"
            },
            temperateRainy : {
                m: "It's nice but rainy.",
                do: "<br /> Bring an umbrella!",
                dont: "<br /> Don't get too wet!"
            },

            coldSunny : {
                m: "It's Cold!",
                do: "<br /> Wear a jacket!",
                dont: "<br /> Dress too lightly."
            },

            coldRainy : {
                m: "It's cold and wet!",
                do: "<br /> Wear a coat!",
                dont: "<br /> Forget your umbrella!"
            }
        }
        if (currentTemp > 90 && weatherStatus !== "Rain") {
            advice.append(adviceObject.hotSunny.m);
            advice.append(adviceObject.hotSunny.do);
            advice.append(adviceObject.hotSunny.dont);
        }

        if (currentTemp > 90 && weatherStatus === "Rain") {
            advice.append(adviceObject.hotRainy.m);
            advice.append(adviceObject.hotRainy.do);
            advice.append(adviceObject.hotRainy.dont);
        }

        if (currentTemp < 90 && currentTemp > 50 && weatherStatus !== "Rain") {
            advice.append(adviceObject.temperateSunny.m);
            advice.append(adviceObject.temperateSunny.do);
            advice.append(adviceObject.temperateSunny.dont);
        }

        if (currentTemp < 90 && currentTemp > 50 && weatherStatus === "Rain") {
            advice.append(adviceObject.temperateRainy.m);
            advice.append(adviceObject.temperateRainy.do);
            advice.append(adviceObject.temperateRainy.dont);
        }

        if (currentTemp < 50 && weatherStatus !== "Rain") {
            advice.append(adviceObject.coldSunny.m);
            advice.append(adviceObject.coldSunny.do);
            advice.append(adviceObject.coldSunny.dont);
        }

        if (currentTemp < 50 && weatherStatus === "Rain") {
            advice.append(adviceObject.coldRainy.m);
            advice.append(adviceObject.coldRainy.do);
            advice.append(adviceObject.coldRainy.dont);
        }
    });

} else {
    //display "not zip"
}