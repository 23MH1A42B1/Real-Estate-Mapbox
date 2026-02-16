import React, { useState } from "react";

export default function SearchBar() {

const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const accessToken =
import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

async function handleSearch(value) {

setQuery(value);

if (!value) {
 setResults([]);
 return;
}

const response = await fetch(

`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${accessToken}`

);

const data = await response.json();

setResults(data.features);

}

function handleSelect(place) {

setQuery(place.place_name);

setResults([]);

window.mapboxMap.flyTo({

center: place.center,
zoom: 12

});

}

return (

<div style={{ padding: "10px" }}>

<input
data-testid="location-autocomplete"
type="text"
value={query}
onChange={(e) => handleSearch(e.target.value)}
placeholder="Search location..."
style={{
 width: "100%",
 padding: "10px",
 fontSize: "16px"
}}
/>

{results.map((place, index) => (

<div
key={index}
data-testid={`autocomplete-suggestion-${index}`}
onClick={() => handleSelect(place)}
style={{
 padding: "10px",
 cursor: "pointer",
 borderBottom: "1px solid #eee"
}}
>

{place.place_name}

</div>

))}

</div>

);

}
