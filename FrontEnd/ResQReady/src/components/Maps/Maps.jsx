import './Maps.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from 'react';

export default function Maps() {
  const [inputText, setInputText] = useState('Fire Service');
  const [searchText, setSearchText] = useState('Fire Service');
  const [lat, setLat] = useState(11.3410);
  const [lon, setLon] = useState(77.7172);
  const markers = [
    { geocode: [11.5034, 77.2444], popUp: "SathyaMangalam", dept: "Fire Service" },
    { geocode: [11.4471, 77.6840], popUp: "Bhavani", dept: "Fire Service" },
    { geocode: [11.2746, 77.5827], popUp: "perundurai", dept: "Fire Service" },
    { geocode: [11.3580, 77.3206], popUp: "Nambiyur", dept: "Fire Service" },
    { geocode: [11.4549, 77.4365], popUp: "GobiChettipalayam", dept: "RTO" },
    { geocode: [11.4594, 77.3077], popUp: "Kodiveri", dept: "Fire Service" }
  ];

  const handleInputSelectChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSearch = () => {
    setSearchText(inputText);
  }

  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    // Get user location when the component first loads
    getUserLocation();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Use the mapRef to access the map instance
      const map = mapRef.current;

      // Update the map view to the new coordinates
      map.setView([lat, lon], 13);
    }
  }, [lat, lon]);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          setUserLocation({ latitude: userLatitude, longitude: userLongitude });

          // Update the lat and lon state variables
          setLat(userLatitude);
          setLon(userLongitude);
        },
        (err) => {
          setError(`Error getting user location: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }

  return (
    <>
      <div className="filter-Type">
        <select name="languages" className='languages-options' onChange={handleInputSelectChange} value={inputText}>
          <option value="Fire Service">Fire Service</option>
          <option value="RTO">RTO</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <MapContainer center={[lat, lon]} zoom={13} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat,lon]} >
          <Popup>You are here</Popup>
        </Marker>
        {
          markers.filter(item => item.dept === searchText).map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))
        }
      </MapContainer>
      <div>
        <h1>Get User Location Example</h1>
        <button onClick={getUserLocation}>Get My Location</button>
        {userLocation && (
          <div>
            <h2>Your Location:</h2>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
}
