const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema(
  {
    SphereR: { type: String, required: true },
    CylinderR: { type: String, required: true },
    AxisR: { type: String, required: true },
    ADDR: { type: String, required: true },
    SphereL: { type: String, required: true },
    CylinderL: { type: String, required: true },
    AxisL: { type: String, required: true },
    ADDL: { type: String, required: true },
    RPD: { type: String, required: true },
    LPD: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  }
);


const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;
