import React, { useState } from "react";

export default function SearchBar() {

const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const token =
import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

async function search(value) {

setQuery(value);

if (!value) return;

const res = await fetch(
`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${token}`
);

const data = await res.json();

setResults(data.features);

}

function select(place) {

setQuery(place.place_name);

setResults([]);

window.mapboxMap.flyTo({
 center: place.center,
 zoom: 12
});

}

return (

<div className="search-container">

<input
data-testid="location-autocomplete"
value={query}
onChange={(e)=>search(e.target.value)}
placeholder="Search city..."
/>

{results.map((place,index)=>(

<div
key={index}
data-testid={`autocomplete-suggestion-${index}`}
onClick={()=>select(place)}
className="search-result"
>

{place.place_name}

</div>

))}

</div>

);

}
