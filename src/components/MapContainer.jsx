import React, { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { AppContext } from "../context/AppContext";

export default function MapContainer({ properties }) {

const mapRef = useRef();
const markersRef = useRef([]);
const { selectedProperty, setSelectedProperty } =
useContext(AppContext);

useEffect(() => {

mapboxgl.accessToken =
import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({

container: mapRef.current,

style: "mapbox://styles/mapbox/streets-v11",

center: [-98.5795, 39.8283],

zoom: 3

});

window.mapboxMap = map;

map.on("load", () => {

properties.forEach(property => {

const marker = new mapboxgl.Marker()

.setLngLat([property.longitude, property.latitude])

.addTo(map);

marker.getElement().setAttribute(
"data-testid",
`map-marker-${property.id}`
);

marker.getElement().addEventListener("click", () => {

setSelectedProperty(property);

map.flyTo({
 center: [property.longitude, property.latitude],
 zoom: 12
});

});

markersRef.current.push(marker);

});

});

}, []);

useEffect(() => {

if (!selectedProperty) return;

window.mapboxMap.flyTo({

center: [
 selectedProperty.longitude,
 selectedProperty.latitude
],

zoom: 12

});

}, [selectedProperty]);

return <div ref={mapRef} className="map" />;

}
