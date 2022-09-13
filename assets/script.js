// May delete if not needed
// const introEl = document.getElementById("#intro");
// const infoEl = document.getElementById("#info");
// const comingFeatEl = document.getElementById("#comingFeatures");
// const resourcesEl = document.getElementById("#resources");
// const aboutUsEl = document.getElementById("#aboutUs");
// const stopEl = document.getElementById("#stop");
// const cityInputEl = document.getElementById("#cityInput");
// const searchBtnEl = document.getElementById("#searchButton");
// const moreInfoEl = document.getElementById("#moreInfo");
// const weatherEl = document.getElementById("#weather");
// const gasEl = document.getElementById("#gas");
// const fourDayEl = document.getElementById("#fourDay");
// const day1El = document.getElementById("#day1");
// const day2El = document.getElementById("#day2");
// const day3El = document.getElementById("#day3");
// const day4El = document.getElementById("#day4");

//making the variables for api look up
var pastCity = []
var city = ""
var key = "104b3d87a3f27b63c86227e77149ab4c"

//saves the user input for city and state to localStorage, displays the temp and hum for now, add in forecast api to pull future data
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
    currentHum = data['main']['humidity']

    currentTemp = ((currentTemp-273.15)*1.7)+32;
    currentTemp = Math.trunc(currentTemp)
    currentHum = Math.trunc(currentHum)

    $('#curTemp').text((currentTemp) + “°F”);
    $('#curHum').text((currentHum) + “ %”);

    state = $('#stateSelect').val()
    console.log(state)
    localStorage.setItem('state',JSON.stringify(state))
});
}
//pulls the gas price average needs to link to searchbtn press,
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", `https://api.collectapi.com/gasPrice/stateUsaPrice?state=TN?`);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 0k6jygK77f2YNTdDpR3Pe6:27QdslUJHymqqJ3vTKBtfC");

xhr.send(data);



//trying to run gas api as fetch, xhr request are outdated
// fetch(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=TN`)
// .then((response) => response.json())
// .then((data) => {console.log(data)
// });


$("#searchBtn").on("click",saveCity)
