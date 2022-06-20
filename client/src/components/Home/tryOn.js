import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card } from "react-bootstrap";
import Images from "../../assets/tryon.jpg"

function TryOn() {
  return (
    <Container fluid>

      <Card className="text-bold px-0">
        <Card.Img src={Images} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Body className='text-center'>
            <Card.Title className='bold'>VIRTUAL TRY-ON</Card.Title>
            <Card.Text className="bg-info">We have a huge range of products which are available to virtually try on from the comfort of your own home.
              Simply select one of the amazing products found in these Virtual Try On collections, click the virtual try on
              button and enable your camera. Finding the perfect frame has never been so easy!
            </Card.Text>

            <a className="btn btn-primary" href="/upload" role="button">TRY ON NOW</a>

          </Card.Body>
        </Card.ImgOverlay>
      </Card>

    </Container>
  );
}

export default TryOn;


