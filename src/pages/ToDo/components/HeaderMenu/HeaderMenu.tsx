import {FC} from 'react'
import {LuClipboardList} from 'react-icons/lu'
import {MdAddTask} from 'react-icons/md'

import styles from './HeaderMenu.module.scss'

interface IHeaderMenuProps {
  setVisibleModal: (isVisible:boolean) => void
}

const HeaderMenu:FC<IHeaderMenuProps> = ({setVisibleModal}) => {
  const showModalCreateTask = ():void => {
    setVisibleModal(true)
  }

  return (
    <div className={styles.headerMenu}>
      <div className={styles.icon}>
        <LuClipboardList/>
      </div>
      <div className={styles.inputWrapper}>
        <input type="search" placeholder='Task search...' />
      </div>
      <div className={styles.addTodo} onClick={showModalCreateTask}>
        <MdAddTask/>
      </div>
    </div>
  )
}

export default HeaderMenu