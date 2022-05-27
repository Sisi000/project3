import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import Images from "../images/m.png"
import Image1 from "../images/w.png"
import Image2 from "../images/m.png"
import Image3 from "../images/w.png"
import "./About.css";

function About() {
  return (
    <div className="aboutStyles">
      <Container fluid>
        <Row>
          <Col className="py-5 my-5 text-center">
            <h2>Mandate</h2>
            <p>
              Some text here
            </p>
          </Col>
          <Col className="py-5 my-5 text-center">
            <h2>Mission</h2>
            <p>
              Some text here
            </p>
          </Col>
          <Col className="py-5 my-5 text-center">
            <h2>Values</h2>
            <p>
            Some text here
            </p>
          </Col>
        </Row>
        <Row className="py-5 my-2">
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" class="rounded-circle" src={Images} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Adrian Chin</Card.Title>
                  <Card.Text>Full-stack web developer
                  </Card.Text>
                  <a href="https://github.com/Adrianchin" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2 text-center' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" class="rounded-circle" src={Image1} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Sanja Ivansic</Card.Title>
                  <Card.Text>
                  Full-stack web developer
                  </Card.Text>
                  <a href="https://github.com/Sisi000" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-3' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" class="rounded-circle" src={Image2} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Abdul Mustafayev</Card.Title>
                  <Card.Text>
                  Full-stack web developer
                  </Card.Text>
                  <a href="https://github.com/Abdulino1" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2' icon={faGithub} size="2x"  /></Button> </a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" class="rounded-circle" src={Image3} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Yulia Sinko</Card.Title>
                  <Card.Text>
                  Full-stack web developer
                  </Card.Text>
                  <a href="https://github.com/bnurmos" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none'  variant="primary"><FontAwesomeIcon className='px-2 mx-2' icon={faGithub} size="2x"  /></Button> </a>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;