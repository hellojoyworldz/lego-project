import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const getProduct = async () => {
    // let url = "http://localhost:3004/products";
    let url =
      "https://gist.githubusercontent.com/legobitna/24cf11ae95d53c9cdcdc7b0040f059e9/raw/e55a200f0461fb1ba866a9fc86332b27e234d5a0/db.json";
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data.products);
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
