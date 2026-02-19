import React,
{ useContext }
from "react";

import { AppContext }
from "../context/AppContext";

export default function SavedSearches() {

const {
savedProperties
} =
useContext(AppContext);

if (
savedProperties.length === 0
)
return (

<div
data-testid="no-saved-searches"
>

No saved properties

</div>

);

return (

<div>

<h2>
Saved Properties
</h2>

{savedProperties.map(
property => (

<div
key={property.id}
data-testid={`saved-search-${property.id}`}
>

{property.title}

</div>

))}

</div>

);

}
