export function generateFake7DayForecast(aqi) {
  return Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    aqi: Math.max(0, aqi + (Math.random() - 0.5) * 50),  // Small variation in AQI for each day
  }));
}
