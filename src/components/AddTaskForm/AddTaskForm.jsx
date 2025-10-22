import Field from "../Field/Field.jsx"
import Button from "../Button/Button.jsx"
import {useContext, useState} from "react"
import {TasksContext} from "../../context/TasksContext.jsx"

const AddTaskForm = (props) => {
  const {
    styles,
  } = props

  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  const [error, setError] = useState('')


  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit =(event) => {
    event.preventDefault()

    if(!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle)
    }

 }

 const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'Задача не может быть пустой' : '')
 }


 return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label='Новая задача'
        id='new-task'
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button
        type='submit'
        isDisabled={isNewTaskTitleEmpty}
      >
        Добавить
      </Button>
    </form>
  )
}

export default AddTaskForm