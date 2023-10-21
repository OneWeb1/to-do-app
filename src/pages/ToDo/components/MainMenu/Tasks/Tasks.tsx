import {FC, useState} from 'react'

import Task from './Task/Task'
import ModalRenameTask from '../../../modals/ModalRenameTask/ModalRenameTask'

import { ITasksProps } from '../../../interfaces'

import styles from './Tasks.module.scss'


const Tasks: FC<ITasksProps> = ({tasks, initialTasks, setInitialTasks, setTasks, setCompletedTaskCount}) => {
  const [visibleRenameModal, setVisibleRenameModal] = useState<boolean>(false)
  const [renameId, setRenameId] = useState<number>(-1)

  localStorage.setItem('tasks', JSON.stringify(initialTasks))
  return (
    <>
      <div className={styles.tasksWrapper}>
        {tasks.length ? tasks.map(task => <Task key={task.id} task={task} initialTasks={tasks} setInitialTasks={setInitialTasks} setTasks={setTasks} visibleRenameModal={visibleRenameModal} setVisibleRenameModal={setVisibleRenameModal} setRenameId={setRenameId} setCompletedTaskCount={setCompletedTaskCount}/>) : <div className={styles.listEmpty}>Tasks not found</div>}
      </div>
      {visibleRenameModal ? <ModalRenameTask tasks={tasks} setInitialTasks={setInitialTasks} setTasks={setTasks} visibleRenameModal={visibleRenameModal} setVisibleRenameModal={setVisibleRenameModal} id={renameId}/> : ''}
    </>
  )
}

export default Tasks