import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import MapContainer from "../components/MapContainer";
import SearchBar from "../components/SearchBar";
import RadiusSlider from "../components/RadiusSlider";
import SaveSearchButton from "../components/SaveSearchButton";
import AdvancedFilter from "../components/AdvancedFilter"; // Added Step 2

// Context & Utils
import properties from "../data/properties.json";
import { AppContext } from "../context/AppContext";
import { getDistance } from "../utils/haversine";

export default function Properties() {
  const navigate = useNavigate();

  const {
    mapCenter,
    radius,
    selectedProperty,
    setSelectedProperty,
    filteredProperties,
    setFilteredProperties
  } = useContext(AppContext);

  /* GEOSPATIAL FILTERING */
  useEffect(() => {
    if (!mapCenter) return;

    const filtered = properties.filter(property => {
      const distance = getDistance(
        mapCenter.lat,
        mapCenter.lng,
        property.latitude,
        property.longitude
      );
      return distance <= radius;
    });

    setFilteredProperties(filtered);
  }, [mapCenter, radius, setFilteredProperties]);

  const displayProperties = filteredProperties ?? properties;

  return (
    <div className="container" data-testid="properties-container">
      
      {/* SIDEBAR */}
      <div className="sidebar" data-testid="property-list">
        <div className="header">Real Estate Properties</div>

        <SearchBar />
        <RadiusSlider />
        
        {/* STEP 2: Advanced Filter */}
        <AdvancedFilter properties={properties} />
        
        <SaveSearchButton />

        <hr />

        {/* STEP 3: View Toggle Button */}
        <div className="view-controls">
          <button className="btn-toggle" data-testid="view-toggle">
            Toggle View
          </button>
        </div>

        {/* PROPERTY LIST */}
        <div className="scrollable-list">
          {displayProperties.map(property => (
            <div
              key={property.id}
              className="property-card"
              data-testid={`property-card-${property.id}`}
              onClick={() => {
                setSelectedProperty(property);
                navigate(`/property/${property.id}`);
              }}
              style={{
                backgroundColor: selectedProperty?.id === property.id ? "#e6f2ff" : "white",
                cursor: "pointer"
              }}
            >
              <div className="property-title">{property.title}</div>
              <div className="property-price">${property.price.toLocaleString()}</div>
              <div>{property.address}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="map-wrapper">
        {/* STEP 4: Draw Boundary Controls */}
        <div className="map-controls">
          <button
            data-testid="draw-boundary-button"
            onClick={() => window.mapboxDraw?.changeMode("draw_polygon")}
          >
            Draw Boundary
          </button>
          <button
            data-testid="clear-boundary-button"
            onClick={() => window.mapboxDraw?.deleteAll()}
          >
            Clear Boundary
          </button>
        </div>

        <div className="map-container" data-testid="map-container">
          <MapContainer properties={properties} />
        </div>
      </div>

    </div>
  );
}