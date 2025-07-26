import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, taskUpdate, taskDelete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() =>
                taskUpdate({ id: item._id, isComplete: item.isComplete })
              }
            >
              {item.isComplete ? "끝남" : "안끝남"}
            </button>
            <button
              className="button-delete"
              onClick={() => taskDelete(item._id)}
            >
              삭제
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
