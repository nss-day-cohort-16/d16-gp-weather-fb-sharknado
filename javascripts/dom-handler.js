"use strict";


/* ------ SINGLE DAY VIEW ------ */

function buildWeather(data, zipCode){
	var output = document.getElementById("single-day-view");
	var fahrenheit = convertTemp(data.main.temp);

	output.innerHTML += 
	`<br><br><br>
	 Current city: ${data.name}.<br>
	 The temperature is ${fahrenheit}&deg; F. <br>
	 The conditions are ${data.weather[0].main}.<br>
	 The wind speed is ${data.wind.speed} mph. <br>
	 The air pressure is ${data.main.pressure}.<br><br>

	 <a href="#" id="threeDayView">View 3 Day, yo.</a>
	 `;

	 //pass zip code in
	 threeDay(zipCode);
}


/* ------ MULTI DAY VIEW ------ */

function prettyWeather(data, zipCode, counter){
	var output = document.getElementById("seven-day-view");
	
	console.log("buildSevenDay data", data);

	for (var i = 0; i < counter; i++){

		let dayTemp = convertTemp(data.list[i].temp.day);
		let nightTemp = convertTemp(data.list[i].temp.night)

		output.innerHTML +=
		`${data.list[i].weather[0].main}<br>
		 High of ${dayTemp}&deg; F.<br>
		 Low of ${nightTemp}&deg; F.<br>
		--------------------------------<br>`		
		}

		if(counter ===3){
			output.innerHTML +=
			` <a href="#" id="sevenDayView">View 7 Days, yo.</a><br><br>`;
			sevenDay(zipCode);
	}
}


/* ----- SOME NERDY MATH STUFF ------ */


function convertTemp(kelvin) {
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
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

