import React from 'react'

function Perscription(props) {
    const setPrescription=props.setPrescription
    const prescription = props.prescription
  return (
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
  )
}

export default Perscription