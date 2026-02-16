import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Properties from "./pages/Properties.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import SavedSearches from "./pages/SavedSearches.jsx";

export default function App() {

return (

<Routes>

<Route path="/" element={<Navigate to="/properties" />} />

<Route path="/properties" element={<Properties />} />

<Route path="/property/:id" element={<PropertyDetail />} />

<Route path="/saved-searches" element={<SavedSearches />} />

</Routes>

);

}
