import React from "react";

function Price(props) {
    const priceMin = props.priceMin
    const setPriceMin = props.setPriceMin
    const priceMax = props.priceMax
    const setPriceMax = props.setPriceMax
    
  return (
    <div>
      <div>
        <input
          type="range"
          min={0}
          step={5}
          max={500}
          id="MinPrice"
          name="MinPrice"
          value={priceMin}
          onChange={(event) => setPriceMin(event.target.value)}
        />
        <label for="MinPrice"> Minimum Price: {priceMin} </label>
      </div>
      <div>
        <input
          type="range"
          min={0}
          step={5}
          max={500}
          id="MaxPrice"
          name="MaxPrice"
          value={priceMax}
          onChange={(event) => setPriceMax(event.target.value)}
        />
        <label for="MaxPrice"> Maximum Price: {priceMax} </label>
      </div>
    </div>
  );
}

export default Price;
