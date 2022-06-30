import React, { useState } from "react";
import Color from "./Filters/Color";
import Perscription from "./Filters/Perscription";
import Price from "./Filters/Price";
import Shape from "./Filters/Shape";
import "./UploadFilters.css"

function UploadFilters(props) {
  const setPrescription = props.setPrescription;
  const prescription = props.prescription;
  const shapeAvaitor = props.shapeAvaitor;
  const setShapeAvaitor = props.setShapeAvaitor;
  const shapeSquare = props.shapeSquare;
  const setShapeSquare = props.setShapeSquare;
  const shapeRectangle = props.shapeRectangle;
  const setShapeRectangle = props.setShapeRectangle;
  const shapeOval = props.shapeOval;
  const setShapeOval = props.setShapeOval;
  const shapeRound = props.shapeRound;
  const setShapeRound = props.setShapeRound;
  const colorBlack = props.colorBlack;
  const setColorBlack = props.setColorBlack;
  const colorWhite = props.colorWhite;
  const setColorWhite = props.setColorWhite;
  const colorBlue = props.colorBlue;
  const setColorBlue = props.setColorBlue;
  const colorRed = props.colorRed;
  const setColorRed = props.setColorRed;
  const colorBrown = props.colorBrown;
  const setColorBrown = props.setColorBrown;
  const colorGreen = props.colorGreen;
  const setColorGreen = props.setColorGreen;
  const colorGold = props.colorGold;
  const setColorGold = props.setColorGold;
  const colorGrey = props.colorGrey;
  const setColorGrey = props.setColorGrey;
  const priceMin = props.priceMin;
  const setPriceMin = props.setPriceMin;
  const priceMax = props.priceMax;
  const setPriceMax = props.setPriceMax;

  const [filterShow, setFilterShow] = useState(false);

  function changeFilterShow() {
    setFilterShow(!filterShow);
  }

  return (
    <div>
      <button className="filters" onClick={changeFilterShow}>
        Filters
      </button>
      {filterShow ? (
        <div className="filters-container">
          <br />
          <div className="filters-cols">
            <div>
              <Perscription
                prescription={prescription}
                setPrescription={setPrescription}
              />
            </div>
            <br />
            <div>
              <Price
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
              />
            </div>
          </div>

          <div className="filters-cols">
            <div>
              <Color
                colorBlack={colorBlack}
                setColorBlack={setColorBlack}
                colorWhite={colorWhite}
                setColorWhite={setColorWhite}
                colorBlue={colorBlue}
                setColorBlue={setColorBlue}
                colorRed={colorRed}
                setColorRed={setColorRed}
                colorBrown={colorBrown}
                setColorBrown={setColorBrown}
                colorGreen={colorGreen}
                setColorGreen={setColorGreen}
                colorGold={colorGold}
                setColorGold={setColorGold}
                colorGrey={colorGrey}
                setColorGrey={setColorGrey}
              />
            </div>
          </div>

          <div className="filters-cols">
            <div>
              <Shape
                shapeAvaitor={shapeAvaitor}
                setShapeAvaitor={setShapeAvaitor}
                shapeSquare={shapeSquare}
                setShapeSquare={setShapeSquare}
                shapeRectangle={shapeRectangle}
                setShapeRectangle={setShapeRectangle}
                shapeOval={shapeOval}
                setShapeOval={setShapeOval}
                shapeRound={shapeRound}
                setShapeRound={setShapeRound}
              />
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default UploadFilters;
