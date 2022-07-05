import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from "react-bootstrap";
import Images from "../assets/prescriptionimg.jpg"

function PrescriptionImg() {
  return (
      <Card className="my-3" >
        <Card.Img  src={Images} alt="Card image" />
      </Card>
  );
}

export default PrescriptionImg;


