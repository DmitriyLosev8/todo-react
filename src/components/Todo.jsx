import {useState, useEffect, useRef} from "react"
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import Button from "./Button.jsx";

const Todo = () => {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      {id: 'task-1', title: 'Купить молоко', isDone: false},
      {id: 'task-2', title: 'Погладить кота', isDone: true},
    ]
  })
  const [newTaskTitle, setNewTaskTitle ] = useState('')
  const [searchQuery, setSearchQuery  ] = useState('')

  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure?')

    if(isConfirmed){
      setTasks([])
    }
  }

  const deleteTask = (taskId) => (
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  )

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === taskId){
          return { ...task, isDone}
        }

        return task

      })
    )
  }

  const addTask = () => {

    if(newTaskTitle.trim().length > 0) {
      const newTask ={
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }

    newTaskInputRef.current.focus()
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, []);


  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0
    ? tasks.filter((task) => task.title.toLowerCase().includes(searchQuery))
    : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskInputRef={newTaskInputRef}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter((task) => task.isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
      />
    </div>
  )
}

export default Todo