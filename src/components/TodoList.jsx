import { memo, useContext} from "react"
import TodoItem from "./TodoItem.jsx";
import { TasksContext} from "../context/TasksContext.jsx"

const TodoList = () => {
  const {
    tasks,
    filteredTasks,
  } = useContext(TasksContext)


  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

 if(!hasTasks){
   return <div className="todo__empty-message">The are no tasks yet</div>
 }

 if(hasTasks && isEmptyFilteredTasks){
   return <div className="todo__empty-message">Tasks not found</div>
 }

 return (
   <ul className="todo__list">
     {(filteredTasks ?? tasks).map((task) => (
       <TodoItem
         className='todo-item'
         key={task.id}
         {...task}
       />
     ))}
   </ul>
 )
}

export default memo(TodoList)