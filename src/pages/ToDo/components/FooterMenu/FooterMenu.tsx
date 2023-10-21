import {FC} from 'react'

import classNames from 'classnames'

import { ITask } from '../../interfaces'

import styles from './FooterMenu.module.scss'


interface ITaskCount {
  completedTaskCount: number,
  filterType: string,
  initialTasks: ITask[],
  setTasks: (newTasks: ITask[]) => void,
  setInitialTasks: (newTasks: ITask[]) => void,
  setFilterType: (type: string) => void,
  setCompletedTaskCount: (count: number) => void
}


const FooterMenu:FC<ITaskCount> = ({initialTasks, filterType, setInitialTasks, setTasks, completedTaskCount, setFilterType, setCompletedTaskCount}) => {
  const highlight = (type:string) => {
    if(filterType === type) {
      return classNames(styles.btnFilter, styles.borderActive)
    }
    return classNames(styles.btnFilter)
  }
  const clearCompleted = ():void => {
    const newTasks:ITask[] = [...initialTasks.filter(item=>!item.isCompleted)]
    setInitialTasks(newTasks)
    setTasks(newTasks)
    setCompletedTaskCount(0)
  }

  const getAll = ():void => {
    const allTasks:ITask[] = [...initialTasks]
    localStorage.setItem('filterType', "all")
    setFilterType('all')
    setTasks(allTasks)
  }

  const getActive = ():void => {
    const activeTasks:ITask[] = [...initialTasks.filter(item=>!item.isCompleted)]
    localStorage.setItem('filterType', "active")
    setFilterType('active')
    setTasks(activeTasks)
  }

  const getCompleted = ():void => {
    const completedTasks:ITask[] = [...initialTasks.filter(item=>item.isCompleted)]
    localStorage.setItem('filterType', "completed")
    setFilterType('completed')
    setTasks(completedTasks)
  }

  return (
    <div className={styles.footerMenu}>
      <div className={styles.taskCount}>
        {completedTaskCount} items left
      </div>
      <div className={styles.menuSort}>
        <div className={highlight('all')} onClick={getAll}>All</div>
        <div className={highlight('active')} onClick={getActive}>Active</div>
        <div className={highlight('completed')} onClick={getCompleted}>Completed</div>
      </div>
      <div className={styles.btnClearCompleted} onClick={clearCompleted}>Clear completed</div>
    </div>
  )
}

export default FooterMenu