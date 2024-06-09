import { memo, useContext } from "react";
import "./TodoItem.css";
import { TodoDispatchContext } from "../App.jsx";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteteButton = () => {
    onDelete(id);
  };
  return (
    <div className={"TodoItem"}>
      <input type={"checkbox"} checked={isDone} onChange={onChangeCheckbox} />
      <div className={"content"}>{content}</div>

      <div className={"date"}>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteteButton}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
