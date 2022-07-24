import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub , faLinkedin, faGalacticRepublic} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import Image1 from "../../assets/developers/adrian.png"
import Image2 from "../../assets/developers/sanja.png"
import Image3 from "../../assets/developers/yulia.png"
import "./About.css";

function About() {
  return (
    <div className="aboutStyles" style={{marginTop: "80px"}}>
      <h1 style={{textAlign: "center"}}>About Us</h1>
      <Container fluid>
        <Row>
          <Col className="py-4 my-4 text-left" style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px", marginRight:"20px"}}>
          <div style={{padding: "10px"}}>
            <h2>Mandate</h2>
            <p>
              Using AI and ML to revolutionize the E-commerce experience.
            </p>
            <h2>Mission</h2>
            <p>
              Provide an interactive E-commerce experience with a virtual optician for eyeglass recommendations from the comfort of your house.
            </p>
            </div>
          </Col>
          <Col className="py-4 my-4 text-left" style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px"}}>
          <div style={{padding: "10px"}}>
            <h2>Values</h2>
            <p>
              Take Ownership - Be responsible for your work and take action.
              <br/>
              <br/>
              Be Curious - Always ask questions. Understand before you implement.
              <br/>
              <br/>
              Deliver Results - We get the job done. Actions speak louder than words. 
            </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-left" style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px"}}>
            <div style={{padding: "10px"}}>
            <h2>About this application</h2>
            <p>
              This full stack application was created to help customers purchase eyeglasses with the help of AI and ML.
              <br/>
              <br/>
              MongoDB, Express.js, React and Node.js are used to create this full stack application. A PayPal payment system is implemented and the application is secured with BCrypt. This application is deployed and hosted in Heroku.
              <br/>
              <br/>
              TensorFlow2 and Google Vision AI Convolutional Deep Neural Network models are used to analyze data submitted by the user. N-Dimensional Euclidean distances are calculated to classify products that suit your unique facial features. Calculations are unit tested and functional tested with coverage reports being generated.
              <br/>
            </p>
            </div>
          </Col>
        </Row>
        <Row className="py-5 my-2">
          <Col>
            <div className="d-flex justify-content-around">
            <Card style={{ width: "22rem", borderColor: "white"}}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "18rem", border: "none", marginTop: "20px"}} src={Image1} />
                <Card.Body className='text-center' style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px", boxShadow: '3px 4px 7px #C2C5CC', marginTop: "20px"}}>
                  <Card.Title className='bold' style={{fontWeight: "bold"}}>Adrian Chin</Card.Title>
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
                    <br/>
                    <br/>
                  </Card.Text>
                  <a href="https://adrian-chin.herokuapp.com/" target="_blank" rel="noreferrer">
                  <Button type='button' style={{marginRight: "1px"}} className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-1 text-center' icon={faGalacticRepublic} size="2x"  /></Button></a>
                  <a href="https://www.linkedin.com/in/adrianjchin/" target="_blank" rel="noreferrer">
                  <Button type='button' style={{marginRight: "1px"}} className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-1 text-center' icon={faLinkedin} size="2x"  /></Button></a>
                  <a href="https://github.com/Adrianchin" target="_blank" rel="noreferrer">
                  <Button type='button' style={{marginRight: "1px"}} className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-1 text-center' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
          <div className="d-flex justify-content-around">
              <Card style={{ width: "22rem", borderColor: "white"}}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "18rem", border: "none", marginTop: "20px"}} src={Image2} />
                <Card.Body className='text-center' style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px", boxShadow: '3px 4px 7px #C2C5CC', marginTop: "20px"}}>
                  <Card.Title className='bold' style={{fontWeight: "bold"}}>Sanja Ivansic</Card.Title>
                  <Card.Text>
                  Full Stack Developer
                  <br/>
                  <br/>
                  Interests:
                    <br/>
                    Solving Business Problems
                    <br/>
                    Frontend and 
                    <br/>
                    Backend Development
                    <br/>
                    <br/>
                  </Card.Text>
                  <a href="https://www.linkedin.com/in/sanja-ivansic/" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2 text-center' icon={faLinkedin} size="2x"  /></Button></a>
                  <a href="https://github.com/Sisi000" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2' icon={faGithub} size="2x"  /></Button></a>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
          <div className="d-flex justify-content-around">
          <Card style={{ width: "22rem", borderColor: "white"}}>
                <Card.Img variant="top" className="img-thumbnail mx-auto d-block" style={{ width: "fit-content", height: "18rem", border: "none", marginTop: "20px"}} src={Image3} />
                <Card.Body className='text-center' style={{border: "solid", borderWidth: "thin", borderColor: "#C2C5CC", borderRadius: "15px", boxShadow: '3px 4px 7px #C2C5CC', marginTop: "20px"}}>
                  <Card.Title className='bold' style={{fontWeight: "bold"}}>Yulia Sinko</Card.Title>
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
                    <br/>
                    <br/>
                  </Card.Text>
                  <a href="https://www.linkedin.com/in/yulia-sinko/" target="_blank" rel="noreferrer">
                  <Button type='button' className='shadow-none' variant="primary"><FontAwesomeIcon className='px-2 mx-2 text-center' icon={faLinkedin} size="2x"  /></Button></a>
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