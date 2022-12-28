/* Global Variables */
const generateButton = document.getElementById("generate");

// Personal API Key for OpenWeatherMap API ;
const apiKey = "f5180daa28e313619eff2df34655dab4&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

//Action to take when the generate button is clicked
generateButton.addEventListener("click", function () {
  let zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=`;
  getWeatherData(baseURL)
    .then((data) => {
      let temperature = data.main.temp;
      let DataToShare = {
        Temp: temperature,
        Date: newDate,
        Feeling: feeling,
      };
      postData("/add", DataToShare);
    })
    .then(() => retrieveData());
});

// Async function to fetch the data from the OpenWeatherMapApi
const getWeatherData = async (baseURL) => {
  const res = await fetch(baseURL + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
};

// Function to POST the aquired data to the projectData object

const postData = async (url, dataa) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataa), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log(newData);
  } catch (error) {
    console.log("error", error);
  }
};

//Function to Get data
const retrieveData = async () => {
  const request = await fetch("/get");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.Temp) + "degrees";
    document.getElementById("content").innerHTML = allData.Feeling;
    document.getElementById("date").innerHTML = allData.Date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
