const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema(
  {
    SphereR: { type: Number, required: true },
    CylinderR: { type: Number, required: true },
    AxisR: { type: Number, required: true },
    ADDR: { type: Number, required: true },
    SphereL: { type: Number, required: true },
    CylinderL: { type: Number, required: true },
    AxisL: { type: Number, required: true },
    ADDL: { type: Number, required: true },
    RPD: { type: Number, required: true },
    LPD: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  }
);


const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;
