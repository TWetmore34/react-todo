import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {
  render() {
    const { id, title, completed, edit } = this.props.todo;
    const { onDelete, onComplete, onEditRequest, onEdit } = this.props;
    return (
      <li data-completed={completed} onDoubleClick={(e) => {onComplete(id, e)}} className="todoitem">
        {!edit ? 
        <>
        <input type="text" className={`input__${id}`} defaultValue={title}></input>
        <button onClick={(e) => {onEdit(id, e)}} className="btn btn--edit">Submit Edit</button>
        </>
        : 
        <>
        <span className="todo__text">{title}</span>
        <button className="btn btn--edit" onClick={(e) => onEditRequest(id, e)}>Edit</button>
        <button className="btn btn--delete" onClick={(e) => onDelete(id, e)}>
          delete
        </button>
        </>
      }
      </li>
    );
  }
}
// id, title, completed, delete button

export default TodoItem;
