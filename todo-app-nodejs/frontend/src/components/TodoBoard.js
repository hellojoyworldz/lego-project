import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, taskUpdate, taskDelete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList?.data?.length > 0 ? (
        todoList?.data?.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            taskUpdate={taskUpdate}
            taskDelete={taskDelete}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
