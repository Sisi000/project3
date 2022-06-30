import React from 'react'

function Shape(props) {

    const shapeAvaitor = props.shapeAvaitor
    const setShapeAvaitor = props.setShapeAvaitor
    const shapeSquare = props.shapeSquare
    const setShapeSquare = props.setShapeSquare
    const shapeRectangle = props.shapeRectangle
    const setShapeRectangle = props.setShapeRectangle
    const shapeOval = props.shapeOval
    const setShapeOval = props.setShapeOval
    const shapeRound = props.shapeRound
    const setShapeRound = props.setShapeRound

  return (
    <div>
        <p>Exclude Shapes</p>
        <input
          type="checkbox"
          id="square"
          name="square"
          onChange={() => setShapeSquare(!shapeSquare)}
        />
        <label for="square"> Square</label>
        <br />
        <input
          type="checkbox"
          id="round"
          name="round"
          onChange={() => setShapeRound(!shapeRound)}
        />
        <label for="round"> Round</label>
        <br />
        <input
          type="checkbox"
          id="oval"
          name="oval"
          onChange={() => setShapeOval(!shapeOval)}
        />
        <label for="oval"> Oval</label>
        <br />
        <input
          type="checkbox"
          id="rectangle"
          name="rectangle"
          onChange={() => setShapeRectangle(!shapeRectangle)}
        />
        <label for="rectangle"> Rectangle</label>
        <br />
        <input
          type="checkbox"
          id="aviator"
          name="aviator"
          onChange={() => setShapeAvaitor(!shapeAvaitor)}
        />
        <label for="aviator"> Avaitor</label>
        <br />
      </div>
  )
}

export default Shape