const express = require('express');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const User = require("../db/models/userModel.js");
const Prescription = require('../db/models/prescriptionModel.js');
const { isAuth, isAdmin, generateToken } = require('../utils.js');

const prescriptionRouter = express.Router();


prescriptionRouter.get(
    "/",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const prescriptions = await Prescription.find().populate("user");
        res.send(prescriptions);
    })
);

prescriptionRouter.get(
    "/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const prescription = await Prescription.findById(req.params.id);
        if (prescription) {
            res.send(prescription);
        } else {
            res.status(404).send({ message: "Prescription Not Found" });
        }
    })
);

prescriptionRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {

        const newPrescription = new Prescription({
            SphereR: req.body.SphereR,
            CylinderR: req.body.CylinderR,
            AxisR: req.body.AxisR,
            ADDR: req.body.ADDR,
            SphereL: req.body.SphereL,
            CylinderL: req.body.CylinderL,
            AxisL: req.body.AxisL,
            ADDL: req.body.ADDL,
            RPD: req.body.RPD,
            LPD: req.body.LPD,
            user: req.user._id,
        });
        const prescription = await newPrescription.save();
        res.status(201).send({ message: "New Prescription Created", prescription });
    })
);

  prescriptionRouter.put(
    '/prescription',
    isAuth,
    expressAsyncHandler(async (req, res) => {

      const prescription = await Prescription.findOne({ UserId: req.user._id });

      if (prescription) {

        prescription.SphereR=req.body.SphereR || prescription.SphereR;
        prescription.CylinderR=req.body.CylinderR || prescription.CylinderR;
        prescription.AxisR=req.body.AxisR || prescription.AxisR;
        prescription.ADDR=req.body.ADDR || prescription.ADDR;
        prescription.SphereL=req.body.SphereL || prescription.SphereL;
        prescription.CylinderL=req.body.CylinderL || prescription.CylinderL;
        prescription.AxisL=req.body.AxisL || prescription.AxisL;
        prescription.ADDL=req.body.ADDL || prescription.ADDL;
        prescription.RPD=req.body.RPD || prescription.RPD;
        prescription.LPD=req.body.LPD || prescription.LPD;


        const updatedPrescription = await prescription.save();
        res.status(200).send(updatedPrescription);
      } else {
        const prescription = new Prescription(req.body);
        prescription.user = req.user._id;
        const createdPrescription = await prescription.save();
        res.status(201).send(createdPrescription);
      }
    })
  );

module.exports = prescriptionRouter;