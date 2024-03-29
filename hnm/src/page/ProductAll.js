import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getProduct = async () => {
    let searchQuery = query.get("q") || "";
    // let url = "http://localhost:3004/products";
    let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    setProductList(data);
  };
  useEffect(() => {
    getProduct();
  }, [query]);
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
