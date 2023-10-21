import {FC, useRef, useState} from 'react'

import styles from './ModalCreateTask.module.scss'
import { ITask } from '../../interfaces'

interface IVisibleProps {
  visibleModal: boolean,
  tasks: ITask[],
  setVisibleModal: (value:boolean) => void,
  setTasks: (newTasks: ITask[]) => void,
  setInitialTasks: (newTasks: ITask[]) => void,
}

const ModalCreateTask:FC<IVisibleProps> = ({visibleModal,setVisibleModal, tasks, setInitialTasks, setTasks}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [highlightError, setHighlightError] = useState<boolean>(false)
  const hideModal = ():void => {
    setVisibleModal(false)
  }

  const createTask = ():void => {
    const title:(string | undefined) = inputRef.current?.value
    if(!title) {
      setHighlightError(true)
      setTimeout(() => setHighlightError(false),1000)
      return
    }

    const newTask:ITask = {
      title,
      id: Date.now(),
      isCompleted: false
    }
    const newTasks:ITask[] = [newTask,...tasks]
    setInitialTasks(newTasks)
    setTasks(newTasks)

    hideModal()
  }

  return (
    <>
      {visibleModal?<div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.title}>TASK</div>
        <div className={styles.inputWrapper}>
          <label>NAME</label>
          <input type="text" style={highlightError?{border: '1px solid red'}:{}} placeholder='Task name...' ref={inputRef} />
          {highlightError?<div className={styles.error}>Error</div>:''}
        </div>
        <div className={styles.btnsGroup}>
          <div className={styles.btn} onClick={hideModal}>CANCEL</div>
          <div className={styles.btn} onClick={createTask}>CREATE TASK</div>
        </div>
      </div>
    </div>:""}
    </>
  )
}

export default ModalCreateTask