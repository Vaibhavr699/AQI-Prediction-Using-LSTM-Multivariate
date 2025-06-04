import React, { useEffect, useState } from "react";
import axios from "axios";
import AQIChart from "../components/AQIChart";
import HealthTips from "../components/HealthTips";

const Dashboard = () => {
  const [aqi, setAqi] = useState(null);
  const [historical, setHistorical] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const [tip, setTip] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/historical").then((res) => {
      setHistorical(res.data.historical);
      setPredicted(res.data.predicted);
    });

    axios.post("http://localhost:5000/predict", {
      features: generateDummyData(),
    }).then((res) => {
      const predictedAQI = res.data.predicted_aqi;
      setAqi(predictedAQI);

      axios.get(`http://localhost:5000/health-tip?aqi=${predictedAQI}`).then((r) => {
        setTip(r.data.tip);
      });
    });
  }, []);

  const generateDummyData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({ PM2_5: 80 + Math.random() * 20, PM10: 100 + Math.random() * 30, NO2: 40, SO2: 20, CO: 0.5, O3: 30 });
    }
    return data;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Air Quality Index (AQI) Prediction</h1>
      <div className="mb-6">
        <h2 className="text-lg font-medium">Predicted AQI: <span className="text-blue-600">{aqi?.toFixed(2)}</span></h2>
        <p className="text-sm text-gray-600">{tip}</p>
      </div>
      <AQIChart historical={historical} predicted={predicted} />
      <HealthTips aqi={aqi} />
    </div>
  );
};

export default Dashboard;
