import React from 'react'

function Color(props) {

    const colorBlack= props.colorBlack
    const setColorBlack=props.setColorBlack
    const colorWhite= props.colorWhite
    const setColorWhite=props.setColorWhite
    const colorBlue=props.colorBlue
    const setColorBlue=props.setColorBlue
    const colorRed=props.colorRed
    const setColorRed=props.setColorRed
    const colorBrown=props.colorBrown
    const setColorBrown=props.setColorBrown
    const colorGreen=props.colorGreen
    const setColorGreen=props.setColorGreen
    const colorGold=props.colorGold
    const setColorGold=props.setColorGold
    const colorGrey=props.colorGrey
    const setColorGrey=props.setColorGrey


  return (
    <div>
        <p>Exclude Colors</p>
        <input
          type="checkbox"
          id="black"
          name="black"
          onChange={() => setColorBlack(!colorBlack)}
        />
        <label for="black"> Black</label>
        <br />
        <input
          type="checkbox"
          id="white"
          name="White"
          onChange={() => setColorWhite(!colorWhite)}
        />
        <label for="white"> White</label>
        <br />
        <input
          type="checkbox"
          id="blue"
          name="blue"
          onChange={() => setColorBlue(!colorBlue)}
        />
        <label for="blue"> Blue</label>
        <br />
        <input
          type="checkbox"
          id="red"
          name="red"
          onChange={() => setColorRed(!colorRed)}
        />
        <label for="red"> Red</label>
        <br />
        <input
          type="checkbox"
          id="brown"
          name="brown"
          onChange={() => setColorBrown(!colorBrown)}
        />
        <label for="brown"> Brown</label>
        <br />
        <input
          type="checkbox"
          id="green"
          name="green"
          onChange={() => setColorGreen(!colorGreen)}
        />
        <label for="green"> Green</label>
        <br />
        <input
          type="checkbox"
          id="gold"
          name="gold"
          onChange={() => setColorGold(!colorGold)}
        />
        <label for="gold"> Gold</label>
        <br />
        <input
          type="checkbox"
          id="grey"
          name="grey"
          onChange={() => setColorGrey(!colorGrey)}
        />
        <label for="grey"> Grey</label>
    </div>
  )
}

export default Color