import React from "react";

function PriceFilter({ min, setMin, max, setMax }) {
  return (
    <fieldset>
      <legend>Price</legend>
      <label htmlFor="min-price">
        Min price
        <input
          type="range"
          id="min-price"
          min="0.5"
          max="9"
          step="0.25"
          value={min}
          onChange={e => setMin(e.target.value)}
        />
      </label>
      <label htmlFor="max-price">
        Max price
        <input
          type="range"
          id="max-price"
          min="0.5"
          max="9"
          step="0.25"
          value={max}
          onChange={e => setMax(e.target.value)}
        />
      </label>
    </fieldset>
  );
}

export default PriceFilter;
