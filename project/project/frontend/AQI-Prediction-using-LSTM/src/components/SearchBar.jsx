import React, { useState } from 'react';

const statesAndCities = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Kurnool', 'Tirupati', 'Rajahmundry', 'Anantapur', 'Nellore', 'Chittoor', 'Kadapa'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Naharlagun', 'Pasighat', 'Tezu'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Silchar', 'Nagaon', 'Tinsukia', 'Barpeta'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Munger', 'Begusarai', 'Purnea', 'Chapra'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon', 'Jagdalpur'],
  'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Anand', 'Junagadh', 'Nadiad', 'Gandhinagar', 'Valsad'],
  'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad', 'Karnal', 'Ambala', 'Hisar', 'Panipat', 'Yamunanagar'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamsala', 'Kullu', 'Solan', 'Mandi', 'Hamirpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Deoghar', 'Hazaribagh', 'Bokaro', 'Giridih'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangalore', 'Belagavi', 'Dakshina Kannada', 'Kalaburagi', 'Tumakuru', 'Chikkamagaluru'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur', 'Kannur', 'Palakkad', 'Alappuzha', 'Pathanamthitta'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Khandwa', 'Ujjain', 'Sagar', 'Ratlam', 'Guna'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Solapur', 'Kolhapur', 'Nanded', 'Latur'],
  'Manipur': ['Imphal', 'Thoubal', 'Churachandpur', 'Bishnupur', 'Tamenglong'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Mamit'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Zunheboto'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Puri', 'Bargarh'],
  'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Sikar', 'Chittorgarh', 'Bhilwara'],
  'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Rangpo'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli', 'Erode', 'Vellore', 'Chidambaram'],
  'Telangana': ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Mahabubnagar', 'Rangareddy'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Sonamura'],
  'Uttar Pradesh': ['Agra', 'Lucknow', 'Kanpur', 'Varanasi', 'Meerut', 'Ghaziabad', 'Noida', 'Aligarh', 'Mathura'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Roorkee', 'Haldwani'],
  'West Bengal': ['Kolkata', 'Siliguri', 'Asansol', 'Durgapur', 'Howrah', 'Kalyani', 'Malda', 'Berhampore'],
  'Delhi': ['Delhi'],
};


function SearchBar({ onLocationChange }) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      onLocationChange(`${selectedCity}, ${selectedState}`);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <select onChange={handleStateChange} value={selectedState} className="p-2 m-2">
        <option value="">Select State</option>
        {Object.keys(statesAndCities).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {selectedState && (
        <select onChange={handleCityChange} value={selectedCity} className="p-2 m-2">
          <option value="">Select City</option>
          {statesAndCities[selectedState].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      )}

      <button onClick={handleSearch} className="p-2 m-2 bg-blue-500 text-white rounded">Search</button>
    </div>
  );
}

export default SearchBar;