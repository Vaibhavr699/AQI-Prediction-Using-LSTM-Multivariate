import React, { useEffect, useState } from 'react';
import './index.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ForecastChart from './components/ForecastChart';
import AdvisorySection from './components/AdvisorySection';
import OpenAQForecast from './components/OpenAQForecast';

function App() {
  const [location, setLocation] = useState('');  // Start with empty location
  const [forecastData, setForecastData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [error, setError] = useState('');

  const handleLocationChange = (newLocation) => {
    if (!newLocation.trim()) {
      setError('Please enter a valid location!');
      return;
    }

    setLocation(newLocation);
    handleForecastUpdate(newLocation);
    setError('');
  };

  const handleForecastUpdate = async (newLocation) => {
    try {
      // Extract just the city name (before the comma)
      const cityName = newLocation.split(',')[0].trim();
      
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Extract predicted_aqi values from the predictions array
      const predictedAqiList = data.predictions.map(pred => pred.predicted_aqi);
      console.log(predictedAqiList, "predictedAqiList");
      setForecastData(predictedAqiList);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      setError('Failed to fetch forecast data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 p-4">
      <Header />
      <SearchBar onLocationChange={handleLocationChange} />
      {error && <div className="text-red-500 text-center">{error}</div>}
      {forecastData.length > 0 && (
        <>
          <h2 className="text-xl text-center mb-4">7-Day AQI Forecast for {location}</h2>
          <ForecastChart forecastData={forecastData} />
          <AdvisorySection aqi={forecastData[0] || 0} />
        </>
      )}
      {/* <OpenAQForecast city={location} onForecastUpdate={handleForecastUpdate} /> */}
    </div>
  );
}

export default App;