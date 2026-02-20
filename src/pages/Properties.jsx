import React,
{
 useContext,
 useEffect,
 useState
} from "react";

import { useNavigate }
from "react-router-dom";

import MapContainer
from "../components/MapContainer";

import SearchBar
from "../components/SearchBar";

import RadiusSlider
from "../components/RadiusSlider";

import AdvancedFilter
from "../components/AdvancedFilter";

import propertiesData
from "../data/properties.json";

import { AppContext }
from "../context/AppContext";

import { getDistance }
from "../utils/haversine";


export default function Properties() {

const navigate = useNavigate();

const {

 mapCenter,
 radius,

 filteredProperties,
 setFilteredProperties,

 selectedProperty,
 setSelectedProperty,

 saveProperty

} = useContext(AppContext);


const [viewMode, setViewMode] =
useState("list");


/* FIX: SHOW ALL PROPERTIES ON LOAD */

useEffect(() => {

 if (!mapCenter) {

  setFilteredProperties(propertiesData);

  return;

 }

 const filtered =
 propertiesData.filter(property => {

  const distance =
  getDistance(

   mapCenter.lat,
   mapCenter.lng,

   property.latitude,
   property.longitude

  );

  return distance <= radius;

 });

 setFilteredProperties(filtered);

}, [mapCenter, radius]);


/* DISPLAY */

const displayProperties =
filteredProperties.length > 0
? filteredProperties
: propertiesData;


return (

<div
 className="container"
 data-testid="properties-container"
>


{/* SIDEBAR */}

<div
 className="sidebar"
 data-testid="property-list"
>

<div className="header">

 Real Estate Finder

</div>


<SearchBar />


<RadiusSlider />


<AdvancedFilter
 properties={propertiesData}
/>


{/* RESTORE TOGGLE BUTTON */}

<button
 data-testid="view-toggle"

 onClick={() =>
 setViewMode(
 viewMode === "list"
 ? "grid"
 : "list"
 )
}
>

Toggle View

</button>


<div data-testid="results-count">

{displayProperties.length} Results

</div>


{/* PROPERTY LIST */}

{displayProperties.map(property => (

<div

 key={property.id}

 className={`property-card ${
 selectedProperty?.id === property.id
 ? "active"
 : ""
 }`}

 data-testid={`property-card-${property.id}`}

 data-latitude={property.latitude}

 data-longitude={property.longitude}

 onClick={() => {

 setSelectedProperty(property);

 navigate(`/property/${property.id}`);

 }}

>


<div
 className="property-title"
 data-testid={`property-title-${property.id}`}
>

{property.title}

</div>


<div
 className="property-price"
 data-testid={`property-price-${property.id}`}
>

${property.price}

</div>


<div
 className="property-address"
 data-testid={`property-address-${property.id}`}
>

{property.address}

</div>


<button

 data-testid={`save-property-${property.id}`}

 onClick={(e) => {

 e.stopPropagation();

 saveProperty(property);

 }}

>

Save Property

</button>


</div>

))}


</div>


{/* MAP */}

<div
 className="map-container"
 data-testid="map-container"
>


<div className="map-toolbar">

<button

 className="toolbar-btn"

 data-testid="draw-boundary-button"

 onClick={() =>
 window.mapboxDraw &&
 window.mapboxDraw.changeMode("draw_polygon")
 }

>

Draw Boundary

</button>


<button

 className="toolbar-btn"

 data-testid="clear-boundary-button"

 onClick={() =>
 window.mapboxDraw &&
 window.mapboxDraw.deleteAll()
 }

>

Clear Boundary

</button>

</div>


<MapContainer
 properties={propertiesData}
/>


</div>


</div>

);

}