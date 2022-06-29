import React, { useState } from "react";

function UploadFilters() {

    const [colorFilter, setColorFilter] = useState(null)

    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(500)

    const [colorBlack, setColorBlack] = useState(true)
    const [colorWhite, setColorWhite] = useState(true)
    const [colorBlue, setColorBlue] = useState(true)
    const [colorRed, setColorRed] = useState(true)
    const [colorBrown, setColorBrown] = useState(true)
    const [colorGreen, setColorGreen] = useState(true)

    const [prescription, setPrescription] = useState(0)

    const [shapeAvaitor, setShapeAvaitor] = useState(true)
    const [shapeSquare, setShapeSquare] = useState(true)
    const [shapeRectangle, setShapeRectangle] = useState(true)
    const [shapeOval, setShapeOval] = useState(true)
    const [shapeRound, setShapeRound] = useState(true)
    

  return (
    <div>
        <div>
        <input
          type="number"
          min={0}
          max={10}
          id="prescription"
          name="prescription"
          value={prescription}
          onChange={(event) => setPrescription(event.target.value)}
        />
        <label for="MinPrice"> Prescription </label>
        </div>

        <br />

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
      <br />
      <div>
        <input
          type="checkbox"
          id="black"
          name="black"
          checked
          onChange={() => setColorBlack(!colorBlack)}
        />
        <label for="black"> Black</label>
        <br />
        <input
          type="checkbox"
          id="white"
          name="White"
          checked
          onChange={() => setColorWhite(!colorWhite)}
        />
        <label for="white"> White</label>
        <br />
        <input
          type="checkbox"
          id="blue"
          name="blue"
          checked
          onChange={() => setColorBlue(!colorBlue)}
        />
        <label for="blue"> Blue</label>
        <br />
        <input
          type="checkbox"
          id="red"
          name="red"
          checked
          onChange={() => setColorRed(!colorRed)}
        />
        <label for="red"> Red</label>
        <br />
        <input
          type="checkbox"
          id="brown"
          name="brown"
          checked
          onChange={() => setColorBrown(!colorBrown)}
        />
        <label for="brown"> Brown</label>
        <br />
        <input
          type="checkbox"
          id="green"
          name="green"
          checked
          onChange={() => setColorGreen(!colorGreen)}
        />
        <label for="green"> Green</label>
        <br />
      </div>
      <br />
      <div>
        <input
          type="checkbox"
          id="square"
          name="square"
          checked
          onChange={() => setShapeSquare(!shapeSquare)}
        />
        <label for="square"> Square</label>
        <br />
        <input
          type="checkbox"
          id="round"
          name="round"
          checked
          onChange={() => setShapeRound(!shapeRound)}
        />
        <label for="round"> Round</label>
        <br />
        <input
          type="checkbox"
          id="oval"
          name="oval"
          checked
          onChange={() => setShapeOval(!shapeOval)}
        />
        <label for="oval"> Oval</label>
        <br />
        <input
          type="checkbox"
          id="rectangle"
          name="rectangle"
          checked
          onChange={() => setShapeRectangle(!shapeRectangle)}
        />
        <label for="rectangle"> Rectangle</label>
        <br />
        <input
          type="checkbox"
          id="aviator"
          name="aviator"
          checked
          onChange={() => setShapeAvaitor(!shapeAvaitor)}
        />
        <label for="aviator"> Avaitor</label>
        <br />
      </div>

      <br />

      <div>
        <select
          value={colorFilter}
          onChange={(event) => setColorFilter(event.target.value)}
        >
          <option value={null}>None</option>
          <option value={"Black"}>Black</option>
          <option value={"Brown"}>Brown</option>
          <option value={"Red"}>Red</option>
          <option value={"Blue"}>Blue</option>
          <option value={"Green"}>Green</option>
          <option value={"Yellow"}>Yellow</option>
          <option value={"White"}>White</option>
        </select>
      </div>
    </div>
  );
}

export default UploadFilters;
