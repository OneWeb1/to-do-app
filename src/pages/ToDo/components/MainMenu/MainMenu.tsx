import {FC} from 'react'

import Tasks from './Tasks/Tasks'

import { ITasksProps } from '../../interfaces'

import styles from './MainMenu.module.scss'


const MainMenu:FC<ITasksProps> = ({tasks, initialTasks, setInitialTasks, setTasks, setCompletedTaskCount}) => {
  return (
    <div className={styles.mainMenu}>
      <Tasks tasks={tasks} initialTasks={initialTasks} setTasks={setTasks} setInitialTasks={setInitialTasks} setCompletedTaskCount={setCompletedTaskCount}/>
    </div>
  )
}

export default MainMenu