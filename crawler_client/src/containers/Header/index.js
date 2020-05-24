import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">NSC</Navbar.Brand>
      <Navbar.Toggle aria-controls="header" />
      <Navbar.Collapse id="header">
        <Nav className="mr-auto nav">
          <NavLink
            to="/crawler"
            className="nav-item"
            activeClassName="selected"
          >
            Cralwer
          </NavLink>
          <NavLink
            to="/history/1"
            className="nav-item"
            activeClassName="selected"
          >
            History
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
