import React from 'react';

function AdvisorySection({ aqi }) {
  let advisory = '';
  if (aqi <= 50) {
    advisory = 'Good: Air quality is considered satisfactory.';
  } else if (aqi <= 100) {
    advisory = 'Moderate: Air quality is acceptable, but some pollution may be a concern.';
  } else if (aqi <= 150) {
    advisory = 'Unhealthy for Sensitive Groups: People with respiratory conditions should limit exposure.';
  } else if (aqi <= 200) {
    advisory = 'Unhealthy: People should limit outdoor activities.';
  } else if (aqi <= 300) {
    advisory = 'Very Unhealthy: Avoid outdoor activities and limit exposure.';
  } else {
    advisory = 'Hazardous: Health alert, everyone should stay indoors.';
  }

  return (
    <div className="mt-4 p-4 border bg-red-100 rounded">
      <h3 className="font-semibold text-lg">Air Quality Advisory</h3>
      <p>{advisory}</p>
    </div>
  );
}

export default AdvisorySection;
