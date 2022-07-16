import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import Images from "../images/developers/Adrian_Chin.jpg"
import Image1 from "../images/developers/Sanja_Ivansic.jpg"
import Image3 from "../images/developers/Yulia.jpg"
import "./About.css";

function About() {
  return (
    <div className="aboutStyles">
      <Container fluid>
        <Row>
          <Col className="py-5 my-5 text-center">
            <h2>Mandate</h2>
            <p>
              Using AI and ML to revolutionize the Ecommerce experience.
            </p>
            <h2>Mission</h2>
            <p>
              Provide an interactive Ecommerce experience with a virtual optician for eyeglass recommendations from the comfort of your house.
            </p>
          </Col>
          <Col className="py-5 my-5 text-center">
            <h2>Values</h2>
            <p>
              Take Ownership - Be responsabile for your work and take action.
              <br/>
              <br/>
              Be Curious - Always ask questions. Understand before you impliment.
              <br/>
              <br/>
              Deliver Results - We get the job done. Actions speak louder than words. 
            </p>
          </Col>
        </Row>
        <Row className="py-5 my-2">
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "25rem"}}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "15rem"}} src={Images} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Adrian Chin</Card.Title>
                  <Card.Text>
                    Full Stack Developer
                    <br/>
                    <br/>
                    Interests:
                    <br/>
                    AI and ML
                    <br/>
                    DevOps
                    <br/>
                    Algorithms
                  </Card.Text>
                  <a href="https://github.com/Adrianchin" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2 text-center' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "25rem" }}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "15rem"}} src={Image1} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Sanja Ivansic</Card.Title>
                  <Card.Text>
                  Full Stack Developer
                  <br/>
                  <br/>
                  Interests:
                    <br/>
                    Solving Difficult Business Problems
                    <br/>
                    Pushing Efficient and Practical Code
                    <br/>
                    "I simply love everything about coding!"
                  </Card.Text>
                  <a href="https://github.com/Sisi000" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-3' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-around">
              <Card style={{ width: "25rem" }}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "15rem"}} src={Image3} />
                <Card.Body className='text-center'>
                  <Card.Title className='bold'>Yulia Sinko</Card.Title>
                  <Card.Text>
                  Full Stack Developer
                  <br/>
                  <br/>
                  Interests:
                    <br/>
                    UI/UX
                    <br/>
                    Information Architecture
                    <br/>
                    System Design
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