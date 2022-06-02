
import React  from 'react';
import { Container, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';
import "./Navbar.css";

export default function NavBar() {
  return (
   <> 

<Navbar className="navbar" expand="lg">
  <Container fluid>
    <Navbar.Brand className="mx-5" href="#home">
    <img className="logo" src={logo} alt="" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto mx-auto my-2 my-lg-0">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/upload">Upload</Nav.Link>
        </Nav>
        <Nav className='mx-5'>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <Nav.Link href="/singin">Sign In</Nav.Link>
        </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
  )
}
