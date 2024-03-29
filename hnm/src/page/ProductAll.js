import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const getProduct = async () => {
    // let url = "http://localhost:3004/products";
    let url =
      "https://my-json-server.typicode.com/hellojoyworldz/lego-project/products";
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Container>
        <div className="mb-4">Total: {productList.length}</div>
        <Row>
          {productList.map((menu, idx) => (
            <Col lg={3} md={6} sm={12} key={idx} className="mb-4">
              <ProductCard item={menu} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
