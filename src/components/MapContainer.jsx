import React,
{
 useEffect,
 useRef,
 useContext
}
from "react";

import mapboxgl from "mapbox-gl";

import MapboxDraw from
"@mapbox/mapbox-gl-draw";

import { AppContext }
from "../context/AppContext";

import { isPointInPolygon }
from "../utils/polygonFilter";

export default function MapContainer({ properties }) {

const mapRef = useRef();

const mapInstance = useRef();

const drawInstance = useRef();

const {

 setMapCenter,
 selectedProperty,
 filteredProperties,
 setFilteredProperties

} = useContext(AppContext);


useEffect(() => {

mapboxgl.accessToken =
import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


mapInstance.current =
new mapboxgl.Map({

container: mapRef.current,

style:
"mapbox://styles/mapbox/streets-v11",

center: [-98.5795, 39.8283],

zoom: 3

});


window.mapboxMap =
mapInstance.current;


mapInstance.current.on("load", () => {


/*
 ADD DRAW TOOL
*/
drawInstance.current =
new MapboxDraw({

displayControlsDefault: false,

controls: {

 polygon: true,

 trash: true

}

});


mapInstance.current.addControl(
 drawInstance.current
);


/*
 MAP LOADED TEST INDICATOR
*/
const el =
document.createElement("div");

el.setAttribute(
"data-testid",
"map-loaded"
);

document.body.appendChild(el);


/*
 ADD MARKERS
*/
properties.forEach(property => {

const marker =
new mapboxgl.Marker()

.setLngLat([
 property.longitude,
 property.latitude
])

.addTo(mapInstance.current);

marker.getElement()
.setAttribute(
"data-testid",
`map-marker-${property.id}`
);

});


});


/*
 UPDATE CENTER WHEN MAP MOVES
*/
mapInstance.current.on(
"moveend",
() => {

const center =
mapInstance.current.getCenter();

setMapCenter({

 lat: center.lat,
 lng: center.lng

});

});


/*
 POLYGON DRAW EVENT
*/
mapInstance.current.on(
"draw.create",
updatePolygon
);

mapInstance.current.on(
"draw.update",
updatePolygon
);

mapInstance.current.on(
"draw.delete",
() => {

setFilteredProperties(null);

});


function updatePolygon() {

const data =
drawInstance.current.getAll();

if (
data.features.length === 0
)
return;


const polygon =
data.features[0]
.geometry.coordinates[0];


const filtered =
properties.filter(property =>

isPointInPolygon(

[
 property.longitude,
 property.latitude
],

polygon

)

);


setFilteredProperties(
 filtered
);

}


}, []);


/*
 CARD CLICK MOVE MAP
*/
useEffect(() => {

if (!selectedProperty)
 return;

mapInstance.current.flyTo({

center: [

 selectedProperty.longitude,

 selectedProperty.latitude

],

zoom: 14

});

}, [selectedProperty]);


return (

<div
 ref={mapRef}
 className="map"
/>

);

}
