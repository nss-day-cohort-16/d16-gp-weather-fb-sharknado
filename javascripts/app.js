"use strict";

console.log("app.js"); 


var zipCode = document.getElementById("zipCode");
var submitBtn = document.getElementById("submitZip");


function getWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID={ADD KEY HERE}`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


function readData(data) {
	console.log(data);
}


getWeather(37091)
	.then((data) =>{
		readData(data);
		buildWeather(data);
	});