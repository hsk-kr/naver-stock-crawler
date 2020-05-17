import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">NSC</Navbar.Brand>
      <Navbar.Toggle aria-controls="header" />
      <Navbar.Collapse id="header">
        <Nav className="mr-auto">
          <Nav.Link href="/crawler">Crawler</Nav.Link>
          <Nav.Link href="#b">History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
