import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";

const ProductAll = ({ cate }) => {
  const [productList, setProductList] = useState(null);
  const [query, setQuery] = useSearchParams();

  const getProduct = async () => {
    let searchQuery = query.get("q") || "";
    // let url = "http://localhost:3004/products";
    let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    let datadataList = [];

    data.map((v) => {
      if (cate === "New" && v.new === true) datadataList.push(v);
      else if (cate === "Conscious choice" && v.choice === true)
        datadataList.push(v);
      else if (cate === "All") datadataList.push(v);
    });

    setProductList(datadataList);
  };
  useEffect(() => {
    getProduct();
  }, [query, cate]);

  return (
    <div>
      <Container>
        <div className="mb-4">Total: {productList?.length}</div>
        <Row>
          {productList &&
            productList.map((menu, idx) => (
              <Col lg={3} md={6} sm={12} key={idx} className="mb-4">
                <ProductCard item={menu} />
              </Col>
            ))}

          {productList?.length === 0 && (
            <Col className="text-center">검색한 상품이 없습니다</Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
