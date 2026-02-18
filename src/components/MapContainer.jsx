import React, { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { AppContext } from "../context/AppContext";

export default function MapContainer({ properties }) {

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const { setMapCenter } = useContext(AppContext);

  useEffect(() => {

    if (mapInstance.current) return;

    mapboxgl.accessToken =
      import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-98.5795, 39.8283],
      zoom: 3
    });

    window.mapboxMap = mapInstance.current;

    mapInstance.current.on("load", () => {

      // Add Draw Controls
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });

      mapInstance.current.addControl(draw);
      window.mapboxDraw = draw;

      // Map loaded indicator
      const el = document.createElement("div");
      el.setAttribute("data-testid", "map-loaded");
      document.body.appendChild(el);

      // Add Markers
      properties.forEach(property => {

        const marker = new mapboxgl.Marker()
          .setLngLat([property.longitude, property.latitude])
          .addTo(mapInstance.current);

        marker.getElement().setAttribute(
          "data-testid",
          `map-marker-${property.id}`
        );

      });

    });

    mapInstance.current.on("moveend", () => {
      const center = mapInstance.current.getCenter();
      setMapCenter({
        lat: center.lat,
        lng: center.lng
      });
    });

  }, []);

  return (
    <div
      ref={mapRef}
      className="map"
    />
  );
}
