//Keeping track of my variables

var searchButton = $(".searchButton");

var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// My Forloop for showing the data on the HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var cities = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + cities + "</li>");
}

var countingKey = 0;
// Search button click event
searchButton.click(function () {

    var searchInput = $(".searchInput").val();

    // Variable for current weather working 
    var urlCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    // Variable for 5 day forecast working
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrentDay,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(countingKey, response.name);
            countingKey = countingKey + 1;

            // Start Current Weather append 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            
            var currentTempOut = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTempOut);
            currentTempOut.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Add Humidity
            currentTempOut.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentTempOut.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUVIndex = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUVIndex,
                method: "GET"
            }).then(function (response) {

                var currentUVIndex = currentTempOut.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUVIndex.addClass("UV");
                currentTempOut.append(currentUVIndex);
            });

        });
