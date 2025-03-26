import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  async function getTodos() {
    
    try {
      const todos = await service.getTasks();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    try {
      await service.addTask(newTodo);
      setNewTodo(""); // clear input
      await getTodos(); // refresh tasks list (in order to see the new one)
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  async function updateCompleted(todo, isComplete) {
    try {
      await service.setCompleted(todo.id, isComplete);
      await getTodos(); // refresh tasks list (in order to see the updated one)
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async function deleteTodo(id) {
    try {
      await service.deleteTask(id);
      await getTodos(); // refresh tasks list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;