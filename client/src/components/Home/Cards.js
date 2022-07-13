import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import Images from "../images/aviator.png"
import Image1 from "../images/round.png"
import Image2 from "../images/rectangle.png"
import Image3 from "../images/oval.png"
import Image4 from "../images/other.png"


function Cards() {
    return (
        <Container fluid className="py-4 mb-4">
                <Row className="py-4 my-4">
                    <Col>
                        <div className="d-flex justify-content-around">
                            <Card className="bg-info text-dark bg-opacity-10" style={{ width: "18rem" }}>
                                <Card.Img variant="top" className="mx-3 mb-2 mt-4" src={Images} style={{ width: "16rem" }}/>
                                <Card.Body className='text-center mb-5'>
                                    <a href="http://localhost:3006/search?category=Aviator" target="_blank" rel="noreferrer">
                                        <Button type='button' className='shadow-none pt-2'><h4>AVIATOR</h4></Button></a>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-around">
                            <Card className="bg-info text-dark bg-opacity-10" style={{ width: "18rem" }}>
                                <Card.Img variant="top" className="mx-3 mb-2 mt-4" src={Image1} style={{ width: "17.4rem" }}/>
                                <Card.Body className='text-center mb-5'>
                                    <a href="http://localhost:3006/search?category=Round">
                                        <Button type='button' className='shadow-none mt-4 pt-2'><h4>ROUND</h4></Button></a>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-around">
                            <Card className="bg-info text-dark bg-opacity-10" style={{ width: "18rem" }}>
                                <Card.Img variant="top" className="mx-3 mt-4 pt-3 mb-3" src={Image2} style={{ width: "16.5rem" }}/>
                                <Card.Body className='text-center mb-5'>
                                    <a href="http://localhost:3006/search?category=Rectangle">
                                        <Button type='button' className='shadow-none pt-2'><h4>RECTANGLE</h4></Button> </a>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-around">
                            <Card className="bg-info text-dark bg-opacity-10" style={{ width: "18rem"}}>
                                <Card.Img variant="top" className="mx-3 mb-2 mt-4" src={Image3} style={{ width: "16rem" }}/>
                                <Card.Body className='text-center mb-5'>
                                    <a href="http://localhost:3006/search?category=Oval">
                                        <Button type='button' className='shadow-none px-4 pt-2'><h4>OVAL</h4></Button> </a>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-around">
                            <Card className="bg-info text-dark bg-opacity-10" style={{ width: "18rem"}}>
                                <Card.Img variant="top" className="mx-3 mb-2 mt-4" src={Image4} style={{ width: "16.1rem" }}/>
                                <Card.Body className='text-center mb-5'>
                                    <a href="http://localhost:3006/search?category=Other">
                                        <Button type='button' className='shadow-none px-4 pt-2'><h4>OTHER</h4></Button> </a>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
        </Container>

    );
}

export default Cards;




