import React, { useState, useContext } from "react";

import { AppContext }
from "../context/AppContext";

export default function AdvancedFilter({ properties }) {

const {

 setFilteredProperties

} = useContext(AppContext);


const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [bedrooms, setBedrooms] = useState("");


function applyFilters() {

let filtered = [...properties];

if (minPrice)
filtered =
filtered.filter(
p => p.price >= Number(minPrice)
);

if (maxPrice)
filtered =
filtered.filter(
p => p.price <= Number(maxPrice)
);

if (bedrooms)
filtered =
filtered.filter(
p => p.bedrooms === Number(bedrooms)
);

setFilteredProperties(filtered);

}


return (

<div className="filter-panel">


<label>Min Price</label>

<input
data-testid="price-min-input"
type="number"
value={minPrice}
onChange={e =>
setMinPrice(e.target.value)
}
/>


<label>Max Price</label>

<input
data-testid="price-max-input"
type="number"
value={maxPrice}
onChange={e =>
setMaxPrice(e.target.value)
}
/>


<label>Bedrooms</label>

<select
data-testid="bedrooms-select"
value={bedrooms}
onChange={e =>
setBedrooms(e.target.value)
}
>

<option value="">
Any
</option>

<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>

</select>


<button
data-testid="apply-filters-button"
onClick={applyFilters}
>

Apply Filters

</button>


<div
data-testid="results-count"
>

Results will update in list

</div>


</div>

);

}
