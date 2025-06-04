import React, { useState, useEffect } from 'react';

const OpenAQForecast = ({ city = "Delhi", onForecastUpdate }) => {
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAqi = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch current AQI data
      const currentRes = await fetch(
        `https://api.waqi.info/feed/${city}/?token=demo`
      );
      
      if (!currentRes.ok) {
        throw new Error(`HTTP error! status: ${currentRes.status}`);
      }
      
      const currentData = await currentRes.json();

      if (currentData.status !== 'ok') {
        throw new Error("No data available for this city");
      }

      // Get current measurements
      const currentMeasurement = {
        value: currentData.data.aqi,
        lastUpdated: currentData.data.time.iso
      };
      
      setAqiData([currentMeasurement]);

      // Fetch prediction from your Flask backend
      const predictionRes = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: [
            currentData.data.iaqi?.pm25?.v || 0,  // PM2.5
            currentData.data.iaqi?.pm10?.v || 0,  // PM10
            currentData.data.iaqi?.no2?.v || 0    // NO2
          ]
        }),
      });

      if (!predictionRes.ok) {
        throw new Error("Failed to get prediction");
      }

      const predictionData = await predictionRes.json();
      
      // Generate forecast data for 7 days
      const forecastData = Array(7).fill(0).map((_, index) => {
        if (index === 0) return currentMeasurement.value;
        // For future days, use the predicted value with some variation
        return Math.round(predictionData.prediction * (1 + (Math.random() * 0.2 - 0.1)));
      });

      // Update parent component with forecast data
      if (onForecastUpdate) {
        onForecastUpdate(forecastData);
      }

    } catch (err) {
      setError(err.message || "Failed to fetch AQI data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAqi();
  }, [city]);

  if (loading) return <p className="text-blue-500">Loading AQI data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Current AQI - {city}</h2>
      {aqiData.length === 0 ? (
        <p className="text-gray-500">No recent measurements available</p>
      ) : (
        <ul>
          {aqiData.map((data, i) => (
            <li key={i} className="flex justify-between border-b py-1">
              <span>{new Date(data.lastUpdated).toLocaleString()}</span>
              <span className="font-semibold text-green-700">{data.value} AQI</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenAQForecast;
