import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState("London");
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "67df0fd25fdb1d3e55157741680be507";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Empty dependency array to fetch data once on mount

  // Get the current date
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const handleInputChange = (event) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch(main){
      case "Clouds":
        return "/cloudy.webp";
      case "Rain":
        return "/rainy.jpg";
      case "Haze":
        return "/haze.jpeg";
      case "thunder":
        return "/thunder.avif";
        case "Smoke":
        return "/smoke.jpg";
      case "Clear":
        return "/clearSky.jpg";  
      default:
        return "/default.jpg";     
    }
  }




  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_date">
              <h2 className="container_city">{weatherData.name}</h2>


              <img src={getWeatherIconUrl(weatherData.weather[0].main)}
               alt="weather Icon" width="180px" className="container_img" />




              <h2 className="container_degree">{weatherData.main.temp}°C</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>
              <form className="form" onSubmit={handleSubmit}>
                <input type="text" className="input" placeholder="Enter city name" onChange={handleInputChange} />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
