$(document).ready(function () {

// Global Vars
var city;
var cities;

// moment current date
let Today = moment().format("");
// add days for forecast to moment
let day1 = moment().add(1, "days").format();
let day2 = moment().add(2, "days").format();
let day3 = moment().add(3, "days").format();
let day4 = moment().add(4, "days").format();
let day5 = moment().add(5, "days").format();

// OpenWeather API,
// Search API for City
function search() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e58a91b5528ac74b5640933904b043fa";
    var coordinates = [];

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        coordinates.push(response.coordinates.lat);
        coordinates.push(response.coordinates.lon);
        var cityName = response.name;
        var cityTemp = response.main.temp;
        var cityCond = response.weather[0].description;
        var cityWind = response.wind.speed;
        var cityHumi = response.main.humidity;
        var icon = response.weather[0].icon;
        $('#icon').html(
         `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`  
        );

        $("#city-name").html(cityName + " " + "(" + Today + ")");
        $("#condition").text("Current Conditions: " + cityCond);
        $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
        $("#humidity").text("Humidity: " + cityHumi + "%");
        $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
        $("#date1").text(day1);
        $("#date2").text(day2);
        $("#date3").text(day3);
        $("#date4").text(day4);
        $("#date5").text(day5);


})};    
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&exclude=minutely,hourly" + "&units+imperial&appid=e58a91b5528ac74b5640933904b043fa",
        method: "GET"
    }).then(function (response) {

        let cityHigh = response.daily[0].temp.max;
        $("#high").text("Daily High (F): " + " " + cityHigh);
// Forcast Temps
        let day1temp = response.daily[1].temp.max;
        let day2temp = response.daily[2].temp.max;
        let day3temp = response.daily[3].temp.max;
        let day4temp = response.daily[4].temp.max;
        let day5temp = response.daily[5].temp.max;
        $("#temp1").text("Temp(F):" + " " + day1temp.toFixed(1));
        $("#temp2").text("Temp(F):" + " " + day2temp.toFixed(1));
        $("#temp3").text("Temp(F):" + " " + day3temp.toFixed(1));
        $("#temp4").text("Temp(F):" + " " + day4temp.toFixed(1));
        $("#temp5").text("Temp(F):" + " " + day5temp.toFixed(1));
 // Forecast Humidity
        let day1humidity = response.daily[1].humidity;
        let day2humidity = response.daily[2].humidity;
        let day3humidity = response.daily[3].humidity;
        let day4humidity = response.daily[4].humidity;
        let day5humidity = response.daily[5].humidity;
        $("#humidity1").text("Humidity: " + " " + day1humidity  + "%");
        $("#humidity2").text("Humidity: " + " " + day2humidity  + "%");
        $("#humidity3").text("Humidity: " + " " + day3humidity  + "%");
        $("#humidity4").text("Humidity: " + " " + day4humidity  + "%");
        $("#humidity5").text("Humidity: " + " " + day5humidity  + "%");
 // Forecast Icons
        let icon1 = response.daily[1].weather[0].icon;
        let icon2 = response.daily[2].weather[0].icon;
        let icon3 = response.daily[3].weather[0].icon;
        let icon4 = response.daily[4].weather[0].icon;
        let icon5 = response.daily[5].weather[0].icon;              
    })

// Need to search for city (event handler?)
$('#submit').on("click", (i)=> {
    i.preventDefault();
    search();
    searchCity();
    $('#entered-city').val("");
    listCities();
});

// Function to save city search
function saveToLocalStorage() {
    localStorage.setItem("mostRecent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
};
// Function to retrieve city search
function searchCity() {
    city = $('#entered-city').val();
    if (city && cities.includes(city) === false) {
        saveToLocalStorage();
        return city;
    }   
    else if (!city) {
        alert("Nope, Please try another city");
    }
};

// Function to load last searched city
function loadLastCity() {
    let lastSearch = localStorage.getItem("lastCity");
    if (lastSearch) {
        city = lastSearch;
        search();
    }   else {
        city = "Leicester";
        search();
    }
}
loadLastCity()

//Function to load most recent cities
function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));
    if (recentCities) {
        cities = recentCities;
    }   else {
        cities = [];
    }
}
loadRecentCities ()

//Function to SHOW recent city search 
function listCities() {
    $('#cityList').text("");
    cities.forEach(city => {
        $('#cityList').prepend("<tr><td>" + city + "</td></tr>");
        
    });
}
listCities();

// Event handler for recent searches in table
$(document).on("click", "td", (i) => {
    i.preventDefault();
    let listedCity = $(i.target).text();
    city  = listedCity;
    search();
});

// Event Handler for clear button
$('#clr-btn').click(() => {
    localStorage.removeItem("cities");
    loadRecentCities();
    listCities();
});


});
