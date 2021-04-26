//Keep track of my variables

var searchButton = $(".searchButton");

var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// My Forloop for showing the data on the HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var cities = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + cities + "</li>");
}