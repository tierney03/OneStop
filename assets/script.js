//making the variables for api look up
var pastCity = []
var city = ""
var key = "104b3d87a3f27b63c86227e77149ab4c"

stateOptions = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
     for (var i = 0; i < stateOptions.length; i++ ) {
     $('<option/>').val(stateOptions[i]).html(stateOptions[i]).appendTo('#stateSelect');
     }

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
    dayHum = data['main']['humidity']
    dayMax = data['main']['temp_max']
    dayMin = data['main']['temp_min']
   

    currentTemp = ((currentTemp-273.15)*1.7)+32;
    dayMin = ((dayMin-273.15)*1.7)+32;
    dayMax = ((dayMax-273.15)*1.7)+32;
    dayMin = Math.trunc(dayMin);
    dayMax = Math.trunc(dayMax);
    currentTemp = Math.trunc(currentTemp);
    currentHum = Math.trunc(currentHum);
    

    
    $('#curTemp').text('Temp: ' + (currentTemp) + '°F');
    $('#curHum').text('Humidity: ' +(currentHum) + '%');
    $('#dayHum').text('Humidity: ' + (dayHum) + '%');
    $('#dayMin').text('Min Temp:  ' + (dayMin) + '°F');
    $('#dayMax').text('Max Temp:  ' + (dayMax) + '°F');
  }); 
 }

function setState(){ 
state = $('#stateSelect').val()
console.log(state)
localStorage.setItem('state',JSON.stringify(state))

//pulls the gas price average needs to link to searchbtn press,
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    // console.log(this.responseText);
    responseText = this.responseText
    responseText = JSON.parse(responseText);
    console.log(responseText)
    
    gasPrice = responseText['result']['state']['gasoline']
    midGrade = responseText['result']['state']['midGrade']
    premium = responseText['result']['state']['premium']
    diesel = responseText['result']['state']['diesel']

    console.log(gasPrice)
    console.log(midGrade)
    console.log(premium)
    console.log(diesel)

    

    $('#curPrice').text('State Avg:$' + (gasPrice));
  }
});

xhr.open("GET", `https://api.collectapi.com/gasPrice/stateUsaPrice?state=${state}`);
xhr.setRequestHeader("content-type", JSON);
xhr.setRequestHeader("authorization", "apikey 0k6jygK77f2YNTdDpR3Pe6:27QdslUJHymqqJ3vTKBtfC");

xhr.send(data);

}


//trying to run gas api as fetch, xhr request are outdated
// fetch(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=TN`)
// .then((response) => response.json())
// .then((data) => {console.log(data)
// });


$("#searchBtn").on("click",saveCity)
$("#searchBtn").on("click",setState)
