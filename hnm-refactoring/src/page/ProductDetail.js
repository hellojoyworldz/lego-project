import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/reducers/productSlice";

const ProductDetail = ({ setKeyword }) => {
  let { id } = useParams();
  const product = useSelector((state) => state.product.productItem);

  const dispatch = useDispatch();
  const getProductDetail = () => {
    dispatch(fetchProductDetail(id));
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
            <div className="thumb">
              <img src={product?.img} widt={636} height={954} alt="" />
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="m-2 display-6 ">{product?.title}</div>
            <div className="m-2 price">
              ₩{product?.price.toLocaleString("ko-KR")}
            </div>
            <div className="m-2 choice">{product?.choice}</div>
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
            <Button className="m-2 w-100" variant="dark">
              Add to Bag
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
