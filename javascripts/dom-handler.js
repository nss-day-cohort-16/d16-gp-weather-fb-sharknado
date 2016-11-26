"use strict";

console.log("dom-handler.js");

//pushes info to dom
function buildWeather(data){
	var output = document.getElementById("single-day-view");
	var convertTemp = ((data.main.temp - 273.15) * 9/5) + 32;

	output.innerHTML = 
	`Current city: ${data.name}.<br>
	 The temperature is ${convertTemp.toFixed(0)}&deg; F. <br>
	 The conditions are ${data.weather[0].main}.<br>
	 The wind speed is ${data.wind.speed} mph. <br>
	 The air pressure is ${data.main.pressure}.
	 `;
}
