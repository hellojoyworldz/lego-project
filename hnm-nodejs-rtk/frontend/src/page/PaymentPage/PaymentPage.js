import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import OrderReceipt from "./component/OrderReceipt";
import PaymentForm from "./component/PaymentForm";
import "./style/paymentPage.style.css";
import { cc_expires_format } from "../../utils/number";
import { createOrder, clearError } from "../../features/order/orderSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { orderNum, createOrderError } = useSelector((state) => state.order);
  const { cartList, totalPrice } = useSelector((state) => state.cart);
  const [cardValue, setCardValue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    address: "",
    city: "",
    zip: "",
  });
  const filteredCartList = cartList.filter(
    (item) => item.productId.stock[item.size] > 0
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // 오더번호를 받으면 어디로 갈까?
    if (firstLoading) {
      setFirstLoading(false);
    } else {
      if (orderNum !== "") {
        navigate("/payment/success");
      }
    }
  }, [orderNum, navigate]);

  useEffect(() => {
    if (createOrderError?.length > 0) {
      navigate("/cart");
    }
  }, [createOrderError, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, contact, address, city, zip } = shipInfo;

    // 오더 생성하기
    dispatch(
      createOrder({
        totalPrice,
        shipTo: {
          address,
          city,
          zip,
        },
        contact: {
          firstName,
          lastName,
          contact,
        },
        orderList: cartList
          .filter((item) => item.productId.stock[item.size] > 0)
          .map((item) => {
            return {
              productId: item.productId._id,
              price: item.productId.price,
              qty: item.qty,
              size: item.size,
            };
          }),
      })
    );
  };

  const handleFormChange = (event) => {
    //shipInfo에 값 넣어주기
    const { name, value } = event.target;

    if (name === "contact" && value.length > 13) {
      return;
    }
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    //카드정보 넣어주기
    const { name, value } = event.target;

    if (name === "number" && value.length > 16) {
      return;
    }

    if (name === "expiry") {
      setCardValue({ ...cardValue, expiry: cc_expires_format(value) });
      return;
    }

    if (name === "cvc" && value.length > 3) {
      return;
    }

    setCardValue({ ...cardValue, [name]: value });
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };

  // 주문할 아이템이 없다면 주문하기로 안넘어가게 막음
  if (cartList?.length === 0) {
    navigate("/cart");
  }

  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className="mb-2">배송 주소</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>성</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="lastName"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleFormChange}
                      required
                      name="firstName"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>연락처</Form.Label>
                  <Form.Control
                    placeholder="010-xxx-xxxxx"
                    onChange={handleFormChange}
                    required
                    name="contact"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>주소</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={handleFormChange}
                    required
                    name="address"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="city"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={handleFormChange}
                      required
                      name="zip"
                    />
                  </Form.Group>
                </Row>
                <div className="mobile-receipt-area">
                  <OrderReceipt
                    cartList={filteredCartList}
                    totalPrice={totalPrice}
                  />
                </div>
                <div>
                  <h2 className="payment-title">결제 정보</h2>
                </div>
                <PaymentForm
                  cardValue={cardValue}
                  handlePaymentInfoChange={handlePaymentInfoChange}
                  handleInputFocus={handleInputFocus}
                />
                <Button
                  variant="dark"
                  className="payment-button pay-button"
                  type="submit"
                >
                  결제하기
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartList={filteredCartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
