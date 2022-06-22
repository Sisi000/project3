import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from "react-bootstrap";
import Images from "../../assets/tryon2.jpg"

function TryOn() {
  return (
    <Container fluid style={{ padding: "0" }} className="py-5 my-5">
      
      <Card>
        <Card.Img src={Images} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Body className='position-absolute bottom-0 end-10 mx-5 mb-5 pb-5 px-5'>
            <a className="btn btn-warning btn-lg mx-5 px-5" href="/upload" role="button"><h1>VIRTUAL ASSISTANT</h1></a>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>


    </Container>
  );
}

export default TryOn;


