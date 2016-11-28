"use strict";


/* ------ API CALLS ------ */

function getWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=`,
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
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=3&APPID=`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


function getSevenDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=7&APPID=`,
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
		getThreeDayWeather(zipCode)
		.then((data) =>{
			prettyWeather(data, zipCode, 3);
			});
	});
}


function sevenDay(zipCode){
	var sevenDay = document.getElementById("sevenDayView");

	sevenDay.addEventListener("click", function(){
		getSevenDayWeather(zipCode)
		.then((data) =>{
			prettyWeather(data, zipCode, 7);
		});
	})
}