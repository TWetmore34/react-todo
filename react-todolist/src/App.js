import "./App.css";
import Layout from "./component/Layout/Layout";
import TodoList from "./component/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <Layout>
        <TodoList />
      </Layout>
    </div>
  );
}

export default App;
