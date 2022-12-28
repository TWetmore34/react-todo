import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { getTodos, addTodo, removeTodo, updateTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
        edit: true
      };

      addTodo(newTodo).then((todo) => {
        this.setState({
          todos: [...this.state.todos, todo],
          inputText: "",
        });
      });
    }
  };

  handleDelete = (id, e) => {
    e.stopPropagation()
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  onEditRequest = (id, e) => {
    e.stopPropagation()
    let updatedTodos = this.state.todos.map(entry => {
      if(entry.id === id) {
        entry.edit = !entry.edit
      }
      return entry
    })
    this.setState({
      todos: updatedTodos,
      inputText: ""
    })
  }

  onEdit = (id, e) => {
    let updatedTodo;
    console.log(id)
    let title = document.querySelector(`.input__${id}`).value
    for(let i = 0; i < this.state.todos.length; i++) {
      updatedTodo = {...this.state.todos[i], edit: true}
      updatedTodo.title = title
    }
    updateTodo(updatedTodo, id).then(res => res.json()).then(data => {
      let newState = this.state.todos.map(entry => {
        if(entry.id === data.id) {
          entry = data
        }
        return entry
      })
      this.setState({
        todos: newState,
        inputText: "",
      })
    })
  }

  onComplete = (id) => {
    let completedTodo;
    for(let i = 0; i < this.state.todos.length; i++) {
      if(this.state.todos[i].id === id) {
        completedTodo = this.state.todos[i]
        completedTodo.completed = !completedTodo.completed
      }
    }
    if(!completedTodo) {
      throw new Error("Todo Not Found!")
    }
    updateTodo(completedTodo, id).then(res => res.json()).then(data => {
      let updatedTodos = this.state.todos.map(entry => {
            if(entry.id === data.id) {
              entry.completed = data.completed
            }
            return entry
          })
          this.setState({
            todos: updatedTodos,
            inputText: ""
          })
    })
  }

  render() {
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          {this.state.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={this.onEdit} onEditRequest={this.onEditRequest} onComplete={this.onComplete} onDelete={this.handleDelete} />
          ))}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getTodos().then((data) => {
      console.log(data);
      this.setState({
        todos: data,
      });
    });
  }
}

export default TodoList;
