import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RadiusSlider() {

const { radius, setRadius } =
useContext(AppContext);

return (

<div>

<label>
Radius: {radius} km
</label>

<input
data-testid="search-radius-slider"
type="range"
min="1"
max="500"
value={radius}
onChange={(e)=>
 setRadius(Number(e.target.value))
}
/>

</div>

);

}
