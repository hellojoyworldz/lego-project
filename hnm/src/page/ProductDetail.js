import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    let url = `http://localhost:3004/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProduct(data);
  };

  const [selectSize, setSelectSize] = useState(null);
  const changeSize = (v) => {
    setSelectSize(v);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="card-detail">
      <Container>
        <Row>
          <Col>
            <img src={product?.img} widt={564} height={846} alt="" />
          </Col>
          <Col>
            <div className="m-2 display-6 ">{product?.title}</div>
            <div className="price m-2">{product?.price}</div>
            <div className="choice m-2">{product?.choice}</div>
            <Dropdown className="m-2">
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {selectSize ? selectSize : "Sizes"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {product?.size.map((v, idx) => (
                  <Dropdown.Item onClick={() => changeSize(v)} key={idx}>
                    {v}
                  </Dropdown.Item>
                ))}
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
