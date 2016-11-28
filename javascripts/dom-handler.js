"use strict";


/* ------ SINGLE DAY VIEW ------ */

function buildWeather(data, zipCode){
	var output = document.getElementById("single-day-view");
	var fahrenheit = convertTemp(data.main.temp);

	output.innerHTML += 
	`<br><br><br>
	 <div id="weather-wrapper">
	 Current city: ${data.name}.<br>
	 The temperature is ${fahrenheit}&deg; F. <br>
	 The conditions are ${data.weather[0].main}.<br>
	 The wind speed is ${data.wind.speed} mph. <br>
	 The air pressure is ${data.main.pressure}.<br><br>

	 <a href="#" id="threeDayView">View 3 Day, yo.</a>
	 </div>
	 `;

	 //pass zip code in
	 threeDay(zipCode);
}


/* ------ THREE DAY VIEW ------ */

function buildThreeDay(data){
	var output = document.getElementById("three-day-view");

	var hourlyForecast = 8;
	var threeDayForecast = 3;

	//Find the daily overview, calculate the temps.
	for (var i = 0; i < threeDayForecast * hourlyForecast; i+= hourlyForecast){
		
		let temperature = singleDayTemp(data, i);
		console.log(temperature);

		//Sort the array & Convert Temp
		sortNumber(temperature);
		let lowTemp = convertTemp(temperature[0]);
		let highTemp = convertTemp(temperature[7]);

		//Display the highest and lowest.
		output.innerHTML +=
		`${data.list[i].weather[0].main}<br>
		High of ${highTemp}&deg; F.<br>		
		Low of ${lowTemp}&deg; F.<br>			
		---------------------------------<br>`;
	}
}



/* ----- SOME NERDY MATH STUFF ------ */


function convertTemp(kelvin) {
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
}


function sortNumber(temperature){
  temperature.sort(function(a, b) {
  return a - b;
	});
}

function singleDayTemp(data, counter){
	var temperature = [];
	for (var i = counter; i <= counter + 7; i++){
		var tempData = data.list[i].main.temp;
		//console.log("loop counter", counter);
		temperature.push(tempData);
	}
	return temperature;
}

/* -----  EVENT LISTENERS  ----- */

var zipCode = document.getElementById("zipCode");
zipCode.addEventListener("keydown", function(event){
	if(event.keyCode === 13) {
		runWeather();
	}
});

var submitBtn = document.getElementById("submitZip");
submitBtn.addEventListener("click", runWeather);

