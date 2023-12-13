// Access the form element with the ID "cityForm" from the HTML document
const cityForm = document.getElementById("cityForm");

// TODO: Replace this function with the one in the README.md file after backend is done.
async function getForecast(cityName) {

	try {
		// Perform a fetch request to the specified URL, passing the city name as a query parameter
		const response = await fetch(
		  `http://localhost:3000/getForecast?cityName=${cityName}`
		);
		// Parse the JSON response from the server
		const data = await response.json();
		// Return the parsed data
		return data;
	  } catch (error) {
		// Log any errors encountered during the fetch operation
		console.error("Error fetching forecast:", error);
		// Return null to indicate an unsuccessful operation
		return null;
	  }

	// return [
	// 	{
	// 		city: "Thailand",
	// 		temperature: 30,
	// 		condition: "Sunny",
	// 		chanceOfRain: 0,
	// 		textColor: "red",
	// 		moistLevel: 1,
	// 		moonPhase: "Waxing Gibbous",
	// 		averageTemp: 15,
	// 		maxTemp: 30,
	// 		minTemp: 10,
	// 		maxUVIndex: 10,
	// 		windDir: "N",
	// 		windKph: 500,
	// 		maxUVTime: new Date().toISOString(),

	// 	},
	// 	{
	// 		city: "London",
	// 		temperature: 3,
	// 		condition: "Sunny",
	// 		chanceOfRain: 1000,
	// 		textColor: "blue",
	// 		moistLevel: 10,
	// 		moonPhase: "Waxing Crescent",
	// 		averageTemp: 15,
	// 		maxTemp: 30,
	// 		minTemp: 10,
	// 		maxUVIndex: 10,
	// 		maxUVTime: new Date().toISOString(),
	// 	},
	// ][Math.floor(Math.random() * 2)];
}

// Add an "onsubmit" event listener to the cityForm
cityForm.onsubmit = async function (event) {
	// Prevent the default form submission behavior which refreshes the page
	event.preventDefault();
	// Set the inner text of the element with ID "result" to "Loading..."
	document.getElementById("result").innerText = "Loading...";

	// Retrieve the value from the input field with ID "city" in the form
	const city = document.getElementById("city").value;
	// Call getForecast function with the city name and await the result
	const forecastData = await getForecast(city);

	// Check if forecastData is not available (null or undefined)
	if (!forecastData) {
		// Update the result element to display an error message
		document.getElementById("result").innerText = "Failed to load data.";
		return;
	}

	// TODO: Loop through the number of times indicated by "result.moistLevel" and append water drop emojis

	let moistLevelEmojis = "";

	for(let i = 0; i < forecastData.moistLevel; i++){
		moistLevelEmojis = moistLevelEmojis + "💧";
	}

	let windDegreeEmojis = "";
	
	if (forecastData.windDir === "N"){
		windDegreeEmojis = "⬆️ North"
	} else if (forecastData.windDir === "E") {
		windDegreeEmojis = "➡️ East"
	} else if (forecastData.windDir === "S") {
		windDegreeEmojis = "⬇️ South"
	} else if (forecastData.windDir === "W") {
		windDegreeEmojis = "⬅️ West"
	};
	
	// TODO: Determine moon phase emojis based on "result.moonPhase"
	// take these emoji and names for your conditional statement for moon phases
	// "New Moon": "🌑",
	// "Waxing Crescent": "🌒",
	// "First Quarter": "🌓",
	// "Waxing Gibbous": "🌔",
	// "Full Moon": "🌕",
	// "Waning Gibbous": "🌖",
	// "Last Quarter": "🌗",
	// "Waning Crescent": "🌘",
	let moonPhaseEmojis = "";
	if (forecastData.moonPhase === "New Moon"){
		moonPhaseEmojis = "🌑"
	} else if (forecastData.moonPhase === "Waxing Crescent"){
		moonPhaseEmojis = "🌒"
	} else if (forecastData.moonPhase === "First Quarter"){
		moonPhaseEmojis = "🌓"
	} else if (forecastData.moonPhase === "Waxing Gibbous"){
		moonPhaseEmojis = "🌔"
	} else if (forecastData.moonPhase === "Full Moon"){
		moonPhaseEmojis = "🌕"
	} else if (forecastData.moonPhase === "Waning Gibbous"){
		moonPhaseEmojis = "🌖"
	} else if (forecastData.moonPhase === "Last Quarter"){
		moonPhaseEmojis = "🌗"
	} else if (forecastData.moonPhase === "Waning Crescent"){
		moonPhaseEmojis = "🌘"
	};

	// Construct HTML content to display the forecast data
	const resultHTML = `
        <div class=\"flex flex-col items-center justify-center\">
			<span>Current temperature in ${forecastData.city} is:</span>
            <span style="color: ${forecastData.textColor}" class="text-center font-bold text-2xl">
              	 ${forecastData.temperature}&#8451;
            </span>
			 <span class="text-center text-xl">
                Avg. ${forecastData.averageTemp.toFixed(2)}&#8451;
            </span>
			 <span class="text-center text-xl">
                Min. ${forecastData.minTemp.toFixed(2)}&#8451;
            </span>
			<span class="text-center text-xl">
				Max. ${forecastData.maxTemp.toFixed(2)}&#8451;
			</span>
        </div>
        <div>Chance of rain: ${forecastData.chanceOfRain}%</div>
        <div>Moist Level: ${moistLevelEmojis}</div>
        <div>Moon Phase: ${moonPhaseEmojis}</div>
		<div>Wind Direction: ${windDegreeEmojis}</div>
		<div>Wind Speed: ${forecastData.windKph} Km/Hr</div>
        <div>Max UV Index: ${forecastData.maxUVIndex}</div>
        <div>Max UV Time: ${forecastData.maxUVTime}</div>
    `;

	// Update the inner HTML of the element with ID "result" to display the constructed HTML content
	document.getElementById("result").innerHTML = resultHTML;
};
