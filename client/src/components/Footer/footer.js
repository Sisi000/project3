import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faLinkedinIn, faTwitter, } from '@fortawesome/free-brands-svg-icons';
import "./footer.css";


const Footer = () => {

    return (
        <Navbar id = "footer" collapseOnSelect expand="lg" variant="dark" className='fixed-bottom'>
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto mx-auto my-2 my-lg-0">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link eventKey={2} href="#home">
                            &copy; eyelovecoding 2022
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='px-2 mx-3' icon={faLinkedinIn} size="2x" /></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='px-2 mx-3' icon={faFacebookF} size="2x" /></a>
                <a href="https://www.github.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='px-2 mx-3' icon={faGithub} size="2x" /></a>
                <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className='px-2 mx-3' icon={faTwitter} size="2x" /></a>
            </Container>
        </Navbar>
    )
}

export default Footer;