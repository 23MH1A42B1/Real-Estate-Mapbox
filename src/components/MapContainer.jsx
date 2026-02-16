import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function MapContainer({ properties }) {

const mapRef = useRef();

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

const el = document.createElement("div");

el.setAttribute("data-testid", "map-loaded");

document.body.appendChild(el);

properties.forEach(property => {

const marker = new mapboxgl.Marker()

.setLngLat([property.longitude, property.latitude])

.addTo(map);

marker.getElement().setAttribute(
"data-testid",
`map-marker-${property.id}`
);

});

});

}, []);

return <div ref={mapRef} className="map" />;

}
