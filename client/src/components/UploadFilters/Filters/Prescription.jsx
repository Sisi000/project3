import React from 'react'

function Prescription(props) {
    const setPrescription=props.setPrescription
    const prescription = props.prescription
  return (
    <div>
        <p>Prescription (Dioptre)</p>
        <input
          type="number"
          min={0}
          max={10}
          id="prescription"
          name="prescription"
          value={prescription}
          onChange={(event) => setPrescription(event.target.value)}
        />
        <label for="MinPrice"> - dpt </label>
    </div>
  )
}

export default Prescription