import { createContext,} from "react"
import useTasks from "../hooks/useTasks.js"
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll.js";


export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const {children} = props

  const {
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
    disappearingTaskId,
    appearingTaskId,
  } = useTasks()

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = useIncompleteTaskScroll(tasks)


  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

