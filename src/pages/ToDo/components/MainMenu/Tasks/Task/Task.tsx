import {FC, useState} from 'react'

import { ITask } from '../../../../interfaces'

import {AiOutlineCheck} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md'

import styles from './Task.module.scss'


interface ITaskProps {
  visibleRenameModal: boolean,
  task: ITask,
  initialTasks: ITask[],

  setCompletedTaskCount: (count: number) => void
  setRenameId: (id: number) => void,
  setVisibleRenameModal: (visible: boolean) => void,
  setTasks: (newTasks:ITask[]) => void,
  setInitialTasks: (newTasks:ITask[]) => void,
}

const Task:FC<ITaskProps> = ({task, initialTasks, visibleRenameModal, setInitialTasks, setTasks, setVisibleRenameModal, setRenameId,setCompletedTaskCount}) => {
  const [completed, setCompleted] = useState<boolean>(task.isCompleted)

  const changeCompleted = ():void => {
    task.isCompleted = !completed
    setCompleted(!completed)
    setCompletedTaskCount(initialTasks.filter(item=> item.isCompleted).length)
  }

  const removeTask = ():void => {
    const newTasks:ITask[] = [...initialTasks.filter(item => item.id !== task.id)]
    let completedTaskCount:number = initialTasks.filter(item=> item.isCompleted).length
    completedTaskCount = task.isCompleted ? completedTaskCount - 1 : completedTaskCount
    setInitialTasks(newTasks)
    setTasks(newTasks)
    setCompletedTaskCount(completedTaskCount)
  }

  const showRenameModal = ():void => {
    setRenameId(task.id)
    setVisibleRenameModal(true)
  }

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.checkWrapper} onClick={changeCompleted}>
          {completed ? <AiOutlineCheck/> : ''}
        </div>
        <div className={styles.title}>
          {task.title}
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.btnRename} onClick={showRenameModal}>
          <MdOutlineDriveFileRenameOutline/>
        </div>
        <div className={styles.btnRemove} onClick={removeTask}>
          <RiDeleteBinLine/>
        </div>
      </div>
    </div>
  )
}

export default Task