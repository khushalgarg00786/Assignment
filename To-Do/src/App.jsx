import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() { 

  // State to hold the current value of the task input
  const [todo, setTodo] = useState("")

  // State to hold the list of tasks
  const [todos, setTodos] = useState([])

  // useEffect to load the tasks from local storage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos") // Get the stringified tasks from local storage
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos")) // Parse the stringified tasks to an array
      setTodos(todos) // Set the tasks to the state
    }
  }, []) // Empty dependency array ensures this runs only once when the component mounts

  // Function to save the tasks to local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos)) // Stringify and save the tasks to local storage
  }

  // Function to handle editing a task
  const handleEdit = (e, id) => { 
    let t = todos.filter(i => i.id === id) // Find the task to edit
    setTodo(t[0].todo) // Set the task's value to the input field
    let newTodos = todos.filter(item => {
      return item.id !== id // Filter out the task being edited from the list
    }); 
    setTodos(newTodos) // Update the tasks state with the filtered list
    saveToLS() // Save the updated tasks to local storage
  }

  // Function to handle deleting a task
  const handleDelete = (e, id) => {  
    let newTodos = todos.filter(item => {
      return item.id !== id // Filter out the task to be deleted from the list
    }); 
    setTodos(newTodos) // Update the tasks state with the filtered list
    saveToLS() // Save the updated tasks to local storage
  }

  // Function to handle adding a new task
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]) // Add the new task to the tasks list
    setTodo("") // Clear the input field
    saveToLS() // Save the updated tasks to local storage
  }

  // Function to handle input field changes
  const handleChange = (e) => { 
    setTodo(e.target.value) // Update the state with the new input value
  }

  // Function to handle marking a task as completed or not completed
  const handleCheckbox = (e) => { 
    let id = e.target.name; // Get the ID of the task being checked/unchecked
    let index = todos.findIndex(item => {
      return item.id === id; // Find the index of the task in the tasks array
    }) 
    let newTodos = [...todos]; // Create a copy of the tasks array
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the completion status of the task
    setTodos(newTodos) // Update the tasks state with the modified list
    saveToLS() // Save the updated tasks to local storage
  }

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <div className='bg-indigo-50 h-screen'>
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-purple-200 min-h-[80vh] md:w-[35%]">
          <h1 className='font-bold text-center text-3xl'>Manage & Organize Your Tasks</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='text-2xl font-bold'>Add a Todo</h2>
            <div className="flex">
              <input 
                onChange={handleChange} 
                value={todo} 
                type="text" 
                placeholder='Type Task (Minimum 4 characters)' 
                className='w-full rounded-full px-5 py-1' 
              />
              <button 
                onClick={handleAdd} 
                disabled={todo.length <= 3} 
                className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
              >
                Save
              </button>
            </div>
          </div>
          <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item => {
              return (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className='flex gap-5'>
                    <input 
                      name={item.id} 
                      onChange={handleCheckbox} 
                      type="checkbox" 
                      checked={item.isCompleted} 
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button 
                      onClick={(e) => handleEdit(e, item.id)} 
                      className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                    >
                      Edit
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, item.id)} 
                      className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
