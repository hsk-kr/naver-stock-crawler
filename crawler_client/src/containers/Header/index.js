import React from "react";
import classNames from "classnames/bind";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./styles.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">NSC</Navbar.Brand>
      <Navbar.Toggle aria-controls="header" />
      <Navbar.Collapse id="header">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink to="/crawler" activeClassName="selected">
              Cralwer
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/b" activeClassName="selected">
              Stocks
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
