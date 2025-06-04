import React, { useEffect, useState } from "react";

function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [day, setDay] = useState(
    new Date().toLocaleString("en-US", { weekday: "long" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
      setDay(new Date().toLocaleString("en-US", { weekday: "long" }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="text-xl">
        {day}, {date}
      </div>
      <div className="text-4xl font-extrabold flex-1 text-center">
        AQI PREDICTION USING LSTM-MULTIVARIATE
      </div>
      <div className="text-xl">{time}</div>
    </div>
  );
}

export default Header;
