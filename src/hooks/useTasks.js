import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import tasksAPI from "../api/tasksAPI.js";

const useTasks = () => {


  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle ] = useState('')
  const [searchQuery, setSearchQuery  ] = useState('')

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure?')

    if(isConfirmed){
      tasksAPI.deleteAll(tasks)
        .then(() => setTasks([]))
    }

  },[tasks])

  const deleteTask = useCallback((taskId) => {

    tasksAPI.delete(taskId)
      .then((response) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
      })
  },[tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone)
      .then((response) => {
        setTasks(
          tasks.map((task) => {
            if(task.id === taskId){
              return { ...task, isDone}
            }
            return task
          })
        )
      })
  },[tasks])

  const addTask = useCallback((title) => {

    const newTask ={
      title,
      isDone: false,
    }

    tasksAPI.add(newTask)
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask])
        setNewTaskTitle('')
        setSearchQuery('')
        newTaskInputRef.current.focus()
      })
  },[])


  useEffect(() => {
    newTaskInputRef.current.focus()

    tasksAPI.getALL().then(setTasks)
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter((task) => task.title.toLowerCase().includes(searchQuery))
      : null
  },[searchQuery,tasks])

  return (
    {
      tasks,
      filteredTasks,
      deleteAllTasks,
      deleteTask,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
    }
  )
}

export default useTasks
