import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {

const [mapCenter, setMapCenter] = useState({
 lat: 37.7749,
 lng: -122.4194
});

const [radius, setRadius] = useState(10000);

const [selectedProperty, setSelectedProperty] =
useState(null);

const [filteredProperties, setFilteredProperties] =
useState(null);

const [savedSearches, setSavedSearches] =
useState([]);


/*
 LOAD SAVED SEARCHES FROM LOCAL STORAGE
*/
useEffect(() => {

const saved =
localStorage.getItem("savedSearches");

if (saved)
 setSavedSearches(JSON.parse(saved));

}, []);


/*
 SAVE TO LOCAL STORAGE
*/
useEffect(() => {

localStorage.setItem(
"savedSearches",
JSON.stringify(savedSearches)
);

}, [savedSearches]);


return (

<AppContext.Provider value={{

 mapCenter,
 setMapCenter,

 radius,
 setRadius,

 selectedProperty,
 setSelectedProperty,

 filteredProperties,
 setFilteredProperties,

 savedSearches,
 setSavedSearches

}}>

{children}

</AppContext.Provider>

);

}
