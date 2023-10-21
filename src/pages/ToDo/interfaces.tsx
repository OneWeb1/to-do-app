export interface ITask {
  title: string,
  id: number,
  isCompleted: boolean,
}

export interface ITasks {
  task: ITask
}

export interface ITasksProps {
  tasks: ITask[],
  initialTasks:ITask[],
  setTasks: (newTasks: ITask[]) => void,
  setInitialTasks: (newTasks: ITask[]) => void,
  setCompletedTaskCount: (count: number) => void
}

