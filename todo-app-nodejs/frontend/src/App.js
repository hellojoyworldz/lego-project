import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { requestApi } from "./utils";
import { ENDPOINTS } from "./const/endpoints";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [error, setError] = useState("");

  const getTasks = async () => {
    requestApi({
      requestURI: ENDPOINTS.TASKS,
      requestType: "get",
      onSuccess: (response) => {
        setTodoList(response.data);
      },
    });
  };

  const addTask = () => {
    if (todoValue.trim() === "") {
      setError("빈칸은 입력할 수 없습니다.");

      return;
    }

    requestApi({
      requestURI: ENDPOINTS.TASKS,
      requestType: "post",
      requestBody: {
        task: todoValue,
        isComplete: false,
      },
      onSuccess: () => {
        setTodoValue("");
        getTasks();
      },
    });
  };

  const taskUpdate = ({ id, isComplete }) => {
    requestApi({
      requestURI: `${ENDPOINTS.TASKS}/${id}`,
      requestType: "put",
      requestBody: {
        isComplete: !isComplete,
      },
      onSuccess: () => {
        getTasks();
      },
    });
  };

  const taskDelete = (id) => {
    requestApi({
      requestURI: `${ENDPOINTS.TASKS}/${id}`,
      requestType: "delete",
      onSuccess: () => {
        getTasks();
      },
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => {
              setTodoValue(e.target.value);
              setError("");
            }}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
        {error && <p style={{ color: "red", opacity: 0.6 }}>{error}</p>}
      </Row>

      <TodoBoard
        todoList={todoList}
        taskUpdate={taskUpdate}
        taskDelete={taskDelete}
      />
    </Container>
  );
}

export default App;
