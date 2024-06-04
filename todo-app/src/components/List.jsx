import "./List.css";

import TodoItem from "./TodoItem.jsx";
import { useState } from "react";
const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    return search === ""
      ? todos
      : todos.filter((todo) =>
          todo.content.toLowerCase().includes(search.toLowerCase()),
        );
  };

  const filteredTodos = getFilteredData();

  return (
    <div className={"List"}>
      <h4>Todo List🌱 </h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder={"검색어를 입력하세요"}
      />
      <div className={"todos_wrapper"}></div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default List;
