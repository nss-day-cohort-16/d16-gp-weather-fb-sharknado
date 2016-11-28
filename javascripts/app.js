"use strict";


/* ------ API CALLS ------ */

function getWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID={IDHERE}`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


function getThreeDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&APPID={IDHERE}`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


/* ------ VALIDATE ZIP & BUILD WEATHER  ------ */

function runWeather(){
	var zipCode = document.getElementById("zipCode").value;
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if (isValidZip){
		console.log("Yeah, that's valid. Move along now.");
		getWeather(zipCode)
		.then((data) =>{
			buildWeather(data, zipCode);
		});

	} else {
		alert("Woah there, we need a valid zip code.");
	}
}



function threeDay(zipCode){
var threeDay = document.getElementById("threeDayView");

threeDay.addEventListener("click", function(){
	//console.log("You clicked on 3 day. Now make it do something.");
	//zip code needs to be passed in from build weather
	
	getThreeDayWeather(zipCode)
	.then((data) =>{
		buildThreeDay(data);
	});
	
});
}
