import React, { useState } from 'react'

//Icon library inputs
import { SquaresPlusIcon } from '@heroicons/react/24/solid';

const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    addTask({
      name: input,
      checked: false,
      id: Date.now()
    })
    //this resets the text box, once user adds task to list the submit box clears out
    setInput("")
  };

  return (
    <form className='todo' onSubmit={handleSubmit}>

      <div className="wrapper">
        <input
          type="text"
          id="task"
          className='input'
          value={input}
          //onInput fires when an element gets user input
          onInput={(e) => setInput(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter a Task" />
        <label
          htmlFor="task"
          className='label'>
          Enter a Task
        </label>
      </div>
      <button
        className='btn'
        //for accessibility it tells the user what it does, 
        aria-label="Add a Task"
        type='submit'>
        <SquaresPlusIcon />
      </button>

    </form>
  )
}

export default TodoForm;
