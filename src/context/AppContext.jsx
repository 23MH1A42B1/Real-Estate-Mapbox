import React,
{
 createContext,
 useState
} from "react";

export const AppContext =
createContext();

export function AppProvider(
{ children }
) {

const [mapCenter, setMapCenter] =
useState(null);

const [radius, setRadius] =
useState(10);

const [filteredProperties,
setFilteredProperties] =
useState([]);

const [selectedProperty,
setSelectedProperty] =
useState(null);

const [savedProperties,
setSavedProperties] =
useState(
JSON.parse(
localStorage.getItem(
"savedProperties"
)
) || []
);

function saveProperty(property) {

const exists =
savedProperties.find(
p => p.id === property.id
);

if (exists) return;

const updated =
[
...savedProperties,
property
];

setSavedProperties(updated);

localStorage.setItem(
"savedProperties",
JSON.stringify(updated)
);

alert("Property saved!");

}

return (

<AppContext.Provider value={{

mapCenter,
setMapCenter,

radius,
setRadius,

filteredProperties,
setFilteredProperties,

selectedProperty,
setSelectedProperty,

savedProperties,
saveProperty

}}>

{children}

</AppContext.Provider>

);

}
