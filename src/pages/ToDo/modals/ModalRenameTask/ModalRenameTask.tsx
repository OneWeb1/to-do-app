import {FC, useRef, useState, ChangeEvent} from 'react'

import styles from './ModalRenameTask.module.scss'
import { ITask } from '../../interfaces'

interface IVisibleProps {
  visibleRenameModal: boolean,
  tasks: ITask[],
  id: number,
  setVisibleRenameModal: (value:boolean) => void,
  setTasks: (newTasks: ITask[]) => void,
  setInitialTasks: (newTasks: ITask[]) => void
}

const ModalRenameTask:FC<IVisibleProps> = ({visibleRenameModal,setVisibleRenameModal, tasks,setInitialTasks, setTasks, id}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const task:ITask = tasks.filter(item => item.id === id)[0]
  const [value, setValue] = useState<string>(task.title)
  const hideModal = ():void => {
    setVisibleRenameModal(false)
  }

  const changeValue = (event:ChangeEvent<HTMLInputElement>):void => {
    setValue(event.target.value)
  }

  const renameTask = ():void => {
    const title:(string | undefined) = inputRef.current?.value
    if(!title) return

    task.title = title
 
    const newTasks:ITask[] = [...tasks]
    setInitialTasks(newTasks)
    setTasks(newTasks)

    hideModal()
  }

  return (
    <>
      {visibleRenameModal?<div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.title}>RENAME TASK</div>
        <div className={styles.inputWrapper}>
          <label>NEW NAME</label>
          <input type="text" value={value} placeholder='Task name...' ref={inputRef} onChange={changeValue} />
        </div>
        <div className={styles.btnsGroup}>
          <div className={styles.btn} onClick={hideModal}>CANCEL</div>
          <div className={styles.btn} onClick={renameTask}>RENAME TASK</div>
        </div>
      </div>
    </div>:""}
    </>
  )
}

export default ModalRenameTask