const URL = "http://localhost:4000/todos";

const addTodo = (newTodo) => {
  // post
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const removeTodo = (id) => {
  return fetch(URL + `/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

const getTodos = () => {
  return fetch(URL).then((res) => res.json());
};

const getTodo = (id) => {
  return fetch(URL + `/${id}`).then((res) => res.json());

}

const updateTodo = (newTodo, id) => {
  return fetch(URL + `/${id}`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(newTodo)
  })
}

export { addTodo, removeTodo, getTodos, updateTodo, getTodo };
