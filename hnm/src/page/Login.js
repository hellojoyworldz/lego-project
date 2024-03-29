import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Login = ({ setAuthenticate, setCate, setKeyword }) => {
  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    setAuthenticate(true);
    setCate("All");
    setKeyword("");
    navigate("/");
  };

  useEffect(() => {
    setCate("");
    setKeyword("");
  }, []);

  return (
    <Container>
      <Form onSubmit={(e) => loginUser(e)}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit" variant="danger">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
