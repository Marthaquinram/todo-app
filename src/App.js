import { useState } from 'react';
import './App.css';

//Components
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';


function App() {
  //first time this runs the state will be set to nothing/empty
  const [task, setTask] = useState([]);

  const addATask = (task) => {
    //this is taking the previous state and passing it, updating it with the new state
    setTask(prevState => [...prevState, task]);
  }
  return (
    <div className="container">
      <header>
        <h1> My Todo List</h1>
      </header>
      <TodoForm addTask={addATask} />
      {task && <TodoList tasks={task} />}
    </div>
  );
}

export default App;
