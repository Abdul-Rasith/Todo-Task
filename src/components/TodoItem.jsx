import React, { useState } from "react";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleStatusChange = (e) => {
    updateTodo({ ...todo, status: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTodo({
      ...todo,
      name: editedName,
      description: editedDescription,
      editing: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>Name: {todo.name}</h3>
          <p>Description: {todo.description}</p>
          <div>
            <label>Status: </label>
            <select value={todo.status} onChange={handleStatusChange}>
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
