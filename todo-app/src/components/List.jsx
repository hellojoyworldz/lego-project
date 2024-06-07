import { useState, useMemo } from "react";
import "./List.css";
import TodoItem from "./TodoItem.jsx";

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

  const getAnalyzedData = () => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    return getAnalyzedData();
  }, [todos]);

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className={"List"}>
      <h4>Todo List🌱 </h4>
      <div>
        <p>total: {totalCount}</p>
        <p>done: {doneCount}</p>
        <p>notDone: {notDoneCount}</p>
      </div>
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
