import React, { useContext } from "react";
import MapContainer from "../components/MapContainer";
import SearchBar from "../components/SearchBar";
import properties from "../data/properties.json";
import { AppContext } from "../context/AppContext";

export default function Properties() {
  const { selectedProperty, setSelectedProperty } = useContext(AppContext);

  return (
    <div className="container">
      <div className="sidebar" data-testid="property-list">
        <div className="header">Properties</div>
        
        <SearchBar />

        {properties.map((property) => (
          <div
            className="property-card"
            key={property.id}
            data-testid={`property-card-${property.id}`}
            onClick={() => setSelectedProperty(property)}
            style={{
              backgroundColor:
                selectedProperty?.id === property.id ? "#e6f2ff" : "white",
            }}
          >
            <div className="property-title">{property.title}</div>
            <div className="property-price">${property.price}</div>
          </div>
        ))}
      </div>

      <div className="map-container" data-testid="map-container">
        <MapContainer properties={properties} />
      </div>
    </div>
  );
}