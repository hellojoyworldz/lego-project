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
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
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
