import { memo, useContext} from "react"
import TodoItem from "../TodoItem/TodoItem.jsx";
import { TasksContext} from "../../context/TasksContext.jsx"

const TodoList = (props) => {
  const {
    styles,
  } = props

  const {
    tasks,
    filteredTasks,
  } = useContext(TasksContext)


  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

 if(!hasTasks){
   return <div className={styles.emptyMessage}>The are no tasks yet</div>
 }

 if(hasTasks && isEmptyFilteredTasks){
   return <div className={styles.emptyMessage}>Tasks not found</div>
 }

 return (
   <ul className={styles.list}>
     {(filteredTasks ?? tasks).map((task) => (
       <TodoItem
         className={styles.item}
         key={task.id}
         {...task}
       />
     ))}
   </ul>
 )
}

export default memo(TodoList)