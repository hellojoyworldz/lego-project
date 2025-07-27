import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { ENDPOINTS } from "../const/endpoints";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../utils/routes";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name) throw new Error("Name 입력해주세요.");
      if (!email) throw new Error("Email address 입력해주세요.");
      if (!password) throw new Error("Password 입력해주세요.");
      if (!rePassword) throw new Error("re-enter the password 입력해주세요.");
      if (password !== rePassword)
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");

      const response = await api.post(ENDPOINTS.USER, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        navigate(PAGES.LOGIN);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="display-center">
      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
