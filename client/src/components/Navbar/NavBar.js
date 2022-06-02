import React from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  // const [click, setClick] = useState(false);
  // const handleClick = () => setClick(!click);

  const { isAuthenticated, loginWithPopup, loginWithRedirect, logout, user } =
    useAuth0();

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
            <Nav className="mx-5">
              <li className="mx-li">
                {isAuthenticated && (
                  <p>
                    <b>{user.name}</b>
                  </p>
                )}
              </li>
              <div>
                {!isAuthenticated && (
                  <button className="btn" onClick={() => loginWithRedirect({})}>
                    Log in
                  </button>
                )}

                {isAuthenticated && (
                  <button className="btn" onClick={() => logout()}>
                    Log out
                  </button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
