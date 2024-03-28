import React from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

const ProductDetail = () => {
  return (
    <div className="card-detail">
      <Container>
        <Row>
          <Col>
            <img
              src="https://noona-hnm.netlify.app/pattern-jacket.jpeg"
              widt={564}
              height={846}
              alt=""
            />
          </Col>
          <Col>
            <div className="m-2 display-6 ">title</div>
            <div className="price m-2">price</div>
            <div className="choice m-2">choice</div>
            <Dropdown className="m-2">
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                Sizes
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="w-100 m-2" variant="dark">
              Add to Bag
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
