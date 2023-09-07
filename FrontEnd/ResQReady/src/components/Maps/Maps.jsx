import './Maps.css'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
// import ReactLeafletSearch from 'react-leaflet-search';
import { Icon, divIcon, point } from "leaflet";
import { useState } from 'react';




export default function Maps(){
  const [inputText, setInputText] = useState('Fire Service');
  const [searchText,setSearchText]=useState('Fire Service');
  const[lat,setLat]=useState(11.3410);
  const[long,setLong]=useState(77.7172);
  const markers = [{geocode: [11.5034, 77.2444],popUp: "SathyaMangalam",dept: "Fire Service"},
  {geocode:[11.4471,77.6840],popUp:"Bhavani",dept:"Fire Service"},
  {geocode:[11.2746,77.5827],popUp:"perundurai",dept:"Fire Service"},
  {geocode:[11.3580,77.3206],popUp:"Nambiyur",dept:"Fire Service"},{geocode: [11.4549, 77.4365],popUp: "GobiChettipalayam",dept: "RTO"},{geocode: [11.4594, 77.3077],popUp: "Kodiveri",dept: "Fire Service"}];
  
    const handleInputSelectChange=(e)=>{
       setInputText(e.target.value);
    }
    const handleSearch=()=>{
    //  const codes= markers.map((item)=>item.geocode);
    // console.log(typeof codes+"\n"+" "+codes);
    // const maxlat=0,minlat=maxlat;
    // codes.forEach((item)=>{
   
    // console.log(item);
    // }
   
    // )
   
      setSearchText(inputText);
      setLat();
      setLong();
      console.log(searchText);
    }
    return(
       <>
        <div class="filter-Type">
        <select name="languages" className='languages-options' onChange={handleInputSelectChange} value={inputText}>
                    <option value="Fire Service">Fire Service</option>
                    <option value="RTO">RTO</option>
                    
          </select>
           <button onClick={handleSearch}>Search</button> 
        </div>
         <MapContainer center={[lat, long]} zoom={13}>
  
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      
      {
        (markers.filter(item => item.dept===searchText)).map((marker) => (
          <Marker position={marker.geocode} >
            <Popup>{marker.popUp}</Popup>
          </Marker>))
      }
        {/* {markers.map((marker) => (
          <Marker position={marker.geocode} >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))} */}
      </MapContainer>
         </>
    );
}