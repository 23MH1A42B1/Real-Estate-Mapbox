import React, { useContext } from "react";

import { AppContext }
from "../context/AppContext";

import { useNavigate }
from "react-router-dom";

export default function SavedSearches() {

const {

 savedSearches,
 setSavedSearches,
 setMapCenter,
 setRadius

} = useContext(AppContext);

const navigate = useNavigate();


function loadSearch(search) {

setMapCenter(search.mapCenter);

setRadius(search.radius);

navigate("/properties");

}


function deleteSearch(id) {

const updated =
savedSearches.filter(
s => s.id !== id
);

setSavedSearches(updated);

}


if (savedSearches.length === 0)
return (

<div
data-testid="no-saved-searches"
>

No Saved Searches

</div>

);


return (

<div>

<h2>Saved Searches</h2>

{savedSearches.map(search => (

<div
key={search.id}
data-testid={`saved-search-${search.id}`}
>

<button
data-testid={`load-search-${search.id}`}
onClick={() =>
 loadSearch(search)
}
>

Load

</button>

<button
data-testid={`delete-search-${search.id}`}
onClick={() =>
 deleteSearch(search.id)
}
>

Delete

</button>

</div>

))}

</div>

);

}
