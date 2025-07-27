import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ENDPOINTS } from "../const/endpoints";
import { PAGES } from "../const/routes";

const LoginPage = () => {
  const navigate = useNavigate();

  const [forms, setForms] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!forms.email) throw new Error("Email address 입력해주세요.");
      if (!forms.password) throw new Error("Password 입력해주세요.");

      const response = await api.post(`${ENDPOINTS.USER}/login`, forms);

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
        setError("");
        setUser(response.data.user);
        navigate(PAGES.TODO);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="display-center">
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={forms.email}
            onChange={(e) =>
              setForms((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={forms.password}
            onChange={(e) =>
              setForms((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
