import React from "react";
import MapContainer from "../components/MapContainer";
import properties from "../data/properties.json";

export default function Properties() {

return (

<div className="container">

<div className="sidebar" data-testid="property-list">

<div className="header">

Properties

</div>

{properties.map(property => (

<div
className="property-card"
key={property.id}
data-testid={`property-card-${property.id}`}
>

<div className="property-title">
{property.title}
</div>

<div className="property-price">
${property.price}
</div>

</div>

))}

</div>

<div className="map-container" data-testid="map-container">

<MapContainer properties={properties} />

</div>

</div>

);

}
