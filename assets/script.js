//making the variables for api look up
var pastGas = []
var pastState = []
var pastCity = []
var city = ""
var key = "104b3d87a3f27b63c86227e77149ab4c"

stateOptions = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];
     for (var i = 0; i < stateOptions.length; i++ ) {
     $('<option/>').val(stateOptions[i]).html(stateOptions[i]).appendTo('#stateSelect');
     }


//saves the user input for city and state to localStorage, displays the temp and hum for now, add in forecast api to pull future data
function saveCity(){
  
  city = $("#cityInput").val().trim()
  pastCity.push(city)
  localStorage.setItem("pastCity",JSON.stringify(pastCity))

    //calling the API and what data to input 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => response.json())
    .then((data) => {console.log(data)
   //pulling selected data
    currentTemp = data['main']['temp']
    currentHum = data['main']['humidity']
    currentLat = data['coord']['lat']
    currentLon = data['coord']['lon']
   
   //converting temp and removing decimals
    currentTemp = ((currentTemp-273.15)*1.7)+32;
    currentTemp = Math.trunc(currentTemp);
    currentHum = Math.trunc(currentHum);
    
    $('#pastSearch').append(city + " ")
    //adding the temp and hum to display on HTML
    $('#curTemp').text('Temp: ' + (currentTemp) + '°F');
    $('#curHum').text('Humidity: ' +(currentHum) + '%');

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLon}&appid=${key}&exclude=minutely,hourly`)
    .then(response => response.json())
    .then(data =>{ console.log(data)
      var index = 0;
// forecast loop pulling next 5 days and display upcoming weather and 
      for(let i = 6; i < 40; i+=7) {
         var forecast = data.list[i]
         var [date] = forecast.dt_txt.split(" ")
         var futHum = forecast.main.humidity
         var futMin = forecast.main.temp_min
         var futMax = forecast.main.temp_max
         var icon = forecast.weather[0].icon
// convert the temp, remove decimal from wind and temp
         futMin = ((futMin-273.15)*1.8)+32;
         futMin = Math.trunc(futMin)

         futMax = ((futMax-273.15)*1.8)+32;
         futMax = Math.trunc(futMax)

         $("#img"+index).attr(
          "src",
          " http://openweathermap.org/img/wn/" + icon +"@2x.png"
          
         );
//displaying the future weather
         $('#date'+index).text(date);
         $('#dayMin'+index).text('Daily Min:'+ " " + (futMin) + '°F');
         $('#dayMax'+index).text('Daily Max:'+ " " + (futMax) + '°F');
         $('#dayHum'+index).text('Humity:'+ " " + (futHum) + '%');
         index++
     }
    })
  }); 
 }

 //sets the state to pull the average gas prices
function setState(){ 
state = $('#stateSelect').val()
pastState.push(state)
console.log(state)
localStorage.setItem('state',JSON.stringify(pastState))

//pulls the gas price average needs to link to searchbtn press,
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    responseText = this.responseText
    responseText = JSON.parse(responseText);
    //runs through the api to pull the prices for fuel types
    gasPrice = responseText['result']['state']['gasoline']
    midGrade = responseText['result']['state']['midGrade']
    premium = responseText['result']['state']['premium']
    diesel = responseText['result']['state']['diesel']

    gasPrice = gasPrice.slice(0, gasPrice.length - 1);
    midGrade = midGrade.slice(0, midGrade.length - 1);
    premium = premium.slice(0, premium.length - 1);
    diesel = diesel.slice(0, diesel.length - 1);

    //adds the prices to the pre set places on HTML
    $('#pastSearch').append(", " + state + "- $" + gasPrice + `<br>`)
    $('#gasPrice').text('Average Gas: $' + (gasPrice));
    $('#midGrade').text('Average Mid: $' + (midGrade));
    $('#premiumPrice').text('Average Premium: $' + (premium));
    $('#dieselPrice').text('Average Diesel: $' + (diesel));

    pastGas.push(gasPrice)
    localStorage.setItem('pastGas',JSON.stringify(pastGas))

  }
});
//API request
xhr.open("GET", `https://api.collectapi.com/gasPrice/stateUsaPrice?state=${state}`);
xhr.setRequestHeader("content-type", JSON);
xhr.setRequestHeader("authorization", "apikey 0k6jygK77f2YNTdDpR3Pe6:27QdslUJHymqqJ3vTKBtfC");

xhr.send(data);

}
//Hotel API shows hotels and surronding attractions
function hotelCity(){

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3d1c2d7f67mshddf82a9182fa081p19577ajsn1520b3beb5fa',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};
around = $("#cityInput").val().trim()
fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=${around}&locale=en_US&currency=USD`, options)
	.then(response => response.json())
	 .then(response => { 

    console.log(response)
    hotel = response['suggestions'][1]['entities']['0']['name']
    console.log(hotel)

    $('#hotelTest').text(" Top Hotel: " + (hotel))
  
  })
}

function clearHistory(event){
  pastCity=[];
  state = [];
  pastGas = [];
  localStorage.removeItem("pastCity");
  localStorage.removeItem("state");
  localStorage.removeItem("pastGas");
  document.location.reload();
}


$("#clearSearch").on("click",clearHistory);
$('#searchBtn').on("click",hotelCity)
$("#searchBtn").on("click",saveCity)
$("#searchBtn").on("click",setState)
