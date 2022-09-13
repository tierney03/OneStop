const introEl = document.getElementById("#intro");
const infoEl = document.getElementById("#info");
const comingFeatEl = document.getElementById("#comingFeatures");
const resourcesEl = document.getElementById("#resources");
const aboutUsEl = document.getElementById("#aboutUs");
const stopEl = document.getElementById("#stop");
const cityInputEl = document.getElementById("#cityInput");
const searchBtnEl = document.getElementById("#searchButton");
const moreInfoEl = document.getElementById("#moreInfo");
const weatherEl = document.getElementById("#weather");
const gasEl = document.getElementById("#gas");
const fourDayEl = document.getElementById("#fourDay");
const day1El = document.getElementById("#day1");
const day2El = document.getElementById("#day2");
const day3El = document.getElementById("#day3");
const day4El = document.getElementById("#day4");

var pastCity = []
var city = ""

var pastCity = []
var city = ""
var key = "104b3d87a3f27b63c86227e77149ab4c"


function saveCity(){
    
    city = $("#cityInput").val().trim()
    pastCity.push(city)
    searchedList = $(`<li class="list-group-item list-group-item-secondary" id="work">${city.toUpperCase()}</li>`);
    $("#search-history").append(searchedList);
    localStorage.setItem("pastCity",JSON.stringify(pastCity))

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => response.json())
    .then((data) => {console.log(data)

    currentTemp = data['main']['temp']
 });
}

$("#searchBtn").on("click",saveCity)
