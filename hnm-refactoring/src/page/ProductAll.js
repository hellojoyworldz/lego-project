import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/reducers/productSlice";

const ProductAll = ({ cate, setCate }) => {
  const productList = useSelector((state) => state.product.productList);
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const getProduct = () => {
    let searchQuery = query.get("q") || "";
    dispatch(fetchProducts(searchQuery));
  };
  useEffect(() => {
    getProduct();
  }, [query, cate]);

  useEffect(() => {
    if (cate === "") setCate("All");
  }, []);

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

          {!productList && productList?.length === 0 && (
            <Col className="text-center">검색한 상품이 없습니다</Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
