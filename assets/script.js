$(document).ready(function () {

// Global Vars
var city;
var cities;


// OpenWeather API,
// Search API for City
function search() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e58a91b5528ac74b5640933904b043fa";
    var coordinates = [];

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        //coordinates.push(response.coordinates.lat);
        //coordinates.push(response.coordinates.lon);
        var cityName = response.name;
        var cityTemp = response.main.temp;
        var cityCond = response.weather[0].description;
        var cityWind = response.wind.speed;
        var cityHumi = response.main.humidity;
        var icon = response.weather[0].icon;
        $('')


})};    

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


})
// The city name

// The date

// An icon representation of weather conditions

// The temperature

// The humidity

// The wind speed

// When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:

// The date

// An icon representation of weather conditions

// The temperature

// The humidity

// When a user clicks on a city in the search history they are again presented with current and future conditions for that city.