import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFoundpage = () => {
  return (
    <Container>
      <Row
        className="text-center align-items-center"
        style={{ height: "100vh" }}>
        <Col>
          <h1>404</h1>
          <p>The page you are looking for was not found.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundpage;
