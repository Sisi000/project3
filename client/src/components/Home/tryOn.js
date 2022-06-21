import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from "react-bootstrap";
import Images from "../../assets/tryon.jpg"
import Images2 from "../../assets/tryon2.jpg"
function TryOn() {
  return (
    <Container fluid style={{ padding: "0" }} className="pb-5">
      

      <Card>
     
        <Card.Img src={Images2} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Body className='position-absolute bottom-0 end-10 mx-5 mb-5 pb-5 px-5'>
            <a className="btn btn-warning btn-lg mx-5 mb-5 px-5" href="/upload" role="button"><h1>VIRTUAL TRY-ON</h1></a>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>

      <Card>
        <Card.Img src={Images} alt="Card image" />
        <Card.ImgOverlay >
          <Card.Body className='position-absolute bottom-0 end-0 mx-5 mb-5 pb-5 px-5'>
           
            <a className="btn btn-lg btn-primary mx-5 mb-5 px-5" href="/upload" role="button"><h1>VIRTUAL TRY-ON</h1></a>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>

    </Container>
  );
}

export default TryOn;


