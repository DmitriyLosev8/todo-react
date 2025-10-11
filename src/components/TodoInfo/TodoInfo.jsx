import {memo, useContext, useMemo} from "react"
import { TasksContext} from "../../context/TasksContext.jsx"

const TodoInfo = (props) => {
  const {
    styles,
  } = props

  const {
      tasks,
      deleteAllTasks,
    } = useContext(TasksContext)

  const total = tasks.length
  const hasTasks =  total > 0

  const done = useMemo(() => {
    return tasks.filter((task) => task.isDone).length
  },[tasks])

  return  (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Выполнено {done} из {total}
      </div>

      {hasTasks &&
        (
          <button
            className={styles.DeleteAllButton}
            type="button"
            onClick={deleteAllTasks}
          >
            Delete all
          </button>
        )
      }
    </div>
  )
}

export default memo(TodoInfo)