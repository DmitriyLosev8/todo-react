import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
  const {
  tasks = [],
  } = props


  const hasTasks = true

 if(!hasTasks){
   return <div className="todo__empty-message"></div>
 }

 return (
   <ul className="todo__list">
     {tasks.map((task) => (
       <TodoItem
         className='todo-item'
         key={task.id}
         {...task}
       />
     ))}
   </ul>
 )
}

export default TodoList