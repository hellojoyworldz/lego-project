import React from "react";
import "./AppLayout.style.css";
import Button from "react-bootstrap/Button";
import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const AppLayout = () => {
  return (
    <main>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" style={{ height: "44px" }} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="my-2 me-auto my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                variant="outline-danger"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </main>
  );
};

export default AppLayout;
