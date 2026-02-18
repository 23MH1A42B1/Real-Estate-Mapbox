import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import mapboxgl from "mapbox-gl";

// Data & Utils
import properties from "../data/properties.json";
import amenities from "../data/amenities.json";
import { getDistance } from "../utils/haversine";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigation
  
  const property = properties.find(p => p.id === Number(id));
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    if (!property) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "detail-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [property.longitude, property.latitude],
      zoom: 14
    });

    // Add main property marker
    new mapboxgl.Marker()
      .setLngLat([property.longitude, property.latitude])
      .addTo(map);

    // Calculate proximity to points of interest (POIs)
    const calculated = amenities.map(amenity => {
      const distance = getDistance(
        property.latitude,
        property.longitude,
        amenity.latitude,
        amenity.longitude
      );
      return {
        ...amenity,
        distance: distance.toFixed(2)
      };
    });

    setDistances(calculated);

    // Cleanup map on unmount
    return () => map.remove();
  }, [property]);

  if (!property) return <div className="error">Property not found.</div>;

  return (
    <div className="detail-container" data-testid="property-detail-container">
      
      {/* Navigation Header */}
      <button 
        className="back-button"
        onClick={() => navigate("/properties")}
      >
        ← Back to Properties
      </button>

      <h1 className="detail-title" data-testid="property-title">
        {property.title}
      </h1>

      <div className="detail-info-grid">
        <div className="detail-price" data-testid="property-price">
          ${property.price.toLocaleString()}
        </div>

        <div className="detail-address" data-testid="property-full-address">
          {property.address}, {property.city}, {property.state}
        </div>

        <div className="detail-coords" data-testid="property-coordinates">
          <strong>Coordinates:</strong> {property.latitude}, {property.longitude}
        </div>
      </div>

      {/* Mapbox Instance */}
      <div 
        id="detail-map" 
        className="map" 
        data-testid="property-map"
        style={{ height: '400px', width: '100%', marginTop: '20px' }}
      />

      {/* Geospatial Insights Section */}
      <div className="detail-section" data-testid="nearby-amenities">
        <h3>Nearby Amenities</h3>
        <div className="amenities-list">
          {distances.map(amenity => (
            <div 
              key={amenity.id} 
              className="amenity-item"
              data-testid={`amenity-distance-${amenity.id}`}
            >
              <strong>{amenity.name}</strong> — {amenity.distance} km
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}