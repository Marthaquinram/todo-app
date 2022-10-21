import React, { useState } from 'react'
import TodoForm from './todoForm'
import TodoItem from './todoItem'


function TodoList({ tasks }) {
  // const [todos, setTodos] = useState([]);

  return (
    <ul>
      {/* looping the task */}
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task} />
      ))
      }

      Task List:

    </ul>
  )
}

export default TodoList
