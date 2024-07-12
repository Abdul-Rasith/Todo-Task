import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("both");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now(), editing: false }]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos =
    filter === "both" ? todos : todos.filter((todo) => todo.status === filter);

  return (
    <div className="App">
      <h1>My Todo</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filter">
        <label>Status Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="both">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <TodoList
        todos={filteredTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
