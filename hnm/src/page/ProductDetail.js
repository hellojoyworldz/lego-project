import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

const ProductDetail = ({ setKeyword }) => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    // let url = `http://localhost:3004/products/${id}`;
    let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products/${id}`;
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
    setKeyword("");
  }, []);

  return (
    <div className="card-detail">
      <Container>
        <Row>
          <Col lg={6} md={12}>
            <div class="thumb">
              <img src={product?.img} widt={636} height={954} alt="" />
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="m-2 display-6 ">{product?.title}</div>
            <div className="price m-2">
              ₩{product?.price.toLocaleString("ko-KR")}
            </div>
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
