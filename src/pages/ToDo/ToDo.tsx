import {FC, useState} from 'react'

import HeaderMenu from './components/HeaderMenu/HeaderMenu'
import MainMenu from './components/MainMenu/MainMenu'
import FooterMenu from './components/FooterMenu/FooterMenu'

import ModalCreateTask from './modals/ModalCreateTask/ModalCreateTask'

import tasksData from './tasksData'

import { ITask } from './interfaces'

import styles from './ToDo.module.scss'


const ToDo:FC = () => {
  const tasksString:(string | null) = localStorage.getItem('tasks')
  const storageData:ITask[] = (tasksString?.length) ? JSON.parse(tasksString) : tasksData
  const [initialTasks, setInitialTasks] = useState<ITask[]>(storageData ||tasksData)
  const [filterType, setFilterType] = useState<string>(localStorage.getItem('filterType') || 'all')
  const activeTasks:ITask[] = initialTasks.filter(item=> !item.isCompleted)
  const completedTasks:ITask[] = initialTasks.filter(item=> item.isCompleted)
  const tasksPart:ITask[] = filterType === 'active' ? activeTasks : filterType === 'completed' ? completedTasks : [...initialTasks]
  const [tasks, setTasks] = useState<ITask[]>(tasksPart)
  const initialCompletedTaskCount:number = tasks.filter(item=>item.isCompleted).length
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(initialCompletedTaskCount)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
    <div className={styles.ToDo}>
      <div className={styles.headerMenu}>
        <HeaderMenu setVisibleModal={setVisibleModal}/>
      </div>
      <div className={styles.mainMenu}>
        <MainMenu tasks={tasks} initialTasks={initialTasks} setInitialTasks={setInitialTasks} setTasks={setTasks} setCompletedTaskCount={setCompletedTaskCount}/>
      </div>
      <div className={styles.footerMenu}>
        <FooterMenu initialTasks={initialTasks} filterType={filterType} setInitialTasks={setInitialTasks} setTasks={setTasks} completedTaskCount={completedTaskCount} setCompletedTaskCount={setCompletedTaskCount} setFilterType={setFilterType} />
      </div>    
      {visibleModal ? <ModalCreateTask visibleModal={visibleModal} setVisibleModal={setVisibleModal} tasks={tasks} setInitialTasks={setInitialTasks} setTasks={setTasks} /> : ''}  
    </div>
  )
}

export default ToDo