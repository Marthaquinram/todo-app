// import { useState } from 'react';
import './main.scss';
import React from 'react';

//Components
// import Form from './components/todo/form';
// import List from './components/todo/list';
// import  LoginContext  from './context/auth/context';



function App() {
  //first time this runs the state will be set to nothing/empty
  // const [task, setTask] = useState([]);

  // const addATask = (task) => {
  //   //adding it to state
  //   //this is taking the previous state and passing it, updating it with the new state
  //   setTask(prevState => [...prevState, task]);
  // }
  return (
    // <LoginContext>

    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      {/* <Form addTask={addATask} /> */}
      {/* displaying it on the page */}
      {/* {task && < List tasks={task} />} */}
    </div>
    // </LoginContext>
  );
}

export default App;
