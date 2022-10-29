// import React, { useState } from 'react'
// // import TodoForm from './todoForm'
// import TodoItem from './todoItem'

// // passing Task
// function List({ tasks }) {
//   const [todos, setTodos] = useState([]);

//   console.log('THIS IS THE TASK', tasks);
//   return (
//     <>
//       <ul>
//         Task List:
//         {/* looping the task */}
//         {/* this takes the most recent task added and keeps it at the top to be most recent */}
//         {tasks.sort((a, b) => b.id - a.id).map(task => (
//           <TodoItem
//             key={task.id}
//             task={task} />
//         ))
//         }
//       </ul>
//       <ul>
//         Total Task: {tasks.length}
//       </ul>
//     </>
//   )
// }

// export default List
