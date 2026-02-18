import React, { useContext } from "react";

import { AppContext }
from "../context/AppContext";

export default function SaveSearchButton() {

const {
 mapCenter,
 radius,
 savedSearches,
 setSavedSearches
} = useContext(AppContext);


function saveSearch() {

const newSearch = {

 id: Date.now(),

 mapCenter,

 radius

};

setSavedSearches([
 ...savedSearches,
 newSearch
]);

alert("Search saved");

}

return (

<button
data-testid="save-search-button"
onClick={saveSearch}
style={{
 padding: "10px",
 margin: "10px",
 width: "90%"
}}
>

Save Search

</button>

);

}
