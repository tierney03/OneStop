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
    currentLat = data['coord']['lat']
    currentLon = data['coord']['lon']
   

    currentTemp = ((currentTemp-273.15)*1.7)+32;
    currentTemp = Math.trunc(currentTemp);
    currentHum = Math.trunc(currentHum);
    

    
    $('#curTemp').text('Temp: ' + (currentTemp) + '°F');
    $('#curHum').text('Humidity: ' +(currentHum) + '%');

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&appid=${key}&exclude=minutely,hourly`)
    .then(response => response.json())
    .then(data =>{ console.log(data)
      var index = 0;
// forecast function pulling next 5 days and display upcoming weather and 
      for(let i = 6; i < 40; i+=7) {
         var forecast = data.list[i]
         var [date] = forecast.dt_txt.split(" ")
         var futHum = forecast.main.humidity
         var futMin = forecast.main.temp_min
         var futMax = forecast.main.temp_max
// convert the temp, remove decimal from wind and temp
         futMin = ((futMin-273.15)*1.8)+32;
         futMin = Math.trunc(futMin)

         futMax = ((futMax-273.15)*1.8)+32;
         futMax = Math.trunc(futMax)
//displaying the future weather
         $('#date'+index).text(date);
         $('#dayMin'+index).text('Min:'+ " " + (futMin) + '°F');
         $('#dayMax'+index).text('Max:'+ " " + (futMax) + '°F');
         $('#dayHum'+index).text('hum:'+ " " + (futHum) + '%');
         index++
     }
    })
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

    

    $('#gasPrice').text('State Avg Gas:$' + (gasPrice));
    $('#midPrice').text('State Avg Mid:$' + (midGrade));
    $('#premiumPrice').text('State Avg Premium:$' + (premium));
    $('#dieselPrice').text('State Avg Diesel:$' + (diesel));
  }
});

xhr.open("GET", `https://api.collectapi.com/gasPrice/stateUsaPrice?state=${state}`);
xhr.setRequestHeader("content-type", JSON);
xhr.setRequestHeader("authorization", "apikey 0k6jygK77f2YNTdDpR3Pe6:27QdslUJHymqqJ3vTKBtfC");

xhr.send(data);

}

$("#searchBtn").on("click",saveCity)
$("#searchBtn").on("click",setState)
